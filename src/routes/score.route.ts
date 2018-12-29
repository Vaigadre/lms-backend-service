import { NextFunction, Request, Response, Router } from 'express';
import { queryToInteger } from '../middlewares/util.middleware';

const expressJoi = require('express-joi-validator');

const router = Router({ mergeParams: true });
import { generateScore, getScoreById } from '../controllers/score.controller';
import { createAnswerValidator } from '../middlewares/request-validator.middleware';

router.post('/:id', async (req: Request, res: Response) => {
  try {
    req.body.tool = req.params.tool;
    req.body.id = req.params.id;
    const returnStatus = await generateScore(req.body);
    res.json(returnStatus);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get('/:id', async (req: Request, res: Response) => {
  try {
    // req.body.tool = req.params.tool;
    const returnStatus = await getScoreById(req.params.id);
    res.json(returnStatus);
  } catch (error) {
    res.status(500).json(error);
  }
});

export default router;
