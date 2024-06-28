import web3 from "../instance";
import { abi, abiRelay, heroContractAddress, sacraRelayAddress } from "../../constants";

export const sacraRelayContract = new web3.eth.Contract(abiRelay, sacraRelayAddress);
export const heroContract = new web3.eth.Contract(abi, heroContractAddress);
