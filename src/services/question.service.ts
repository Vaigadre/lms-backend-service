import * as _ from 'lodash';
import { logger } from '../config/logger';
import questionModel from '../models/question.model';
import { AnyObject } from '../types/query-options.interface';
import { Question } from '../types/question.interface';
import { generateCondition, generateQuery } from '../util/query-builder';

// All fields of the Question collection.
const allFields: string[] = [
  '_id',
  'title',
  'tool',
  'questionData',
  'contextId',
  'status',
  'toolConsumerInstanceGuid',
  'description',
  'userId',
  'createdAt',
  'updatedAt',
  'isDeleted',
  'metaData'
];
// Field which are allowed to add in DB.
const createFields: string[] = _.without(
  allFields,
  '_id',
  'createdAt',
  'updatedAt'
);
// Field which are allowed to update in DB.
const updateFields: string[] = [
  'questionData',
  'status',
  'title',
  'description',
  'metaData'
];
// Field which are allowed to search in DB.
const searchFields: string[] = _.without(
  allFields,
  '_id',
  'questionData',
  'createdAt',
  'updatedAt'
);

/**
 * This function will validate the question object
 * and create new question.
 */
export function create(newQuestion: Question): Promise<Question> {
  const question = generateCondition(newQuestion, createFields);
  if (_.isEmpty(question)) {
    logger.error('Question cannot be empty.', question);
    throw new Error('Question cannot be empty.');
  }
  return questionModel.create(question);
}

/**
 * This will get the one Question based on the query.
 */
export function findOne(
  query: AnyObject = {},
  fields: object = {},
  options: object = { lean: true }
): Promise<Question | null> {
  if (_.isEmpty(query)) {
    logger.error('getOne should have conditions', query);
    throw new Error('getOne should have conditions');
  }
  query.isDeleted = false;
  return questionModel.findOne(query, fields, options).exec();
}
/**
 * This function will find all the question based on query.
 */
export function find(reqQuery: object = {}): Promise<Question[] | null> {
  const { condition, projection, options } = generateQuery(
    reqQuery,
    searchFields
  );
  condition.isDeleted = false;
  return questionModel.find(condition, projection, options).exec();
}

/**
 * This function will Update the question by id.
 * Only editable fields can be updated.
 */
export function updateById(id: string, updateQuestion: Question) {
  if (_.isEmpty(id)) {
    logger.error('updateById should have ID', id);
    throw new Error('updateById should have ID.');
  }
  updateQuestion = generateCondition(updateQuestion, updateFields);
  if (_.isEmpty(updateQuestion)) {
    logger.error('updateById should have updateQuestion', updateQuestion);
    throw new Error('updateById should have updateQuestion');
  }
  return questionModel
    .findByIdAndUpdate(id, { $set: updateQuestion }, { new: true })
    .exec();
}

export function deleteById(id: string) {
  if (_.isEmpty(id)) {
    logger.error('deleteById should have ID');
    throw new Error('deleteById should have ID.');
  }
  const updateQuestion = {
    isDeleted: true
  };
  return questionModel
    .findByIdAndUpdate(id, { $set: updateQuestion }, { new: true })
    .exec();
}
