import * as _ from 'lodash';
import { logger } from '../config/logger';
import outcomeModel from '../models/outcome.model';
import { Outcome } from '../types/outcome.interface';
import { AnyObject } from '../types/query-options.interface';

export function create(outcome: Outcome): Promise<Outcome> {
  if (_.isEmpty(outcome)) {
    logger.error('Outcome cannot be empty.', outcome);
    throw new Error('Outcome cannot be empty.');
  }
  return outcomeModel.create(outcome);
}

export function findOne(query: AnyObject = {}): Promise<Outcome> {
  if (_.isEmpty(query)) {
    logger.error('getOne should have conditions', query);
    throw new Error('getOne should have conditions');
  }

  return outcomeModel.findOne(query).exec();
}
