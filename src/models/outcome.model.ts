import { Model, model, Schema } from 'mongoose';

const outcomeSchema: Schema = new Schema(
  {
    requestId: { type: String, index: true, required: true },
    activityType: { type: String, index: true, required: true },
    tool: { type: String, index: true, required: true },
    toolConsumerInstanceGuid: { type: String, index: true, required: true },
    userId: { type: String, index: true },
    metaData: { type: Object, default: {} },
    contextId: { type: String, index: true, required: true },
    data: {}
  },
  {
    timestamps: true
  }
);

const outcomeModel: Model<any> = model('Outcome', outcomeSchema);
export default outcomeModel;
