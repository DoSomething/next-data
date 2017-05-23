import Keen from 'keen-js';
import { Query } from './_base';
import AffiliatedFilter from '../filters/AffiliatedFilter';
import AppInitFilter from '../filters/AppInitFilter';
import { calculateMedian, totalGreaterThan, totalEqualTo } from '../helpers';

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
      case '1x': return totalEqualTo(data, 1)
      case '2x': return totalEqualTo(data, 2);
      case '3x': return totalEqualTo(data, 3);
      case '4x+': return totalGreaterThan(data, 4);
      default: return result;
    }
  }
}

export default ReturnQuery;
