// import * as chai from 'chai';
// // tslint:disable-next-line:no-duplicate-imports
// import { assert, expect } from 'chai';
// import * as chaiAsPromised from 'chai-as-promised';
// import * as _ from 'lodash';
// import * as sinon from 'sinon';
// import * as sinonChai from 'sinon-chai';
// import {
//   CreateQuestion,
//   getQuestionById,
//   getQuestionList,
//   update
// } from '../../controllers/question.controller';
// import questionModel from '../../models/question.model';
// import { mockExec } from '../mock/module/spec-util';

// const should = require('chai').should();
// chai.use(sinonChai);
// chai.use(chaiAsPromised);

// let findOneAndUpdateStub: sinon.SinonStub;
// let createStub: sinon.SinonStub;
// let findStub: sinon.SinonStub;

// describe('Question controller', () => {
//   beforeEach(() => {
//     findOneAndUpdateStub = sinon
//       .stub(questionModel, 'findOneAndUpdate')
//       .returns(mockExec({ title: 'test' }));
//     createStub = sinon
//       .stub(questionModel, 'create')
//       .returns(Promise.resolve({ title: 'test' }));
//     findStub = sinon
//       .stub(questionModel, 'findOne')
//       .returns(mockExec({ title: 'test' }));
//   });

//   afterEach(() => {
//     findOneAndUpdateStub.restore();
//     createStub.restore();
//     findStub.restore();
//   });

//   describe('', () => {
//     it('should return -1 when the value is not present', done => {
//       CreateQuestion({ title: 'yo' }).then(res => {
//         console.log(res);
//         expect(res.data.title).to.equal('test');
//         done();
//       });
//     });
//   });
// });
