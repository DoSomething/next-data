import SignupQuery from '../queries/SignupQuery';
import EntranceSignupsQuery from '../queries/EntranceSignupsQuery';
import EntranceQuery from '../queries/EntranceQuery';

const entrances = [
  {
    Query: EntranceQuery,
    options: { page: 'community' },
    column: 'total unaffiliated community entrances',
  },
  {
    Query: EntranceSignupsQuery,
    options: { page: 'community' },
    column: 'community entrance signups',
  },
  {
    computation: true,
    operation: 'divide',
    values: ['community entrance signups', 'total unaffiliated community entrances'],
    column: 'community entrance conversion rate',
  },
  {
    Query: EntranceQuery,
    options: { page: 'action' },
    column: 'total unaffiliated action entrances',
  },
  {
    Query: EntranceSignupsQuery,
    options: { page: 'action' },
    column: 'action entrance signups',
  },
  {
    computation: true,
    operation: 'divide',
    values: ['action entrance signups', 'total unaffiliated action entrances'],
    column: 'action entrance conversion rate',
  },
  {
    Query: EntranceQuery,
    options: { page: 'scholarship' },
    column: 'total unaffiliated scholarship entrances',
  },
  {
    Query: EntranceSignupsQuery,
    options: { page: 'scholarship' },
    column: 'scholarship entrance signups',
  },
  {
    computation: true,
    operation: 'divide',
    values: ['scholarship entrance signups', 'total unaffiliated scholarship entrances'],
    column: 'scholarship entrance conversion rate',
  },
  {
    Query: EntranceQuery,
    options: { page: 'faq' },
    column: 'total unaffiliated faq entrances',
  },
  {
    Query: EntranceSignupsQuery,
    options: { page: 'faq' },
    column: 'faq entrance signups',
  },
  {
    computation: true,
    operation: 'divide',
    values: ['faq entrance signups', 'total unaffiliated faq entrances'],
    column: 'faq entrance conversion rate',
  },
];

export default entrances;
