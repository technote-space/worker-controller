export interface IProcess<ObjectType> {
  progress: number;

  isFinished: boolean;

  sleep: number;

  reset(): Promise<void>;

  step(): Promise<void>;

  getObject(): Promise<ObjectType>;
}
