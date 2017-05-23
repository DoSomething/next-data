import { operators, Filter } from './_base';

class PageFilter extends Filter {
  constructor(page, didVisit = true) {
    super();

    if (page) {
      const variants = page.split(',');

      for (const variant of variants) {
        this._addFilter(
          'routing.page',
          didVisit ? operators.equal : operators.notEqual,
          variant,
        );
      }
    }
  }
}

export default PageFilter;
