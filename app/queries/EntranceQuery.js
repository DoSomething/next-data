import Keen from 'keen-js';
import { Query } from './_base';
import AffiliatedFilter from '../filters/AffiliatedFilter';
import AppInitFilter from '../filters/AppInitFilter';
import PageFilter from '../filters/PageFilter';

class EntranceQuery extends Query {
  constructor(client, options = { page: null }) {
    super(client, options);

    this.addFilter(new AppInitFilter());
    this.addFilter(new AffiliatedFilter(false));
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

export default EntranceQuery;
