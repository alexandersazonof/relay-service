import { Counter } from 'src/common/utils/counter';

export interface IUserToNonce {
  [address: string]: Counter;
}
