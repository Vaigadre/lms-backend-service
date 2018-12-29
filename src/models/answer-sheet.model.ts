import { Model, model, Schema } from 'mongoose';
import { CONSTANT } from '../config/config';

const answerSheetSchema: Schema = new Schema(
  {
    questionId: { type: 'String' },
    tool: { type: 'String', index: true },
    toolConsumerInstanceGuid: { type: 'String', index: true },
    contextId: { type: String, index: true, required: true },
    userId: { type: 'String', index: true },
    status: {
      type: String,
      enum: CONSTANT.QUESTIONSTATUS,
      index: true,
      required: true
    },
    metaData: { type: Object, default: {} },
    data: {},
    score: { type: 'String' }
  },
  {
    timestamps: true
  }
);

const answerSheetModel: Model<any> = model('AnswerSheet', answerSheetSchema);
export default answerSheetModel;
