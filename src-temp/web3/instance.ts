import Web3 from "web3";
import config from "../config";

export default new Web3(new Web3.providers.HttpProvider(config.RPC_PROVIDER));
