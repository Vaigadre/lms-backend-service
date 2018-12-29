import * as _ from 'lodash';

import { logger } from '../config/logger';
import answerSheetModel from '../models/answer-sheet.model';
import { AnswerSheet } from '../types/answer-sheet.interface';

const defaultOption = {
  query: {},
  fields: {},
  options: {}
};
export function create(answer: AnswerSheet): Promise<AnswerSheet> {
  if (_.isEmpty(answer)) {
    logger.error('Question cannot be empty.', answer);
    throw new Error('Question cannot be empty.');
  }
  return answerSheetModel.create(answer);
}

/**
 * This will get the one Answer information.
 */
export function findOne(
  query: object = {},
  fields: object = {},
  options: object = { lean: true }
): Promise<AnswerSheet | null> {
  if (_.isEmpty(query)) {
    logger.error('getOne should have conditions', query);
    throw new Error('getOne should have conditions');
  }
  return answerSheetModel.findOne(query, fields, options).exec();
}

export function find(
  query: object = {},
  fields: object = {},
  options: object = {}
): Promise<AnswerSheet[] | null> {
  return answerSheetModel.find(query, fields, options).exec();
}

export function updateById(id: string, updateAnswer: AnswerSheet) {
  if (_.isEmpty(id)) {
    logger.error('updateById should have ID', id);
    throw new Error('updateById should have ID.');
  }

  if (_.isEmpty(updateAnswer)) {
    logger.error('updateById should have updateAnswer', updateAnswer);
    throw new Error('updateById should have updateAnswer');
  }
  return answerSheetModel
    .findByIdAndUpdate(id, { $set: updateAnswer }, { new: true })
    .exec();
}
