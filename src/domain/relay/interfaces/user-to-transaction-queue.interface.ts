import { AsyncTaskManager } from 'src/common/utils/task-manager';

export interface IUserToTransactionQueue {
  [address: string]: AsyncTaskManager;
}
