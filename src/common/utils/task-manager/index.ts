export class AsyncTaskManager<Task extends () => Promise<unknown> = () => Promise<unknown>> {
  private readonly queue: Task[] = [];
  private isProcessing = false;

  public addTask(task: Task) {
    this.queue.push(task);
    if (!this.isProcessing) {
      this.executeNextTask();
    }
  }

  private async executeNextTask() {
    const currentTask = this.queue.shift();
    if (!currentTask) return;

    this.isProcessing = true;
    await currentTask();

    this.isProcessing = false;
    await this.executeNextTask();
  }
}
