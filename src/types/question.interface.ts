export interface Question {
  _id?: string;
  title?: string;
  description?: string;
  tool?: string;
  data?: object;
  status?: string;
  toolConsumerInstanceGuid?: string;
  contextId?: string;
  metaData?: object;
  userId?: string;
  createdAt?: string;
  updatedAt?: string;
}
