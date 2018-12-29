import { NextFunction, Request, Response, Router } from 'express';
import { queryToInteger } from '../middlewares/util.middleware';
const router = Router({ mergeParams: true });
import * as request from 'superagent';
import { logger } from '../config/logger';
import { getOutcomeById, saveOutcome } from '../controllers/outcome.controller';
import { sendRes } from '../util/response';
import { serverError } from '../util/response-builder';

router.post('/', async (req: Request, res: Response) => {
  try {
    req.body.tool = req.params.tool;
    const returnStatus = await saveOutcome(req.body);
    const postData = { requestId: req.body.requestId };
    sendRes(res, returnStatus);
    // res.writeHead(307, {'x-access-token': 'sdjswdjskh2'});
    // res.redirect(307, 'http://localhost:4000/testred');
    //   const resStatus: number = await postLtiOutcome(postData, token);
    //   console.log(resStatus);
    logger.info(
      `Outcome api completed with status ${returnStatus.status} for activity
        ${returnStatus.data.activityType}`
    );
  } catch (error) {
    sendRes(res, serverError(error));
  }
});

router.get('/:id', async (req: Request, res: Response) => {
  try {
    // req.body.tool = req.params.tool;
    const returnStatus = await getOutcomeById(req.params.id);
    sendRes(res, returnStatus);
  } catch (error) {
    sendRes(res, serverError(error));
  }
});

// function postLtiOutcome(reqBody, token): Promise<number> {
//   return new Promise((resolve, reject) => {
//     process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
//     request
//       .post('https://35.184.105.244/launcher-srvc/lti/auth/activity/outcome')
//       .set('x-access-token', token)
//       .send(reqBody)
//       .set('Content-Type', 'application/json')
//       .end((err, res) => {
//         console.log(
//           `response body: ${JSON.stringify(res.body)} \n ${res.status}`
//         );
//         err ? reject(err) : resolve(res.status);
//       });
//   });
// }
export default router;
