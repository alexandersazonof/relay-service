import Web3 from 'web3';

export abstract class Provider {
  public readonly rpcUrl: string;
  public readonly instance: Web3;

  constructor() {
    this.instance = new Web3(this.rpcUrl);
  }
}
