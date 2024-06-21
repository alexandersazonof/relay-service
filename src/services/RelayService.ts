import { getContractAbi } from '../utils/AbiUtils';
import Web3, { AbiInput, AbiItem } from 'web3';

import dotenv from 'dotenv';

dotenv.config();


const RELAY_ADDRESS = process.env.RELAY_ADDRESS || '';
const DELEGATE_ADDRESS = process.env.DELEGATOR_ADDRESS || '';
const DELEGATE_PRIVATE_KEY = process.env.DELEGATOR_PRIVATE_KEY || '';
const CHAIN_ID = +(process.env.CHAIN_ID || 0);

export class RelayService {
  private web3 = new Web3(new Web3.providers.HttpProvider(process.env.RPC_PROVIDER || ''));

  public async signTransaction(): Promise<void> {
    const contract = getContractAbi('Relay');
    const relayContract = new this.web3.eth.Contract(contract, RELAY_ADDRESS);
    console.log(contract);
    return;
  }
}