import { logger } from '../config/logger';
import {
  create,
  deleteById,
  findOneAns,
  updateById
} from '../services/answer.service';
import { findOne } from '../services/question.service';
import { Answer } from '../types/answer.interface';
import { badReq, notFoundReq, successRes } from '../util/response-builder';

// const util = require('../util/resFormat');

export async function setAnswer(reqAnswer: Answer) {
  const answer = {
    answerData: reqAnswer.answerData,
    questionId: reqAnswer.questionId
  };

  const question = await findOne({ _id: answer.questionId });
  if (!question) {
    return notFoundReq('Question not found for this answer.');
  }

  const createdAnswer = await create(answer);

  logger.info(
    `Answer Controller: Answer is added with id: ${
      createdAnswer._id
    } for Question: ${createdAnswer.questionId}`
  );
  return successRes({ data: createdAnswer });
}

export async function getAnswerById(id: string) {
  const answer = await findOneAns({ questionId: id });
  if (!answer) {
    notFoundReq('Answer not found.');
  }
  return successRes({ data: answer });
}

// export async function getQuestionsList(queryData: any) {
//   // console.log(typeof(req.query.records))
//   // const options = {
//   //   sort: 'srNo',
//   //   // tslint:disable-next-line:radix
//   //   limit: parseInt(queryData.records),
//   //   lean: true
//   // };

//   const questionList = await find(queryData);
//   if (!questionList) {
//     return { status: 'empty', data: '' };
//   }
//   return { status: 'success', data: questionList };
// }

export async function update(queryData: Answer) {
  const id = queryData.questionId;
  const answer = await findOneAns({ questionId: id });
  if (!answer) {
    return notFoundReq('Answer not found.');
  }
  const updateAnswer = {
    answerData: queryData.answerData
  };

  const updatedAnswer = await updateById(id, updateAnswer);
  logger.info(`Answer Controller: Answer is updated for QuestionId: ${id}`);
  return successRes({ data: updatedAnswer });
}

export async function deleteAnswer(queryData: any) {
  const id = queryData.questionId;
  const answer = await findOneAns({ questionId: id });
  if (!answer) {
    return notFoundReq('Answer not found.');
  }

  const deleteAns = await deleteById(id);
  logger.info(`Answer Controller: Answer is deleted for QuestionId: ${id}`);
  return successRes({ data: deleteAns });
}
