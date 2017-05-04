import { INCEPTION } from '../helpers';

export class Query {
  constructor(client, options) {
    this.client = client;
    this.options = options;

    this._id = Math.round(Math.random() * Date.now());
    this.filters = [];
    this.timeframe = {};

    this.setTimeframe({ start: INCEPTION, end: new Date() });
  }

  async perform() {
    console.warn('perform function is blank');
    return null;
  }

  setTimeframe(timeframe) {
    this.timeframe = {
      start: timeframe.start.toUTCString(),
      end: timeframe.end.toUTCString(),
    };
  }

  addFilter(filter) {
    this.filters = [...this.filters, ...filter.build()];
  }

  applyDefaults(keenProps) {
    const props = { ...keenProps };
    const keys = ['timeframe', 'filters'];

    for (const key of keys) {
      props[key] = this[key];
    }

    return props;
  }
}
