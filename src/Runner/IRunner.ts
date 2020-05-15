import {IProcess} from '..';

export interface IRunner<ObjectType> {
  reset(): Promise<void>;

  start(): Promise<void>;

  stop(): Promise<void>;

  setProcess(process: IProcess<ObjectType>): void;

  getOnUpdateCallback(): () => Promise<void>;
}
