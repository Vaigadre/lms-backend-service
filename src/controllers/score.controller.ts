import { logger } from '../config/logger';
import * as answerSheetService from '../services/answer-sheet.service';
import * as answerService from '../services/answer.service';
import * as scoreService from '../services/score.service';
import { AnswerSheet } from '../types/answer-sheet.interface';
import { Answer } from '../types/answer.interface';

// const util = require('../util/resFormat');

export async function generateScore(req: any) {
  const answerId = req.id;

  const answerSheet = await answerSheetService.findOne({ _id: answerId });
  if (!answerSheet) {
    return 'empty';
  }
  const answer = await answerService.findOneAns({
    questionId: answerSheet.questionId
  });
  const scoreData = scoreService.generateScore({
    tool: req.tool,
    correctAnswer: answer.answerData,
    studentResponse: answerSheet.data
  });
  await scoreService.updateById(answerId, scoreData);
  return { status: 'Success', data: scoreData };
}

export async function getScoreById(id: string) {
  const score = await scoreService.findOne({ _id: id }, { score: 1 });
  if (!score) {
    return { status: 'Empty', data: '' };
  }
  return { status: 'Success', data: score };
}
