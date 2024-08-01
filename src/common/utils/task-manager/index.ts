import {
  IPromiseWithResolvers,
  promiseWithResolvers,
} from 'src/common/polyfills/promise-with-resolvers';

export interface IAsyncTask<T = unknown> {
  (): Promise<T>;
}

export interface IAsyncTaskQueue extends IPromiseWithResolvers<unknown> {
  task: IAsyncTask;
}

export class AsyncTaskManager {
  private readonly queue: IAsyncTaskQueue[] = [];
  private isProcessing = false;

  public addTask<T>(task: IAsyncTask<T>) {
    const { promise, resolve, reject } = promiseWithResolvers<T>();
    this.queue.push({ task, promise, resolve, reject });

    if (!this.isProcessing) {
      this.executeNextTask();
    }

    return promise;
  }

  private async executeNextTask() {
    const currentQueueItem = this.queue.shift();
    if (!currentQueueItem) return;
    const { task, resolve, reject } = currentQueueItem;

    this.isProcessing = true;
    await task().then(resolve).catch(reject);

    this.isProcessing = false;
    await this.executeNextTask();
  }
}
