import { Model, model, Schema } from 'mongoose';
import { CONSTANT } from '../config/config';

const questionSchema: Schema = new Schema(
  {
    title: { type: String, default: '' },
    description: { type: String, default: '' },
    tool: { type: String, index: true, required: true },
    status: {
      type: String,
      enum: CONSTANT.QUESTIONSTATUS,
      index: true,
      required: true
    },
    toolConsumerInstanceGuid: { type: String, index: true, required: true },
    userId: { type: String, index: true, required: true },
    contextId: { type: String, index: true, required: true },
    isDeleted: { type: Boolean, default: false },
    metaData: { type: Object, default: {} },
    questionData: {
      type: {},
      default: {}
    }
  },
  {
    timestamps: true
  }
);

const questionModel: Model<any> = model('Question', questionSchema);
export default questionModel;
