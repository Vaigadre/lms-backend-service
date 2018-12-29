import * as _ from 'lodash';

import { logger } from '../config/logger';
import answerSheetModel from '../models/answer-sheet.model';
import { AnswerSheet } from '../types/answer-sheet.interface';
import toolImporter from './tool-importer.service';

const defaultOption = {
  query: {},
  fields: {},
  options: {}
};

/**
 * This will get the one Answer information.
 */
export function findOne(
  query: object = {},
  fields: object = {},
  options: object = {}
): Promise<AnswerSheet | null> {
  if (_.isEmpty(query)) {
    logger.error('getOne should have conditions', query);
    throw new Error('getOne should have conditions');
  }
  return answerSheetModel.findOne(query, fields, options).exec();
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
  return answerSheetModel.findByIdAndUpdate(id, { $set: updateAnswer }).exec();
}
interface GScore {
  tool: string;
  correctAnswer: any;
  studentResponse: any;
}

export function generateScore({
  tool,
  correctAnswer,
  studentResponse
}: GScore) {
  const scoreData = { score: '' };
  switch (tool) {
    case 'ExcelTool':
      scoreData.score = toolImporter.excel$v1.excelGetScore(
        correctAnswer,
        studentResponse
      );

      break;
    case 'EHR':
      scoreData.score = toolImporter.ehr$v1(correctAnswer, studentResponse);

      break;
    default:
      console.log('Invalid tool type');
  }

  return scoreData;
}
