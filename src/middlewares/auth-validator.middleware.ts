import { NextFunction, Request, Response, Router } from 'express';
import * as _ from 'lodash';
import { config } from '../config/config';
import { generateCondition } from '../util/query-builder';
import { sendRes } from '../util/response';
import { unauthorizedRes } from '../util/response-builder';

const jwt = require('jsonwebtoken');
const mandatoryList = [
  'userId',
  'toolConsumerInstanceGuid',
  'userRole',
  'contextId'
];

export function authToken(req: Request, res: Response, next: NextFunction) {
  const token = req.get('x-access-token');
  if (!token) {
    sendRes(res, unauthorizedRes('Token is missing'));
    return;
  }
  const obj = jwt.verify(
    token,
    config.publicCert,
    (err: Error, decoded: any) => {
      if (err) {
        sendRes(res, unauthorizedRes('Invalid Token.'));
        return;
      }
      if (hasEveryThing(decoded, mandatoryList)) {
        // decoded = mappingData(decoded);
        decoded = generateCondition(decoded, mandatoryList);
        req.body = { ...req.body, ...decoded };
        next();
        return;
      }
      sendRes(res, unauthorizedRes('Token corrupted.'));
      return;
    }
  );
}

function hasEveryThing(data: object, reqList: string[]) {
  return _.every(reqList, _.partial(_.has, data));
}

// function mappingData(org) {
//   const returnData = {};
//   Object.keys(org).forEach(key => {
//     if (mappingD[key]) {
//       returnData[mappingD[key]] = org[key];
//     }
//   });

//   return returnData;
// }

// const mappingD = {
//   user_id: 'userId',
//   tool_consumer_instance_guid: 'toolConsumerInstanceGuid',
//   tool: 'tool',
//   roles: 'userRole',
//   context_id: 'contextId'
// };
