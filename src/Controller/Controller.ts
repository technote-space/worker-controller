import {IController} from '..';
import {deserialize} from '../Worker';
import {Listener} from '../types';

export class Controller<ObjectType> implements IController<ObjectType> {
  private readonly worker: Worker;

  public constructor(protected readonly _listener: (result) => void, path = 'process.js') {
    this.worker = new Worker('worker-controller.worker.js');
    this.worker.addEventListener('message', event => {
      this.getListener()(deserialize(event.data));
    });
    this.worker.postMessage(['init', path]);
  }

  public getListener(): Listener<ObjectType> {
    return this._listener;
  }

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
