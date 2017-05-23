import { operators, Filter } from './_base';

class PageFilter extends Filter {
  constructor(page, didVisit = true) {
    super();

    if (page) {
      this._addFilter(
        'routing.page',
        didVisit ? operators.equal : operators.notEqual,
        page,
      );
    }
  }
}

export default PageFilter;
