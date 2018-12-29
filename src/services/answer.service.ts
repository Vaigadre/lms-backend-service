import * as _ from 'lodash';
import { log } from 'util';
import { logger } from '../config/logger';
import answerModel from '../models/answer.model';
import questionModel from '../models/question.model';
import { Answer } from '../types/answer.interface';
import { generateQuery } from '../util/query-builder';

/**
 * This function will validate the answer object
 * and create new answer.
 */
export function create(newAnswer: Answer): Promise<Answer> {
  if (_.isEmpty(newAnswer)) {
    logger.error('Answer cannot be empty.', newAnswer);
    throw new Error('Answer cannot be empty.');
  }
  return answerModel.create(newAnswer);
}

/**
 * This will get one Answer information.
 */
export function findOneAns(
  query: object = {},
  fields: object = {},
  options: object = { lean: true }
): Promise<Answer | null> {
  if (_.isEmpty(query)) {
    logger.error('getOne should have conditions', query);
    throw new Error('getOne should have conditions');
  }
  return answerModel.findOne(query, fields, options).exec();
}

// export function find(reqQuery: object = {}): Promise<Question[] | null> {
//   const { condition, projection, options } = generateQuery(
//     reqQuery,
//     whitelistFields
//   );

//   return answerModel.find(condition, projection, options).exec();
// }

/**
 * This function update the existing answer object
 * for a particular passed question ID.
 */
export function updateById(id: string, updateAnswer: Answer) {
  if (_.isEmpty(id)) {
    logger.error('updateById should have ID', id);
    throw new Error('updateById should have ID.');
  }

  if (_.isEmpty(updateAnswer)) {
    logger.error('updateById should have updateAnswer', updateAnswer);
    throw new Error('updateById should have updateAnswer');
  }
  return answerModel
    .findOneAndUpdate(
      { questionId: id },
      { $set: { answerData: updateAnswer.answerData } },
      { new: true }
    )
    .exec();
}

export function deleteById(id: string) {
  if (_.isEmpty(id)) {
    logger.error('deleteById should have ID', id);
    throw new Error('deleteById should have ID.');
  }
  return answerModel.deleteOne({ questionId: id }).exec();
}
