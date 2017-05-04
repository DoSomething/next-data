import Keen from 'keen-js';
import { Query } from './_base';
import SignupFilter from '../filters/SignupFilter';
import { pageHelper } from '../helpers';

class SignupQuery extends Query {
  constructor(client, options = { page: null }) {
    super(client, options);

    this.addFilter(new SignupFilter());
    pageHelper.call(this, options.page);
  }

  async perform() {
    const props = this.applyDefaults({ event_collection: 'action' });
    const keenQuery = new Keen.Query('count', props);
    const computation = await this.client.perform(keenQuery);

    return computation.result;
  }
}

export default SignupQuery;
