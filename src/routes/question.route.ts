import { NextFunction, Request, Response, Router } from 'express';
import { queryToInteger } from '../middlewares/util.middleware';

const expressJoi = require('express-joi-validator');

const router = Router({ mergeParams: true });
import {
  CreateQuestion,
  deleteQuestion,
  getQuestionById,
  getQuestionList,
  update
} from '../controllers/question.controller';
import {
  createQuestionValidator,
  defaultGetValidator,
  updateQuestionValidator
} from '../middlewares/request-validator.middleware';
import { sendRes } from '../util/response';
import { serverError } from '../util/response-builder';

/**
 * @swagger
 * definitions:
 *  question:
 *    type: object
 *    properties:
 *      title:
 *        type: string
 *        example: This is question title.
 *      questionData:
 *        type: object
 *      description:
 *        type: string
 *        example: |
 *          Lorem Ipsum is simply dummy text of the printing and typesetting industry.
 *          Lorem Ipsum has been the industry's standard dummy text ever since the 1500s
 *      status:
 *        type: string
 *        description: Question status
 *        enum:
 *          - INPROGRESS
 *          - SAVED
 *          - SUBMITTED
 *      tool:
 *        type: string
 *        description: Tool to which question belongs to.
 *        example: excel
 *      toolConsumerInstanceGuid:
 *        type: string
 *        description: Question belongs to which org.
 *        example: 123ewq
 *      userId:
 *        type: string
 *        description: Question created be which user
 *        example: ewq321
 *      isDeleted:
 *        type: boolean
 *        description: Is question deleted status.
 *        example: false
 *  arrayOfQuestion:
 *    type: object
 *    properties:
 *      status:
 *        type: string
 *        example: Success
 *      statusCode:
 *        type: number
 *        example: 200
 *      data:
 *        items:
 *          $ref: '#/definitions/question'
 *  createQuestion:
 *    type: object
 *    required:
 *      - status
 *    properties:
 *      title:
 *        type: string
 *        example: This is question title.
 *      questionData:
 *        type: object
 *      description:
 *        type: string
 *        example: |
 *          Lorem Ipsum is simply dummy text of the printing and typesetting industry.
 *          Lorem Ipsum has been the industry's standard dummy text ever since the 1500s
 *      status:
 *        type: string
 *        description: Question status
 *        enum:
 *          - INPROGRESS
 *          - SAVED
 *          - SUBMITTED
 *  questionResponse:
 *    type: object
 *    properties:
 *      status:
 *        type: string
 *        example: Success
 *      statusCode:
 *        type: number
 *        example: 200
 *      data:
 *        $ref: '#/definitions/question'
 */

/**
 * @swagger
 *  '/{tool}/questions':
 *    post:
 *      tags:
 *        - Question
 *      summary: Add a new question
 *      description: ''
 *      operationId: addQuestion
 *      consumes:
 *        - application/json
 *      produces:
 *        - application/json
 *      parameters:
 *        - in: path
 *          name: tool
 *          description: tool Name
 *          required: true
 *          type: string
 *        - in: body
 *          name: body
 *          description: Question object that needs to be added to the store
 *          required: true
 *          schema:
 *            $ref: '#/definitions/createQuestion'
 *      responses:
 *        '200':
 *          description: Added successfully.
 *          schema:
 *            $ref: '#/definitions/questionResponse'
 *        '401':
 *          description: Unauthorized
 *          schema:
 *            $ref: '#/definitions/unauthorized'
 *        '400':
 *          description: Bad Request
 *          schema:
 *            $ref: '#/definitions/badRequest'
 *      security:
 *        - token: []
 */

router.post(
  '/',
  expressJoi(createQuestionValidator),
  async (req: Request, res: Response) => {
    try {
      req.body.tool = req.params.tool;
      const returnStatus = await CreateQuestion(req.body);
      sendRes(res, returnStatus);
    } catch (error) {
      sendRes(res, serverError(error));
    }
  }
);

/**
 * @swagger
 *  '/{tool}/questions/{questionId}':
 *    get:
 *      tags:
 *        - Question
 *      summary: Get question
 *      description: ''
 *      operationId: getQuestion
 *      consumes:
 *        - application/json
 *      produces:
 *        - application/json
 *      parameters:
 *        - in: path
 *          name: tool
 *          description: tool Name
 *          required: true
 *          type: string
 *        - in: path
 *          name: questionId
 *          description: Question ID
 *          required: true
 *          type: string
 *      responses:
 *        '200':
 *          description: Question Info.
 *          schema:
 *            $ref: '#/definitions/questionResponse'
 *        '401':
 *          description: Unauthorized
 *          schema:
 *            $ref: '#/definitions/unauthorized'
 *        '400':
 *          description: Bad Request
 *          schema:
 *            $ref: '#/definitions/badRequest'
 *        '404':
 *          description: Not Found
 *          schema:
 *            $ref: '#/definitions/notFound'
 *      security:
 *        - token: []
 */
