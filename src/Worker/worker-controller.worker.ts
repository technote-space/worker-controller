import {IProcess, IRunner, Runner} from '..';

interface IMessageEvent extends MessageEvent {
  data: string;
}

declare const self: Worker;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
let runner: IRunner<any> | undefined;

self.addEventListener('message', async(event: IMessageEvent) => {
  switch (event.data[0]) {
    case 'init': {
      importScripts(event.data[1]);
      runner = new Runner(data => {
        self.postMessage(data);
      });

      const context  = JSON.parse(event.data[3] ?? {});
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const process = new global[event.data[2] ?? 'Process'](runner.getOnUpdateCallback(), context) as IProcess<any>;
      await process.init(context);
      runner.setProcess(process);
      await runner.reset(undefined);
      break;
    }
    case 'reset':
      if (runner) {
        await runner.reset(JSON.parse(event.data[1] ?? {}));
      }
      break;
    case 'start':
      if (runner) {
        await runner.start();
      }
      break;
    case 'stop':
      if (runner) {
        await runner.stop();
      }
      break;
    default:
      break;
  }
});
