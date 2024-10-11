class ApiFeatures {
  constructor(mongooseQuery, queryStr) {
    this.mongooseQuery = mongooseQuery;
    this.queryStr = queryStr;
  }

  filter() {
    // eslint-disable-next-line node/no-unsupported-features/es-syntax
    const queryObject = { ...this.queryStr };
    const excludeFields = ["page", "sort", "limit", "fields", "keyword"];
    excludeFields.forEach((field) => delete queryObject[field]);

    // advance filtering query
    let queryStr = JSON.stringify(queryObject);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);

    this.mongooseQuery = this.mongooseQuery.find(JSON.parse(queryStr));

    return this;
  }

  sort() {
    if (this.queryStr.sort) {
      const sortBy = this.queryStr.sort.split(",").join(" ");
      this.mongooseQuery = this.mongooseQuery.sort(sortBy);
    } else {
      this.mongooseQuery = this.mongooseQuery.sort("-createdAt");
    }

    return this;
  }

  limitFields() {
    if (this.queryStr.fields) {
      const Fields = this.queryStr.fields.split(",").join(" ");
      this.mongooseQuery = this.mongooseQuery.select(Fields);
    } else {
      this.mongooseQuery = this.mongooseQuery.select("-__v");
    }

    return this;
  }

  search() {
    if (this.queryStr.keyword) {
      const keywordQuery = {
        $or: [
          { name: { $regex: this.queryStr.keyword, $options: "i" } },
          { description: { $regex: this.queryStr.keyword, $options: "i" } },
        ],
      };

      this.mongooseQuery = this.mongooseQuery.find(keywordQuery);
    }

    return this;
  }

  paginate(countDocuments) {
    const page = this.queryStr.page * 1 || 1;
    const limit = this.queryStr.limit * 1 || 10;
    const skip = (page - 1) * limit;

    const pagination = {};

    pagination.currentPage = page;
    pagination.limit = limit;
    pagination.totalPages = Math.ceil(countDocuments / limit);

    this.mongooseQuery = this.mongooseQuery.skip(skip).limit(limit);

    this.pagination = pagination;

    return this;
  }
}

export default ApiFeatures;
