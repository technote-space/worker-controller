import {IProcess} from '..';

export interface IRunner<ObjectType> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  reset(context: any): Promise<void>;

  start(): Promise<void>;

  stop(): Promise<void>;

  setProcess(process: IProcess<ObjectType>): void;

  getOnUpdateCallback(): () => Promise<void>;
}
