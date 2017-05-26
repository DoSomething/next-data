import SignupQuery from '../queries/SignupQuery';
import EntranceSignupsQuery from '../queries/EntranceSignupsQuery';
import VisitorQuery from '../queries/VisitorQuery';
import EntranceQuery from '../queries/EntranceQuery';

const test = [
  {
    Query: EntranceQuery,
    options: { page: 'scholarship' },
    column: 'total unaffiliated scholarship entrances',
    skipCohort: true,
  },
  {
    Query: EntranceSignupsQuery,
    options: { page: 'scholarship' },
    column: 'scholarship entrance signups',
    skipCohort: true,
  },
  {
    skipCohort: true,
    computation: true,
    operation: 'divide',
    values: ['scholarship entrance signups', 'total unaffiliated scholarship entrances'],
    column: 'scholarship entrance conversion rate',
  },
];

export default test;
