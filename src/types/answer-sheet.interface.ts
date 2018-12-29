export interface AnswerSheet {
  _id?: string;
  id?: string;
  questionId?: string;
  userId?: string;
  tool?: string;
  toolConsumerInstanceGuid?: string;
  contextId?: string;
  metaData?: object;
  status?: string;
  data?: object;
  score?: string;
  createdAt?: string;
  updatedAt?: string;
}
