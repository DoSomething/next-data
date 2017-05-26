import SignupQuery from '../queries/SignupQuery';
import EntranceSignupsQuery from '../queries/EntranceSignupsQuery';
import VisitorQuery from '../queries/VisitorQuery';

const test = [
  {
    Query: SignupQuery,
    options: {},
    column: 'total signups',
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
    values: ['scholarship entrance signups', 'total signups'],
    column: 'percent of signups with scholarship entrance',
  },
];

export default test;
