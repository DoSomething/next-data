import SignupQuery from '../queries/SignupQuery';
import EntranceSignupsQuery from '../queries/EntranceSignupsQuery';
import VisitorQuery from '../queries/VisitorQuery';

const test = [
  {
    Query: EntranceSignupsQuery,
    options: { page: 'community' },
    column: 'community entrance signups',
    skipCohort: true,
  },
  {
    Query: SignupQuery,
    options: { page: 'community' },
    column: 'total community signups',
    skipCohort: true,
  },
  {
    Query: VisitorQuery,
    options: { affiliated: false, page: 'scholarship' },
    column: 'total unaffiliated scholarship visitors',
    skipCohort: true,
  },
];

export default test;
