export type Entity<T> = {
  id: string;
  createDateTime: string;
  updateDateTime: string;
} & T;
