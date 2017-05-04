import { operators, Filter } from './_base';

class AffiliatedFilter extends Filter {
  constructor(affiliated = true) {
    super();

    this._addFilter(
      'signups.thisCampaign',
      operators.equal,
      affiliated
    );
  }
}

export default AffiliatedFilter;
