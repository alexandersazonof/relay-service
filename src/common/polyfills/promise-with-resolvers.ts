export interface IPromiseWithResolvers<ResolveType> {
  promise: Promise<ResolveType>;
  resolve: (value: ResolveType | PromiseLike<ResolveType>) => void;
  reject: (reason?: any) => void;
}

export const promiseWithResolvers = <ResolveType>(): IPromiseWithResolvers<ResolveType> => {
  let resolve!: (value: ResolveType | PromiseLike<ResolveType>) => void;
  let reject!: (reason?: any) => void;

  const promise = new Promise<ResolveType>((res, rej) => {
    resolve = res;
    reject = rej;
  });

  return { promise, resolve, reject };
};
