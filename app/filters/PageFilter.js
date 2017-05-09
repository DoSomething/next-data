import { operators, Filter } from './_base';

class PageFilter extends Filter {
  constructor(page, didVisit = true) {
    super();

    this._addFilter(
      'page.path',
      didVisit ? operators.contains : operators.doesNotContain,
      page,
    );
  }
}

PageFilter.ACTION = '/action';
PageFilter.FAQ = '/pages/faq';
PageFilter.SCHOLARSHIP = '/pages/scholarship';

export default PageFilter;
