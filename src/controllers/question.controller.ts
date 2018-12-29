import { logger } from '../config/logger';
import {
  create,
  deleteById,
  find,
  findOne,
  updateById
} from '../services/question.service';
import { Question } from '../types/question.interface';
import { badReq, notFoundReq, successRes } from '../util/response-builder';

export async function CreateQuestion(question: Question) {
  const createdQuestion = await create(question);
  logger.info(
    `Question Controller: Question is added with id: ${
      createdQuestion._id
    } title: ${createdQuestion.title}`
  );
  return successRes({ data: createdQuestion });
}

export async function getQuestionById(id: string) {
  const question = await findOne({ _id: id });
  if (!question) {
    return notFoundReq('Question not found.');
  }
  return successRes({ data: question });
}

export async function getQuestionList(queryData: any) {
  let questionList = await find(queryData);
  if (!questionList) {
    questionList = [];
  }
  return successRes({ data: questionList });
}

export async function update(queryData: any) {
  const questionId = queryData.id;
  const question = await findOne({ _id: questionId });
  if (!question) {
    return notFoundReq('Question not found.');
  }
  if (question.status === 'SUBMITTED') {
    return badReq(
      "Question can't be edited because it's already in SUBMITTED state."
    );
  }
  const updatedQuestion = await updateById(questionId, queryData);
  logger.info(
    `Question Controller: Question is update with id: ${
      updatedQuestion._id
    } title: ${updatedQuestion.title}`
  );
  return successRes({ data: updatedQuestion });
}

export async function deleteQuestion(queryData: any) {
  const questionId = queryData.id;
  const question = await findOne({ _id: questionId });
  if (!question) {
    return notFoundReq('Question not found.');
  }
  if (question.status === 'SUBMITTED') {
    return badReq(
      "Question can't be deleted because it's already been SUBMITTED."
    );
  }
  const deletedQuestion = await deleteById(questionId);
  logger.info(
    `Question Controller: Question is deleted with id: ${
      deletedQuestion._id
    } title: ${deletedQuestion.title}`
  );
  return successRes({
    message: `Question ID ${questionId} has been deleted successfully.`
  });
}
