import { Request, Response, Router } from 'express';

import {
  getAnswerById,
  setAnswer,
  update
} from '../controllers/answer-sheet.controller';

const router = Router();

router.post('/', async (req: Request, res: Response) => {
  try {
    req.body.tool = req.params.tool;
    const returnStatus = await setAnswer(req.body);
    res.json(returnStatus);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get('/:id', async (req: Request, res: Response) => {
  try {
    const returnStatus = await getAnswerById(req.params.id);
    res.json(returnStatus);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.put('/:id', async (req: Request, res: Response) => {
  try {
    req.body.id = req.params.id;
    const returnStatus = await update(req.body);
    res.json(returnStatus);
  } catch (error) {
    res.status(500).json(error);
  }
});

export default router;
