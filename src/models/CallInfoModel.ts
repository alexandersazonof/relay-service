export interface CallInfo {
  chainId: number;
  target: string;
  data: string;
  user: string;
  userNonce: number;
  userDeadline: number;
}