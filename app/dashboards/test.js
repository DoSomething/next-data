import SignupQuery from '../queries/SignupQuery';
import EntranceSignupsQuery from '../queries/EntranceSignupsQuery';

const test = [
  {
    Query: EntranceSignupsQuery,
    options: { page: 'community' },
    column: 'community entrance signups',
  },
  {
    Query: SignupQuery,
    options: { page: 'community' },
    column: 'total community signups',
  },
];

export default test;
