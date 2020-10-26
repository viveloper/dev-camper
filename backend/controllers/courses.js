const Course = require('../models/Course');
const ErrorResponse = require('../utils/ErrorResponse');
const asyncHandler = require('../middleware/asyncHandler');

// @desc    Get all courses
// @route   GET /api/v1/courses
// @route   GET /api/v1/bootcamps/:bootcampId/courses
// @access  Public
exports.getCourses = asyncHandler(async (req, res, next) => {
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
  const total = await Course.countDocuments();
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

  if (req.params.bootcampId) {
    reqQuery.bootcamp = req.params.bootcampId;
  }

  const courses = await Course.find(reqQuery)
    .select(selectedFields)
    .sort(sortedFields)
    .skip((page - 1) * limit)
    .limit(limit)
    .populate({
      path: 'bootcamp',
      select: 'name description',
    });

  res.status(200).json({
    success: true,
    count: courses.length,
    pagenation,
    data: courses,
  });
});
