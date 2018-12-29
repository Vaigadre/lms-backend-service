import { AnyObject } from '../types/query-options.interface';

/**
 * @swagger
 * definitions:
 *  unauthorized:
 *    type: object
 *    properties:
 *      status:
 *        type: string
 *        example: Unauthorized
 *      statusCode:
 *        type: number
 *        example: 401
 *      message:
 *        type: string
 *        example: Invalid Token.
 */

export function unauthorizedRes(message) {
  return { status: 'Unauthorized', statusCode: 401, message };
}

/**
 * @swagger
 * definitions:
 *  internalServerError:
 *    type: object
 *    properties:
 *      status:
 *        type: string
 *        example: Internal Server Error
 *      statusCode:
 *        type: number
 *        example: 500
 *      message:
 *        type: object
 */
export function serverError(errorObject) {
  return { status: 'Internal Server Error', statusCode: 500, errorObject };
}

/**
 * @swagger
 * definitions:
 *  badRequest:
 *    type: object
 *    properties:
 *      status:
 *        type: string
 *        example: Bad Request
 *      statusCode:
 *        type: number
 *        example: 400
 *      message:
 *        type: string
 *        example: Message changes based on request.
 */
export function badReq(message) {
  return { status: 'Bad Request', statusCode: 400, message };
}

export function successRes({
  data = {},
  message = ''
}: {
  data?: any;
  message?: string;
}) {
  return { status: 'Success', statusCode: 200, data, message };
}

/**
 * @swagger
 * definitions:
 *  notFound:
 *    type: object
 *    properties:
 *      status:
 *        type: string
 *        example: Not Found
 *      statusCode:
 *        type: number
 *        example: 404
 *      message:
 *        type: string
 *        example: Question not found.
 */
export function notFoundReq(message) {
  return { status: 'Not Found', statusCode: 404, message };
}
