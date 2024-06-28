import { readFileSync } from 'fs';
import { ContractAbi } from 'web3';

export function getContractAbi(file: string): ContractAbi {
  const rawABI = readFileSync(`./abi/${file}.json`);
  return JSON.parse(rawABI.toString()) as ContractAbi;
}