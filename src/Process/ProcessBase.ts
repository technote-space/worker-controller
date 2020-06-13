import {IProcess} from '..';
import {DEFAULT_SLEEP} from '../constants';

export abstract class ProcessBase<ObjectType> implements IProcess<ObjectType> {
  public async init(): Promise<void> {
    //
  }

  public abstract get progress(): number;

  public abstract get isFinished(): boolean;

  public get sleep(): number {
    return DEFAULT_SLEEP;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public abstract reset(context: any): Promise<void>;

  public abstract step(): Promise<void>;

  public abstract getObject(): Promise<ObjectType>;
}
