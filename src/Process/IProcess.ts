export interface IProcess<ObjectType> {
  progress: number;

  isFinished: boolean;

  sleep: number;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  reset(context: any): Promise<void>;

  step(): Promise<void>;

  getObject(): Promise<ObjectType>;
}
