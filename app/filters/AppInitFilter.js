import { operators, Filter } from './_base';

class AffiliatedFilter extends Filter {
  constructor() {
    super();

    this._addFilter(
      'action.type',
      operators.equal,
      'APPLICATION_INIT'
    );
  }
}

export default AffiliatedFilter;
