import Keen from 'keen-js';
import { Query } from './_base';
import AffiliatedFilter from '../filters/AffiliatedFilter';
import AppInitFilter from '../filters/AppInitFilter';
import { calculateMedian, totalGreaterThan } from '../helpers';

class ReturnQuery extends Query {
  constructor(client, options = { question: 'median' }) {
    super(client, options);

    this.addFilter(new AffiliatedFilter());
    this.addFilter(new AppInitFilter());
  }

  async perform() {
    const props = this.applyDefaults({
      event_collection: 'action',
      group_by: 'user.id',
    });

    const keenQuery = new Keen.Query('count', props);
    const data = (await this.client.perform(keenQuery)).result.map(item => item.result);
    let result = 0;

    switch (this.options.question) {
      case 'median': return calculateMedian(data);
      case '1x': return data.length;
      case '2x': return totalGreaterThan(data, 2);
      case '3x': return totalGreaterThan(data, 3);
      default: return result;
    }
  }
}

export default ReturnQuery;
