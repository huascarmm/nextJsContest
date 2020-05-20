

export default class Filter {
  constructor(f) {
    this.filter = (f !== null && typeof f !== 'function' ? f : {});
  }

  /**
   * Set `limit` type number
   * @param limit - Maximum number of records to be returned
   */
  limit(limit) {
    // assert_1.default(limit >= 1, `Limit ${limit} must a positive number`);
    this.filter.limit = limit;
    return this;
  }

  /**
   * Set `offset` type number
   * @param offset - Offset of the number of records to be returned
   */
  offset(offset) {
    this.filter.offset = offset;
    return this;
  }

  /**
   * Alias to `offset` number
   * @param skip
   */
  skip(skip) {
    return this.offset(skip);
  }

  /**
   * Describe array of properties
   * @example ['property_one', 'property_two']
   *
   * @param f - A field name to be included, an array of field names to be
   * included, or an Fields object for the inclusion/exclusion
   */
  fields(f) {
    if (!this.filter.fields) {
      this.filter.fields = [];
    }
    this.filter.fields = f;
    return this;
  }

  /**
   * Describe the sorting order
   * @example ['property_one <ASC|DESC>', 'property_two <ASC|DESC>']
   * @param o - A field name with optional direction, an array of field names,
   * or an Order object for the field/direction pairs
   */
  order(orders) {
    if (!this.filter.order) {
      this.filter.order = [];
    }
    this.filter.order = orders;
    return this;
  }

  /**
   * Declare `include` is
   * ``` javascript
   * [{
   *  relation: "model|relation",
   *  scope: {
   *    fields: [],
   *    where: {},
   *    order: [],
   *    limit: 0
   *  }
   * }]
   * ```
   * @param i - A relation name, an array of relation names, or an `Inclusion`
   * object for the relation/scope definitions
   */
  include(i) {
    if (this.filter.include == null) {
      this.filter.include = [];
    }
    this.filter.include = i;
    return this;
  }

  /**
   * Declare a where clause
   * where is
   * ``` javascript
   * {
   *  fields: [],
   *  where: {},
   *  order: [],
   *  limit: 0
   * }
   * ```
   * @param w - Where object
   */
  where(w) {
    this.filter.where = w;
    return this;
  }

  /**
   * Return the filter object
   */
  build() {
    return this.filter;
  }
}
