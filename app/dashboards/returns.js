import ReturnQuery from '../queries/ReturnQuery';
import SignupQuery from '../queries/SignupQuery';

const returns = [
  {
    Query: SignupQuery,
    options: {},
    column: 'total signups',
  },
  {
    Query: ReturnQuery,
    options: { question: 'median' },
    column: 'total returns median',
    skipCohort: true,
  },
  {
    Query: ReturnQuery,
    options: { question: '1x' },
    column: 'total 1x returns',
    skipCohort: true,
  },
  {
    Query: ReturnQuery,
    options: { question: '2x' },
    column: 'total 2x returns',
    skipCohort: true,
  },
  {
    Query: ReturnQuery,
    options: { question: '3x' },
    column: 'total 3x returns',
    skipCohort: true,
  },
  {
    Query: ReturnQuery,
    options: { question: '4x+' },
    column: 'total 4x+ returns',
    skipCohort: true,
  },
  {
    computation: true,
    operation: 'add',
    values: ['total 1x returns', 'total 2x returns', 'total 3x returns', 'total 4x+ returns'],
    column: 'total 1+plus returns',
  },
  {
    computation: true,
    operation: 'add',
    values: ['total 2x returns', 'total 3x returns', 'total 4x+ returns'],
    column: 'total 2+plus returns',
  },
  {
    computation: true,
    operation: 'add',
    values: ['total 3x returns', 'total 4x+ returns'],
    column: 'total 3+plus returns',
  },
  {
    computation: true,
    operation: 'divide',
    values: ['total 1+plus returns', 'total signups'],
    column: '1x return rate',
  },
  {
    computation: true,
    operation: 'divide',
    values: ['total 2+plus returns', 'total signups'],
    column: '2x return rate',
  },
  {
    computation: true,
    operation: 'divide',
    values: ['total 3+plus returns', 'total signups'],
    column: '3x return rate',
  },
  {
    computation: true,
    operation: 'divide',
    values: ['total 4x+ returns', 'total signups'],
    column: '4x+ return rate',
  },
];

export default returns;
