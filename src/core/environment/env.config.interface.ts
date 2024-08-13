export interface IEnvConfig {
  /* BLOCKCHAIN DATA */
  CHAIN_ID: number;
  CHAIN_RPC_URL: string;

  /* CHAIN CONTRACTS */
  SACRA_RELAY_CONTRACT_ADDRESS: string;

  /* MASTER ACCOUNT */
  PRIVATE_KEY: string;

  /* SERVER */
  PORT: number;
}
