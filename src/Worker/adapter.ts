import {Status, StatusResult, IProcess} from '..';

export const serializeProcess = async <ObjectType>(process: IProcess<ObjectType>): Promise<string> => JSON.stringify({
  type: 'update',
  data: await process.getObject(),
});
export const serializeStatus  = (status: Status): string => JSON.stringify({
  type: 'status',
  data: {status},
});
export const deserialize      = <ObjectType>(data: string): ObjectType | StatusResult => {
  const object = JSON.parse(data);
  if (object.type === 'status') {
    return object.data as StatusResult;
  }

  return object.data as ObjectType;
};
