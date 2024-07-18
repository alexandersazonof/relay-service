import { Provider } from './provider';

export class HardhatProvider extends Provider {
  public readonly chainId = 31337;

  constructor(public readonly rpcUrl: string = 'http://127.0.0.1:8545/') {
    super(rpcUrl);
  }
}
