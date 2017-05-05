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

/**
 * Modified from https://gist.github.com/caseyjustus/1166258#gistcomment-230983
 */
export function calculateMedian(values) {
  values.sort((a,b) => a - b);
  const half = Math.floor(values.length / 2);

  if (values.length % 2) return values[half];
  else return (values[half-1] + values[half]) / 2;
}

export function totalGreaterThan(values, max) {
  return values.reduce((acc, item) => {
    if (item >= max) acc++;
    return acc;
  }, 0);
}
