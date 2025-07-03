const express = require('express');
const router = express.Router();
const Campground = require('../models/campgrounds');
const catchAsync = require('../utils/catchAsync');
const ExpressError = require("../utils/ExpressError");
const Review = require('../models/reviews');
const campgrounds = require('../controllers/camgrounds');
const Joi = require("joi");
const { isloggedIn } = require('../middleware');
const multer = require('multer');
const { storage } = require('../cloudinary');
const upload = multer({ storage });



const validateCamprground = (req,res,next)=>{
     const campgroundSchema = Joi.object({
        campground:Joi.object({
            title:Joi.string().required(),
            price: Joi.number().required().min(0),
            location:Joi.string().required(),
            description:Joi.string().required()
        }).required()

    })
    const {error} = campgroundSchema.validate(req.body);
    if(error){
        const msg = error.details.map(el=>el.message).join(',');
        throw new ExpressError(msg , 400)
    }else{
        next()
    }
}

router.get('/' , catchAsync(campgrounds.index));
router.get('/new' ,isloggedIn,campgrounds.newCampground);
router.post('/' , isloggedIn, upload.array("image"), validateCamprground,  catchAsync(campgrounds.createCampground));
router.get("/:id" , catchAsync(campgrounds.showCampground));
router.get("/:id/edit" ,isloggedIn, catchAsync(campgrounds.editCampground));
router.put("/:id", isloggedIn, upload.array("image"), validateCamprground, catchAsync(campgrounds.updateCampground));
router.delete('/:id', isloggedIn, catchAsync(campgrounds.deleteCampground));


module.exports = router;