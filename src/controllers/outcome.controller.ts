import { logger } from '../config/logger';
import { create, findOne } from '../services/outcome.service';
import { Outcome } from '../types/outcome.interface';
import { badReq, notFoundReq, successRes } from '../util/response-builder';

export async function saveOutcome(outcome: Outcome) {
  const savedOutcome = await create(outcome);
  logger.info(
    `Question Controller: Outcome is added with id: ${
      savedOutcome._id
    } activity: ${savedOutcome.data.activityType}`
  );
  return successRes({ data: savedOutcome });
}

export async function getOutcomeById(id: string) {
  const outcome = await findOne({ requestId: id });
  if (!outcome) {
    return notFoundReq('Outcome not found.');
  }
  return successRes({ data: outcome });
}
