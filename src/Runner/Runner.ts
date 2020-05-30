import {Status, IProcess, IRunner} from '..';
import {serializeProcess, serializeStatus} from '../Worker';
import {CANCEL_SLEEP, MINIMUM_STEP} from '../constants';

export class Runner<ObjectType> implements IRunner<ObjectType> {
  private onCancel  = false;
  private isRunning = false;
  private process: IProcess<ObjectType> | undefined;

  public constructor(private readonly onPostMessage: (string: string) => void) {
  }

  public setProcess(process: IProcess<ObjectType>): void {
    this.process = process;
  }

  public getOnUpdateCallback(): () => Promise<void> {
    return (): Promise<void> => this.onUpdated();
  }

  private async onUpdated(): Promise<void> {
    if (!this.process) {
      return;
    }

    this.onPostMessage(await serializeProcess(this.process));
  }

  private async onStatusChanged(status: Status): Promise<void> {
    this.onPostMessage(serializeStatus(status));
  }

  private async sleep(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any,@typescript-eslint/explicit-module-boundary-types
  public async reset(context: any): Promise<void> {
    if (this.onCancel || !this.process) {
      return;
    }

    this.onCancel = true;
    await this.onStatusChanged('canceling');
    while (this.isRunning) {
      await this.sleep(CANCEL_SLEEP);
    }

    await this.process.reset(context);
    this.onCancel = false;

    await this.onUpdated();
    await this.onStatusChanged('initialized');
  }

  public async start(): Promise<void> {
    if (this.isRunning || this.onCancel || !this.process) {
      return;
    }

    this.isRunning = true;
    await this.onStatusChanged('started');

    let prev = this.process.progress;
    while (!this.process.isFinished && !this.onCancel) {
      await this.process.step();
      await this.sleep(this.process.sleep);

      if (this.process.progress > prev + MINIMUM_STEP) {
        prev = this.process.progress;
        await this.onUpdated();
      }
    }

    await this.onUpdated();
    if (this.process.isFinished) {
      await this.onStatusChanged('finished');
    } else {
      await this.onStatusChanged('canceled');
    }

    this.onCancel  = false;
    this.isRunning = false;
  }

  public async stop(): Promise<void> {
    if (this.onCancel || !this.isRunning || !this.process) {
      return;
    }

    this.onCancel = true;
    await this.onStatusChanged('canceling');
  }
}
