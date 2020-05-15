import {Listener} from '..';

export interface IController<ObjectType> {
  getListener(): Listener<ObjectType>;

  reset(): void;

  start(): void;

  stop(): void;
}
