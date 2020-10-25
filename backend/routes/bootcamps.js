const express = require('express');
const {
  getBootcamps,
  getBootcamp,
  getBootcampsInRadius,
  createBootcamp,
  updateBootcamp,
  deleteBootcamp,
} = require('../controllers/bootcamps');

const router = express.Router();

router.route('/').get(getBootcamps).post(createBootcamp);
router.route('/radius/:zipcode/:distance').get(getBootcampsInRadius);
router
  .route('/:id')
  .get(getBootcamp)
  .put(updateBootcamp)
  .delete(deleteBootcamp);

module.exports = router;
