const advancedResult = (model, populate) => async (req, res, next) => {
  // Create operators ($gt, $gte, etc)
  const queryStr = JSON.stringify(req.query).replace(
    /\b(gt|gte|lt|lte|in)\b/g,
    (match) => `$${match}`
  );
  const reqQuery = JSON.parse(queryStr);

  // Select fields
  const selectedFields = reqQuery.select
    ? reqQuery.select.split(',').join(' ')
    : undefined;
  delete reqQuery.select;

  // Sort
  const sortedFields = reqQuery.sort
    ? reqQuery.sort.split(',').join(' ')
    : '-createdAt';
  delete reqQuery.sort;

  // Pagenation
  const page = reqQuery.page ? Number(reqQuery.page) : 1;
  delete reqQuery.page;
  const limit = reqQuery.limit ? Number(reqQuery.limit) : 10;
  delete reqQuery.limit;
  const total = await model.countDocuments();
  const pagenation = {};
  if (page > 1) {
    pagenation.prev = {
      page: page - 1,
      limit,
    };
  }
  if (limit * page < total) {
    pagenation.next = {
      page: page + 1,
      limit,
    };
  }

  let query = model
    .find(reqQuery)
    .select(selectedFields)
    .sort(sortedFields)
    .skip((page - 1) * limit)
    .limit(limit);

  if (populate) {
    query = query.populate(populate);
  }

  const results = await query;

  res.advancedResults = {
    success: true,
    count: results.length,
    pagenation,
    data: results,
  };

  next();
};

module.exports = advancedResult;
