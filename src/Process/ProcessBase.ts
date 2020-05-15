import {IProcess} from '..';
import {DEFAULT_SLEEP} from '../constants';

export abstract class ProcessBase<ObjectType> implements IProcess<ObjectType> {
  public abstract get progress(): number;

  public abstract get isFinished(): boolean;

  public get sleep(): number {
    return DEFAULT_SLEEP;
  }

  public abstract reset(): Promise<void>;

  public abstract step(): Promise<void>;

  public abstract getObject(): Promise<ObjectType>;
}
