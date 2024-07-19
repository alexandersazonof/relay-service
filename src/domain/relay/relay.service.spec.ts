// import { Test, TestingModule } from '@nestjs/testing';
// import { ConfigService } from '@nestjs/config';
// import { Web3Service } from '../../domain/web3/web3.service';

// import { ContractAddress } from './constants';

// import Web3 from 'web3';
// import { CallFromOperatorDto } from '../relay/dto/call-from-operator.dto';
// import { RelayService } from '../relay/relay.service';

// describe('TestRelayService', () => {
//   let relayService: RelayService;
//   let web3Service: Web3Service;

//   beforeEach(async () => {
//     const module: TestingModule = await Test.createTestingModule({
//       providers: [
//         RelayService,
//         {
//           provide: ConfigService,
//           useValue: {},
//         },
//         {
//           provide: Web3Service,
//           useValue: {
//             masterAccountAddress: '0xYourMasterAccountAddress',
//             masterAccountPrivateKey: '0xYourMasterAccountPrivateKey',
//             instance: new Web3(),
//           },
//         },
//       ],
//     }).compile();

//     relayService = module.get<RelayService>(RelayService);
//     web3Service = module.get<Web3Service>(Web3Service);

//     relayService.sacraHeroContract = new web3Service.instance.eth.Contract(
//       [],
//       ContractAddress.Hero,
//     );
//     relayService.sacraRelayContract = {
//       methods: {
//         callFromOperator: jest.fn().mockReturnValue({
//           encodeABI: jest.fn().mockReturnValue('0xEncodedABI'),
//         }),
//       },
//     } as any;

//     web3Service.instance.eth.getGasPrice = jest.fn().mockResolvedValue('20000000000');
//     web3Service.instance.eth.estimateGas = jest.fn().mockResolvedValue(21000);
//     web3Service.instance.eth.sendTransaction = jest.fn().mockResolvedValue({
//       transactionHash: '0xTransactionHash',
//     });
//   });

//   describe('callFromOperator', () => {
//     it('should allow 0xTargetAddress', () => {
//       expect(relayService.checkAllowedContractAddressWrapper('0xTargetAddress')).toBeTruthy();
//     });

//     it('should call checkAllowedContractAddress and send a transaction', async () => {
//       const callFromOperatorDto: CallFromOperatorDto = {
//         chainId: 250,
//         target: '0xTargetAddress',
//         data: '0xData',
//         fromAddress: '0xYourFromAddress',
//         userNonce: 0,
//         userDeadline: 0,
//         signature: '0xSignature',
//       };

//       const result = await relayService.callFromOperator(callFromOperatorDto);

//       expect(result).toStrictEqual({
//         transactionHash: '0xTransactionHash',
//       });
//     });

//     it('should call checkAllowedContractAddress and send a transaction 10 times', async () => {
//       const callFromOperatorDto: CallFromOperatorDto = {
//         chainId: 250,
//         target: '0xTargetAddress',
//         data: '0xData',
//         fromAddress: '0xYourFromAddress',
//         userNonce: 0,
//         userDeadline: 0,
//         signature: '0xSignature',
//       };

//       const expectedResults = Array(10).fill({
//         transactionHash: '0xTransactionHash',
//       });

//       const results = [];

//       for (let i = 0; i < 10; i++) {
//         const result = await relayService.callFromOperator(callFromOperatorDto);
//         results.push(result);
//       }

//       expect(results).toStrictEqual(expectedResults);
//       expect(web3Service.instance.eth.sendTransaction).toHaveBeenCalledTimes(10);
//     });
//   });
// });
