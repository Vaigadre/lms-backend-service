import * as assert from 'assert';
import { config, NODE_ENV } from '../../config/config';
describe('Array', () => {
  describe('NODE_ENV()', () => {
    it('should return test ', () => {
      assert.equal(NODE_ENV, 'test');
    });
  });
});
