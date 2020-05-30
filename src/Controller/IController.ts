import {Listener} from '..';

export interface IController<ObjectType> {
  getListener(): Listener<ObjectType>;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  reset(context?: any): void;

  start(): void;

  stop(): void;
}
