import Keen from 'keen-js';
import { Query } from './_base';
import AffiliatedFilter from '../filters/AffiliatedFilter';
import PageFilter from '../filters/PageFilter';

class VisitorQuery extends Query {
  constructor(client, options = { page: null, affiliated: false }) {
    super(client, options);

    this.addFilter(new AffiliatedFilter(options.affiliated));
    this.addFilter(new PageFilter(options.page));
  }

  async perform() {
    const props = this.applyDefaults({
      event_collection: 'action',
      target_property: 'user.session.id',
    });

    const keenQuery = new Keen.Query('count_unique', props);
    const computation = await this.client.perform(keenQuery);

    return computation.result;
  }
}

export default VisitorQuery;
