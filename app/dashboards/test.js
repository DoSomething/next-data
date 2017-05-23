import SignupQuery from '../queries/SignupQuery';
import EntranceSignupsQuery from '../queries/EntranceSignupsQuery';
import VisitorQuery from '../queries/VisitorQuery';

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
  {
    Query: VisitorQuery,
    options: { affiliated: false, page: 'scholarship,scholarships' },
    column: 'total unaffiliated scholarship visitors',
  },
];

export default test;
