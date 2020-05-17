import {IController} from '..';
import {deserialize} from '../Worker';
import {Listener} from '../types';

export class Controller<ObjectType> implements IController<ObjectType> {
  private readonly worker: Worker;

  public constructor(protected readonly _listener: Listener<ObjectType>, options?: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    context?: any;
    path?: string;
    className?: string;
    workerName?: string;
  }) {
    this.worker = new Worker(options?.workerName ?? 'worker-controller.worker.js');
    this.worker.addEventListener('message', event => {
      this.getListener()(deserialize(event.data));
    });
    this.worker.postMessage(['init', options?.path ?? 'process.js', options?.className ?? 'Process', JSON.stringify(options?.context ?? {})]);
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
