export interface Outcome {
  _id?: string;
  requestId?: string;
  tool?: string;
  data?: any;
  toolConsumerInstanceGuid?: string;
  contextId?: string;
  activityType?: object;
  userId?: string;
  metaData?: object;
  createdAt?: string;
  updatedAt?: string;
}
