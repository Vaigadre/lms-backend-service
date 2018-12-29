import { Model, model, Schema } from 'mongoose';
import { CONSTANT } from '../config/config';

const answerSchema: Schema = new Schema(
  {
    questionId: { type: String, index: true, required: true },
    answerData: {
      type: {},
      default: {}
    }
  },
  {
    timestamps: true
  }
);

answerSchema.index({ questionId: 1 }, { unique: true });

const answerModel: Model<any> = model('Answer', answerSchema);
export default answerModel;
