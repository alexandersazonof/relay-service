import { INestApplication } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { eth } from 'web3';
import { AppModule } from '../src/app.module';
import { RelayService } from '../src/domain/relay/relay.service';
import { ICallInfo } from '../src/domain/relay/interfaces/call-info.interface';
import { CallFromOperatorDto } from '../src/domain/relay/dto/call-from-operator.dto';
import { signCallWithERC2771 } from '../src/domain/relay/utils/sign-erc2771/sign-erc2771';

describe('RelayController (e2e)', () => {
  let app: INestApplication;
  let configService: ConfigService;
  let relayService: RelayService;

  let callInfo: Readonly<ICallInfo>;
  let callFromOperatorDto: Readonly<CallFromOperatorDto>;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    configService = moduleFixture.get<ConfigService>(ConfigService);
    relayService = moduleFixture.get<RelayService>(RelayService);

    await app.init();

    callInfo = {
      chainId: Number(configService.get<string>('CHAIN_ID')),
      user: configService.get<string>('USER_ADDRESS'),
      target: configService.get<string>('COUNTER_CONTRACT_ADDRESS'),
      data: configService.get<string>('COUNTER_GET_VALUE_CALL_ABI'),
      userNonce: 0,
      userDeadline: 0,
    };

    const userPrivateKey = configService.get<string>('USER_PRIVATE_KEY');
    const CALL_ERC2771_TYPEHASH = await relayService.CALL_ERC2771_TYPEHASH();
    const DOMAIN_SEPARATOR = await relayService.DOMAIN_SEPARATOR();
    const signature = await signCallWithERC2771(
      callInfo,
      CALL_ERC2771_TYPEHASH,
      DOMAIN_SEPARATOR,
      userPrivateKey,
    );

    callFromOperatorDto = {
      user: callInfo.user,
      target: callInfo.target,
      data: callInfo.data,
      signature: signature,
      userNonce: callInfo.userNonce,
      userDeadline: callInfo.userDeadline,
    };
  });

  beforeEach(() => {});

  describe('/relay/user-nonce (GET)', () => {
    it('should return 0 for a new wallet that has never made a request', async () => {
      const response = await request(app.getHttpServer())
        .get('/relay/user-nonce')
        .query({ address: callInfo.user });

      expect(response.status).toBe(400);
      expect(response.text).toBe('0');
    });
  });

  describe('/relay/call-from-operator (POST)', () => {
    it('should throw an error if passed userNonce does not match the stored nonce', async () => {
      const body: CallFromOperatorDto = {
        ...callFromOperatorDto,
        userNonce: 99999,
      };

      const response = await request(app.getHttpServer())
        .post('/relay/call-from-operator')
        .send(body);

      expect(response.status).toBe(400);
      expect(response.body).toMatchObject({
        error: 'Bad Request',
        message: 'Nonce is not correct. Should be 0. You sent 99999',
        statusCode: 400,
      });
    });

    it('should throw an error if operator is not allowed to call contract on behalf of user', async () => {
      const randomWallet = eth.accounts.create();
      const callInfoWithRandomWallet: ICallInfo = { ...callInfo, user: randomWallet.address };

      const CALL_ERC2771_TYPEHASH = await relayService.CALL_ERC2771_TYPEHASH();
      const DOMAIN_SEPARATOR = await relayService.DOMAIN_SEPARATOR();
      const signature = await signCallWithERC2771(
        callInfoWithRandomWallet,
        CALL_ERC2771_TYPEHASH,
        DOMAIN_SEPARATOR,
        randomWallet.privateKey,
      );

      const body: CallFromOperatorDto = {
        ...callFromOperatorDto,
        user: randomWallet.address,
        signature: signature,
      };

      const response = await request(app.getHttpServer())
        .post('/relay/call-from-operator')
        .send(body);

      expect(response.status).toBe(400);
      expect(response.body).toMatchObject({
        error: 'Bad Request',
        message: 'Transaction failed with error: SacraRelayNotAllowed',
        statusCode: 400,
      });
    });

    it('should throw an error if signature is not correct', async () => {
      // create random wallet to make signature with does not match with wallet address
      const randomWallet = eth.accounts.create();
      const callInfoWithRandomWallet: ICallInfo = { ...callInfo, user: randomWallet.address };

      // create signature with random wallet data
      const CALL_ERC2771_TYPEHASH = await relayService.CALL_ERC2771_TYPEHASH();
      const DOMAIN_SEPARATOR = await relayService.DOMAIN_SEPARATOR();
      const signature = await signCallWithERC2771(
        callInfoWithRandomWallet,
        CALL_ERC2771_TYPEHASH,
        DOMAIN_SEPARATOR,
        randomWallet.privateKey,
      );

      // The address has not changed, but the signature has been set for the new address.
      const body: CallFromOperatorDto = {
        ...callFromOperatorDto,
        signature: signature,
      };

      const response = await request(app.getHttpServer())
        .post('/relay/call-from-operator')
        .send(body);

      expect(response.status).toBe(400);
      expect(response.body).toMatchObject({
        error: 'Bad Request',
        message: 'Transaction failed with error: SacraRelayInvalidSignature',
        statusCode: 400,
      });
    });

    it('should return transaction hash', async () => {
      const response = await request(app.getHttpServer())
        .post('/relay/call-from-operator')
        .send(callFromOperatorDto)
        .expect(200)
        .expect((res) => {
          const isHash = /^0x[0-9a-fA-F]{64}$/.test(res.text);
          expect(isHash).toBe(true);
        });

      expect(response.status).toBe(200);

      const isHash = /^0x[0-9a-fA-F]{64}$/.test(response.text);
      expect(isHash).toBe(true);
    });
  });
});
