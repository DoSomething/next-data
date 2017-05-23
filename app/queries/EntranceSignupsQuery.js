import Keen from 'keen-js';
import { Query } from './_base';
import AffiliatedFilter from '../filters/AffiliatedFilter';
import AppInitFilter from '../filters/AppInitFilter';
import SignupFilter from '../filters/SignupFilter';
import { pageHelper } from '../helpers';

class EntranceStepOne extends Query {
  constructor(client, options = { page: null }) {
    super(client, options);

    this.addFilter(new AppInitFilter());
    this.addFilter(new AffiliatedFilter(false));
    pageHelper.call(this, options.page);
  }
}

class EntranceStepTwo extends Query {
  constructor(client, options = { page: null }) {
    super(client, options);

    this.addFilter(new SignupFilter());
  }
}

class EntranceSignupsQuery extends Query {
  constructor(client, options = { page: null }) {
    super(client, options);

    this.stepOne = new EntranceStepOne(client, options);
    this.stepTwo = new EntranceStepTwo(client, options);
  }

  async perform() {
    this.stepOne.inheritQuery(this);
    const stepOneProps = this.stepOne.applyDefaults({
      event_collection: 'action',
      actor_property: 'user.session.id',
    });

    this.stepTwo.inheritQuery(this);
    const stepTwoProps = this.stepTwo.applyDefaults({
      event_collection: 'action',
      actor_property: 'user.session.id',
    });

    const keenQuery = new Keen.Query('funnel', {
      steps: [stepOneProps, stepTwoProps],
    });

    const computation = await this.client.perform(keenQuery);
    return computation.result[1];
  }
}

export default EntranceSignupsQuery;
