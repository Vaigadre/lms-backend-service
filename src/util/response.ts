import { NextFunction, Request, Response, Router } from 'express';

interface ResponseData {
  status: string;
  statusCode: number;
  message?: string;
  errorObjec?: any;
  data?: any;
}
export function sendRes(res: Response, options: ResponseData) {
  if (options.statusCode) {
    res.status(options.statusCode).send(options);
  } else {
    res.send(options);
  }
}
