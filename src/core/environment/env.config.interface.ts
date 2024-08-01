export interface IEnvConfig {
  /* BLOCKCHAIN DATA */
  CHAIN_ID: number;
  CHAIN_RPC_URL: string;

  /* CHAIN CONTRACTS */
  SACRA_RELAY_CONTRACT_ADDRESS: string;

  /* MASTER ACCOUNT */
  ACCOUNT_ADDRESS: string;
  PRIVATE_KEY: string;

  /* SERVER */
  PORT: number;
}
