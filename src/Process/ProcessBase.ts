import {IProcess} from '..';
import {DEFAULT_SLEEP, DEFAULT_MINIMUM_STEP} from '../constants';

export abstract class ProcessBase<ObjectType> implements IProcess<ObjectType> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any,@typescript-eslint/explicit-module-boundary-types,@typescript-eslint/no-unused-vars
  public async init(context: any): Promise<void> {
    //
  }

  public abstract get progress(): number;

  public abstract get isFinished(): boolean;

  public get sleep(): number {
    return DEFAULT_SLEEP;
  }

  public get minimumStep(): number {
    return DEFAULT_MINIMUM_STEP;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any,@typescript-eslint/explicit-module-boundary-types
  public abstract reset(context: any): Promise<void>;

  public abstract step(): Promise<void>;

  public abstract getObject(): Promise<ObjectType>;
}
