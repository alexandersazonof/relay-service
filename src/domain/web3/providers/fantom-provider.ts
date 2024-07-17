import { Provider } from './provider';

export class FantomProvider extends Provider {
  constructor(public readonly rpcUrl: string = 'https://rpcapi.fantom.network/') {
    super();
  }
}
