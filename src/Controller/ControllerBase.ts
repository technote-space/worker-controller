import {IController} from '..';
import {deserialize} from '../Worker';
import {Listener} from '../types';

export abstract class ControllerBase<ObjectType> implements IController<ObjectType> {
  private readonly worker: Worker;

  protected constructor(path = 'process.js') {
    this.worker = new Worker('worker-controller.worker.js');
    this.worker.addEventListener('message', event => {
      this.getListener()(deserialize(event.data));
    });
    this.worker.postMessage(['init', path]);
  }

  public abstract getListener(): Listener<ObjectType>;

  public reset(): void {
    this.worker.postMessage(['reset']);
  }

  public start(): void {
    this.worker.postMessage(['start']);
  }

  public stop(): void {
    this.worker.postMessage(['stop']);
  }
}
