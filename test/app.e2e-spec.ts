import { INestApplication } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { eth } from 'web3';
import { AppModule } from '../src/app.module';
import { RelayService } from '../src/domain/relay/relay.service';
import { ICallInfo } from '../src/domain/relay/interfaces/call-info.interface';
import { CallFromOperatorDto } from '../src/domain/relay/dto/call-from-operator.dto';
import { callFromOperatorRequest, getUserNonceRequest } from './relay/requests';
import { buildCallFromOperatorRequestBody } from './relay/helpers';

describe('RelayController (e2e)', () => {
  let app: INestApplication;
  let configService: ConfigService;
  let relayService: RelayService;

  let callInfo: Readonly<ICallInfo>;
  let userPrivateKey: string;

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

    userPrivateKey = configService.get<string>('USER_PRIVATE_KEY');
  });

  describe('/relay/call-from-operator (POST)', () => {
    it('should throw an error if passed userNonce does not match the stored nonce', async () => {
      const nonceResponse = await getUserNonceRequest(app.getHttpServer(), callInfo.user);
      const userNonce = Number(nonceResponse.text);

      const body = await buildCallFromOperatorRequestBody(
        app.getHttpServer(),
        { ...callInfo, userNonce },
        userPrivateKey,
      );
      const bodyWithWrongNonce: CallFromOperatorDto = { ...body, userNonce: body.userNonce + 999 };
      const response = await callFromOperatorRequest(app.getHttpServer(), bodyWithWrongNonce);

      expect(response.status).toBe(400);
      expect(response.body).toMatchObject({
        error: 'Bad Request',
        message: `Nonce is not correct. Should be ${userNonce}. You sent ${bodyWithWrongNonce.userNonce}`,
        statusCode: 400,
      });
    });

    it('should throw an error if operator is not allowed to call contract on behalf of user', async () => {
      const randomWallet = eth.accounts.create();
      const nonceResponse = await getUserNonceRequest(app.getHttpServer(), randomWallet.address);
      const userNonce = Number(nonceResponse.text);

      const body = await buildCallFromOperatorRequestBody(
        app.getHttpServer(),
        { ...callInfo, userNonce },
        userPrivateKey,
      );
      const bodyWithWrongAddress: CallFromOperatorDto = { ...body, user: randomWallet.address };
      const response = await callFromOperatorRequest(app.getHttpServer(), bodyWithWrongAddress);

      expect(response.status).toBe(400);
      expect(response.body).toMatchObject({
        error: 'Bad Request',
        message: 'Transaction failed with error: SacraRelayNotAllowed',
        statusCode: 400,
      });
    });

    it('should throw an error if signature is not correct', async () => {
      const nonceResponse = await getUserNonceRequest(app.getHttpServer(), callInfo.user);
      const userNonce = Number(nonceResponse.text);

      const body = await buildCallFromOperatorRequestBody(
        app.getHttpServer(),
        { ...callInfo, userNonce },
        userPrivateKey,
      );
      const bodyWithWrongSignature: CallFromOperatorDto = {
        ...body,
        signature: body.signature + '0000',
      };
      const response = await callFromOperatorRequest(app.getHttpServer(), bodyWithWrongSignature);

      expect(response.status).toBe(400);
      expect(response.body).toMatchObject({
        error: 'Bad Request',
        message: 'Transaction failed with error: SacraRelayInvalidSignature',
        statusCode: 400,
      });
    });

    it('should return transaction hash', async () => {
      const nonceResponse = await getUserNonceRequest(app.getHttpServer(), callInfo.user);
      const userNonce = Number(nonceResponse.text);

      const body = await buildCallFromOperatorRequestBody(
        app.getHttpServer(),
        { ...callInfo, userNonce },
        userPrivateKey,
      );
      const response = await callFromOperatorRequest(app.getHttpServer(), body);

      expect(response.status).toBe(200);

      const isHash = /^0x[0-9a-fA-F]{64}$/.test(response.text);
      expect(isHash).toBe(true);
    });
  });
});
