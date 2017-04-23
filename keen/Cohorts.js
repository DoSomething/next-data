const ResponseHandlers = require('./ResponseHandlers');
const Queries = require('./Queries');
const names = require('./QueryNames');

const SignupCohort = () => {
  const cohorts = [];

  const startQuery = Queries[names.NUMBER_OF_SIGNUPS];
  start.query.timeframe = {
    start: "2017-04-18T00:00:00-05:00",
    end: "2017-04-19T00:00:00-05:00",
  };

  const cohort = {
    name: 'test signup cohort',
    start: [startQuery],
    actor: 'user.id',
    postProcess: res => console.log(res)
  };

  return [cohort];
};

module.exports = [SignupCohort];
