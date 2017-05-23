import { operators, Filter } from './_base';

class PageFilter extends Filter {
  constructor(page, didVisit = true) {
    super();

    if (page) {
      this._addFilter(
        'routing.page',
        didVisit ? operators.contains : operators.doesNotContain,
        page,
      );
    }
  }
}

export default PageFilter;
