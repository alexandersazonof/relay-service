export class Counter {
  private _count = 0;

  constructor(initValue = 0) {
    this._count = initValue;
  }

  get count() {
    return this._count;
  }

  public increment() {
    return this._count++;
  }

  public decrement() {
    return this._count--;
  }

  public reset() {
    return (this._count = 0);
  }
}
