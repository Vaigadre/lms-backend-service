import { Router } from 'express';
import answerSheetRouter from './answer-sheet.route';
import answerRouter from './answer.route';
import outcomeRouter from './outcome.route';
import questionRouter from './question.route';
import scoreRouter from './score.route';

const router: Router = Router({ mergeParams: true });
router.use('/questions', questionRouter);
router.use('/answers', answerRouter);
router.use('/answer-sheets', answerSheetRouter);
router.use('/scores', scoreRouter);
router.use('/outcomes', outcomeRouter);

export default router;
