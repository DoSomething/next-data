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
    column: 'total community page signups',
  },
  {
    Query: SignupQuery,
    options: { page: 'action' },
    column: 'total action page signups',
  },
  {
    Query: SignupQuery,
    options: { page: 'scholarship' },
    column: 'total scholarship page signups',
  },
  {
    Query: SignupQuery,
    options: { page: 'faq' },
    column: 'total faq page signups',
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
    values: ['total community page signups', 'total unaffiliated community visitors'],
    column: 'community conversion rate',
  },
  {
    computation: true,
    operation: 'divide',
    values: ['total action page signups', 'total unaffiliated action visitors'],
    column: 'action conversion rate',
  },
  {
    computation: true,
    operation: 'divide',
    values: ['total scholarship page signups', 'total unaffiliated scholarship visitors'],
    column: 'scholarship conversion rate',
  },
  {
    computation: true,
    operation: 'divide',
    values: ['total faq page signups', 'total unaffiliated faq visitors'],
    column: 'faq conversion rate',
  },
];

export default conversion;
