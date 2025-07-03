const express = require('express');
const router = express.Router({ mergeParams: true }); 
const Campground = require('../models/campgrounds');
const catchAsync = require('../utils/catchAsync');
const ExpressError = require("../utils/ExpressError");
const Review = require('../models/reviews'); 
const { isloggedIn } = require('../middleware');
const { isReviewAuthor } = require('../middleware');
const reviews = require('../controllers/reviews');


router.post("/",isloggedIn, catchAsync(reviews.createReview));
router.delete("/:reviewId", isloggedIn, catchAsync(reviews.deleteReview));

module.exports = router;
