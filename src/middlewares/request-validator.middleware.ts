import * as joi from 'joi';
import { CONSTANT } from '../config/config';

const defaultQuery = {
  tool: joi.string().required()
};

const defaultBody = {
  toolConsumerInstanceGuid: joi.string().required(),
  userId: joi.string().required(),
  userRole: joi.string().required(),
  contextId: joi.string().required(),
  isDeleted: joi.boolean(),
  metaData: joi.object(),
  tool: joi.string()
};

export const defaultGetValidator = {};
export const createQuestionValidator = {
  body: {
    ...defaultBody,
    title: joi.string(),
    questionData: joi.any(),
    description: joi.string(),
    status: joi
      .any()
      .required()
      .allow(CONSTANT.QUESTIONSTATUS)
  },
  params: {
    tool: joi.string().required()
  }
};

export const updateQuestionValidator = {
  body: {
    ...defaultBody,
    title: joi.string(),
    questionData: joi.any(),
    description: joi.string(),
    status: joi
      .any()
      .required()
      .allow(CONSTANT.QUESTIONSTATUS)
  }
};

export const createAnswerValidator = {
  body: {
    ...defaultBody,
    answerData: joi.any().required(),
    questionId: joi.string().required()
  }
};

export const updateAnswerValidator = {
  body: {
    ...defaultBody,
    answerData: joi.any().required(),
    questionId: joi.string().required()
  }
};
