export type StatusResult = {
  status: string;
}
export type Status = 'initialized' | 'started' | 'finished' | 'canceling' | 'canceled'
export type Listener<ObjectType> = (result: ObjectType | StatusResult) => void
