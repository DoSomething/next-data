import PageFilter from './filters/PageFilter';

export const INCEPTION = new Date("2017-04-17T00:00:00.000Z")

export function makeCsvDownload(csv, title = 'data') {
  const a = document.createElement('a');
  a.href = `data:attachment/csv,${encodeURIComponent(csv)}`;
  a.target = '_blank';
  a.download = `${title}.csv`;

  document.body.appendChild(a);
  a.click();
}

export function pageHelper(page) {
  switch (page) {
    case 'community':
      this.addFilter(new PageFilter(PageFilter.ACTION, false));
      this.addFilter(new PageFilter(PageFilter.FAQ, false));
      this.addFilter(new PageFilter(PageFilter.SCHOLARSHIP, false));
      break;
    case 'action':
      this.addFilter(new PageFilter(PageFilter.ACTION));
      break;
    case 'scholarship':
      this.addFilter(new PageFilter(PageFilter.SCHOLARSHIP));
      break;
    case 'faq':
      this.addFilter(new PageFilter(PageFilter.FAQ));
      break;
  }
}
