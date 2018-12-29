import { NextFunction, Request, Response, Router } from 'express';
import * as _ from 'lodash';

export function queryToInteger(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const query = req.query;
  if (isInt(query.limit)) {
    req.query.limit = parseInt(query.limit);
  }

  if (isInt(query.skip)) {
    req.query.skip = parseInt(query.skip);
  }

  next();
}

// function x(query: any) {
//   const filteredList = ['limit', 'skip'];
//   if (query) {
//     for (const property in query) {
//       if (_.indexOf(filteredList, property) !== -1) {
//         if (isInt(query[property])) {

//         }
//       }
//     }
//   }
// }

function isInt(param: string) {
  if (!_.isEmpty(param) && !_.isNaN(parseInt(param))) {
    return true;
  }
  return false;
}
