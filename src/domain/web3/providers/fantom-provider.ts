import { Provider } from './provider';

export class FantomProvider extends Provider {
  public readonly chainId = 250;

  constructor(public readonly rpcUrl: string = 'https://rpcapi.fantom.network/') {
    super(rpcUrl);
  }
}
