import { NextFunction, Request, Response, Router } from 'express';
import { queryToInteger } from '../middlewares/util.middleware';

const expressJoi = require('express-joi-validator');
import { sendRes } from '../util/response';
import { serverError } from '../util/response-builder';

const router = Router({ mergeParams: true });
import {
  deleteAnswer,
  getAnswerById,
  setAnswer,
  update
} from '../controllers/answer.controller';
import {
  createAnswerValidator,
  updateAnswerValidator
} from '../middlewares/request-validator.middleware';

router.post(
  '/',
  expressJoi(createAnswerValidator),
  async (req: Request, res: Response) => {
    try {
      req.body.tool = req.params.tool;
      const returnStatus = await setAnswer(req.body);
      res.json(returnStatus);
    } catch (error) {
      sendRes(res, serverError(error));
    }
  }
);

router.get('/:id', async (req: Request, res: Response) => {
  try {
    // req.body.tool = req.params.tool;
    const returnStatus = await getAnswerById(req.params.id);
    res.json(returnStatus);
  } catch (error) {
    sendRes(res, serverError(error));
  }
});

router.put(
  '/:id',
  expressJoi(updateAnswerValidator),
  async (req: Request, res: Response) => {
    try {
      req.body.questionId = req.params.id;
      const returnStatus = await update(req.body);
      res.json(returnStatus);
    } catch (error) {
      sendRes(res, serverError(error));
    }
  }
);

router.delete('/:id', async (req: Request, res: Response) => {
  try {
    req.body.tool = req.params.tool;
    req.body.questionId = req.params.id;

    const returnStatus = await deleteAnswer(req.body);
    res.json(returnStatus);
  } catch (error) {
    sendRes(res, serverError(error));
  }
});

export default router;
