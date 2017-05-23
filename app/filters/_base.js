export const operators = {
  equal: 'eq',
  notEqual: 'ne',
  contains: 'contains',
  doesNotContain: 'not_contains',
};

export class Filter {
  constructor() {
    this.filters = [];
  }

  _addFilter(propertyName, operator, propertyValue) {
    this.filters.push({
      property_name: propertyName,
      operator: operator,
      property_value: propertyValue,
    });
  }

  build() {
    return this.filters;
  }
}
