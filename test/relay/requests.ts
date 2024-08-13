import * as request from 'supertest';
import { CallFromOperatorDto } from '../../src/domain/relay/dto/call-from-operator.dto';

export const callFromOperatorRequest = async (app: any, body: CallFromOperatorDto) => {
  const callFromOperatorDto: CallFromOperatorDto = {
    user: body.user,
    target: body.target,
    data: body.data,
    signature: body.signature,
    userNonce: body.userNonce,
    userDeadline: body.userDeadline,
  };

  return await request(app).post('/relay/call-from-operator').send(callFromOperatorDto);
};

export const getUserNonceRequest = async (app: any, address: string) => {
  return await request(app).get('/relay/user-nonce').query({ address });
};

export const callERC2771TypeHashRequest = async (app: any) => {
  return await request(app).get('/relay/erc2771-typehash');
};

export const domainSeparatorRequest = async (app: any) => {
  return await request(app).get('/relay/domain-separator');
};
