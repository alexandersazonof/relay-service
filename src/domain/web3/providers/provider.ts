import Web3 from 'web3';

export abstract class Provider {
  public readonly chainId: number;
  public readonly instance: Web3;

  constructor(public readonly rpcUrl: string) {
    this.instance = new Web3(this.rpcUrl);
  }
}