router.get(
  '/:id',
  expressJoi(defaultGetValidator),
  async (req: Request, res: Response) => {
    try {
      // req.body.tool = req.params.tool;
      const returnStatus = await getQuestionById(req.params.id);
      sendRes(res, returnStatus);
    } catch (error) {
      sendRes(res, serverError(error));
    }
  }
);

/**
 * @swagger
 *  '/{tool}/questions':
 *    get:
 *      tags:
 *        - Question
 *      summary: Get all questions
 *      description: ''
 *      operationId: getAllQuestion
 *      consumes:
 *        - application/json
 *      produces:
 *        - application/json
 *      parameters:
 *        - name: tool
 *          in: path
 *          description: tool Name
 *          required: true
 *          type: string
 *        - name: status
 *          in: query
 *          description: Question status
 *          required: false
 *          type: string
 *        - name: userId
 *          in: query
 *          description: Question userId
 *          required: false
 *          type: string
 *        - name: limit
 *          in: query
 *          description: Number of question per request
 *          required: false
 *          type: number
 *        - name: skip
 *          in: query
 *          description: Number of skip for pagination
 *          required: false
 *          type: number
 *        - name: sort
 *          in: query
 *          description: |
 *            Sort by and also sort direction.
 *            sort=xyz for sort by xyz in asc sort=-xyz for sort by xyz in desc
 *          required: false
 *          type: string
 *      responses:
 *        '200':
 *          description: Question Info.
 *          schema:
 *            $ref: '#/definitions/arrayOfQuestion'
 *        '401':
 *          description: Unauthorized
 *          schema:
 *            $ref: '#/definitions/unauthorized'
 *        '400':
 *          description: Bad Request
 *          schema:
 *            $ref: '#/definitions/badRequest'
 *        '404':
 *          description: Not Found
 *          schema:
 *            $ref: '#/definitions/notFound'
 *      security:
 *        - token: []
 */
router.get('/', queryToInteger, async (req: Request, res: Response) => {
  try {
    console.log(req.query);
    req.query.tool = req.params.tool;
    const returnStatus = await getQuestionList(req.query);
    sendRes(res, returnStatus);
  } catch (error) {
    sendRes(res, serverError(error));
  }
});

/**
 * @swagger
 *  '/{tool}/questions/{questionId}':
 *    put:
 *      tags:
 *        - Question
 *      summary: Update question
 *      description: ''
 *      operationId: updateQuestion
 *      consumes:
 *        - application/json
 *      produces:
 *        - application/json
 *      parameters:
 *        - in: path
 *          name: tool
 *          description: tool Name
 *          required: true
 *          type: string
 *        - in: path
 *          name: questionId
 *          description: Question ID
 *          required: true
 *          type: string
 *        - in: body
 *          name: body
 *          description: Question object that needs to be added to the store
 *          required: true
 *          schema:
 *            $ref: '#/definitions/createQuestion'
 *      responses:
 *        '200':
 *          description: Updated successfully.
 *          schema:
 *            $ref: '#/definitions/questionResponse'
 *        '401':
 *          description: Unauthorized
 *          schema:
 *            $ref: '#/definitions/unauthorized'
 *        '400':
 *          description: Bad Request
 *          schema:
 *            $ref: '#/definitions/badRequest'
 *        '404':
 *          description: Not Found
 *          schema:
 *            $ref: '#/definitions/notFound'
 *      security:
 *        - token: []
 */
router.put(
  '/:id',
  expressJoi(updateQuestionValidator),
  async (req: Request, res: Response) => {
    try {
      req.body.id = req.params.id;
      req.body.tool = req.params.tool;
      const returnStatus = await update(req.body);
      sendRes(res, returnStatus);
    } catch (error) {
      sendRes(res, serverError(error));
    }
  }
);

/**
 * @swagger
 *  '/{tool}/questions/{questionId}':
 *    delete:
 *      tags:
 *        - Question
 *      summary: delete question
 *      description: ''
 *      operationId: deleteQuestion
 *      consumes:
 *        - application/json
 *      produces:
 *        - application/json
 *      parameters:
 *        - in: path
 *          name: tool
 *          description: tool Name
 *          required: true
 *          type: string
 *        - in: path
 *          name: questionId
 *          description: Question ID
 *          required: true
 *          type: string
 *      responses:
 *        '200':
 *          description: Updated successfully.
 *          schema:
 *            $ref: '#/definitions/questionResponse'
 *        '401':
 *          description: Unauthorized
 *          schema:
 *            $ref: '#/definitions/unauthorized'
 *        '400':
 *          description: Bad Request
 *          schema:
 *            $ref: '#/definitions/badRequest'
 *        '404':
 *          description: Not Found
 *          schema:
 *            $ref: '#/definitions/notFound'
 *      security:
 *        - token: []
 */
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    req.body.id = req.params.id;
    req.body.tool = req.params.tool;
    const returnStatus = await deleteQuestion(req.body);
    sendRes(res, returnStatus);
  } catch (error) {
    sendRes(res, serverError(error));
  }
});

export default router;
