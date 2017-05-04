import SignupQuery from '../queries/SignupQuery';
import VisitorQuery from '../queries/VisitorQuery';

const conversion = [
  {
    Query: SignupQuery,
    options: {},
    column: 'total signups',
  },
  {
    Query: SignupQuery,
    options: { page: 'community' },
    column: 'total community signups',
  },
  {
    Query: SignupQuery,
    options: { page: 'action' },
    column: 'total action signups',
  },
  {
    Query: SignupQuery,
    options: { page: 'scholarship' },
    column: 'total scholarship signups',
  },
  {
    Query: SignupQuery,
    options: { page: 'faq' },
    column: 'total faq signups',
  },
  {
    Query: VisitorQuery,
    options: { affiliated: false },
    column: 'total unaffiliated visitors',
  },
  {
    Query: VisitorQuery,
    options: { affiliated: false, page: 'community' },
    column: 'total unaffiliated community visitors',
  },
  {
    Query: VisitorQuery,
    options: { affiliated: false, page: 'action' },
    column: 'total unaffiliated action visitors',
  },
  {
    Query: VisitorQuery,
    options: { affiliated: false, page: 'scholarship' },
    column: 'total unaffiliated scholarship visitors',
  },
  {
    Query: VisitorQuery,
    options: { affiliated: false, page: 'faq' },
    column: 'total unaffiliated faq visitors',
  },
  {
    computation: true,
    operation: 'divide',
    values: ['total signups', 'total unaffiliated visitors'],
    column: 'conversion rate (all pages)',
  },
  {
    computation: true,
    operation: 'divide',
    values: ['total community signups', 'total unaffiliated community visitors'],
    column: 'community conversion rate',
  },
  {
    computation: true,
    operation: 'divide',
    values: ['total action signups', 'total unaffiliated action visitors'],
    column: 'action conversion rate',
  },
  {
    computation: true,
    operation: 'divide',
    values: ['total scholarship signups', 'total unaffiliated scholarship visitors'],
    column: 'scholarship conversion rate',
  },
  {
    computation: true,
    operation: 'divide',
    values: ['total faq signups', 'total unaffiliated faq visitors'],
    column: 'faq conversion rate',
  },
];

export default conversion;
