import { logger } from '../config/logger';
import { create, findOne, updateById } from '../services/answer-sheet.service';
import { AnswerSheet } from '../types/answer-sheet.interface';

// const util = require('../util/resFormat');

export async function setAnswer(req: AnswerSheet) {
  const answer = {
    questionId: req.questionId,
    userId: req.userId,
    tool: req.tool,
    status: req.status,
    contextId: req.contextId,
    metaData: req.metaData,
    toolConsumerInstanceGuid: req.toolConsumerInstanceGuid,
    data: req.data
  };

  const savedAnswer = await create(answer);
  logger.info(
    `Answer Sheet Controller: Answer  is added with id: ${
      savedAnswer._id
    } QuestionId: ${savedAnswer.questionId}`
  );
  return { status: 'Success', data: savedAnswer };
}

export async function getAnswerById(id: string) {
  const answer = await findOne({ _id: id });
  if (!answer) {
    return {
      status: 'empty',
      data: ''
    };
  }
  return { status: 'Success', data: answer };
}

export async function update(req: any) {
  const answerId = req.id;
  const updateAnswer = { data: req.data, status: req.status };

  const updatedAnswer = await updateById(answerId, updateAnswer);
  logger.info(
    `Answer Sheet Controller: Answer is updated with id:${
      updatedAnswer._id
    } Question Id: ${updatedAnswer.title}`
  );
  return { status: 'Success', data: updatedAnswer };
}
