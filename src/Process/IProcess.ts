export interface IProcess<ObjectType> {
  progress: number;

  isFinished: boolean;

  sleep: number;

  minimumStep: number;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  init(context: any): Promise<void>;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  reset(context: any): Promise<void>;

  step(): Promise<void>;

  getObject(): Promise<ObjectType>;
}
