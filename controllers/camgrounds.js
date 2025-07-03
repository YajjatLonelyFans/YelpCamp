const Campground = require('../models/campgrounds');
const maptiler = require('@maptiler/client');
maptiler.config.apiKey = process.env.MAPTILER_API_KEY;

module.exports.index = async (req , res)=>{
    const campgrounds = await Campground.find({});
    res.render('campground/index' , {campgrounds , maptilerKey: process.env.MAPTILER_API_KEY});
}
module.exports.newCampground = (req,res)=>{
    res.render('campground/new')
}

module.exports.createCampground = async (req, res) => {
    try {
        const geoData = await maptiler.geocoding.forward(req.body.campground.location, { limit: 1 });

        if (!geoData || !geoData.features || geoData.features.length === 0) {
            req.flash('error', 'Invalid location. Please enter a valid place.');
            return res.redirect('/campgrounds/new');
        }

        const camp = new Campground(req.body.campground);
        camp.geometry = geoData.features[0].geometry;
        console.log(camp.geometry);
        camp.image = req.files.map(f => ({ url: f.path, filename: f.filename }));
        camp.author = req.user._id;

        await camp.save();

        console.log(camp);
        req.flash('success', 'Successfully made a new campground!');
        res.redirect(`/campgrounds/${camp._id}`);
    } catch (err) {
        console.error("Error creating campground:", err);
        req.flash('error', 'Something went wrong while creating the campground.');
        res.redirect('/campgrounds/new');
    }
};

module.exports.showCampground = async (req , res)=>{
    const {id} = req.params
    const campground = await Campground.findById(id).populate({path:'reviews', populate:{path:"author"}}).populate('author');

    if(!campground){
        req.flash('error', 'Cannot find that campground!');
        return res.redirect('/campgrounds');
    }
   
    res.render('campground/show', { campground, maptilerKey: process.env.MAPTILER_API_KEY });

}

module.exports.editCampground = async (req , res)=>{
    const {id} = req.params
    const campground = await Campground.findById(id)
     if(!campground){
        req.flash('error', 'Cannot find that campground!');
        return res.redirect('/campgrounds');
    }
    if (!campground.author.equals(req.user._id)) {
        req.flash('error', 'You do not have permission to Edit this campground!');
        return res.redirect(`/campgrounds/${id}`);
    }
    res.render('campground/edit' , {campground})
}

module.exports.updateCampground = async (req, res) => {
    const { id } = req.params;
    const campground = await Campground.findById(id);
    campground.image.push(...req.files.map(f => ({ url: f.path, filename: f.filename })));
    await campground.save();
    if (!campground.author.equals(req.user._id)) {
        req.flash('error', 'You do not have permission to Edit this campground!');
        return res.redirect(`/campgrounds/${id}`);
    }
    const camp = await Campground.findByIdAndUpdate(id, { ...req.body.campground });
    req.flash('success', 'Successfully updated campground!');
    res.redirect(`/campgrounds/${campground._id}`);
}

module.exports.deleteCampground = async (req, res) => {
    const { id } = req.params;
    const campground = await Campground.findById(id);
    
    if (!campground) {
        req.flash('error', 'Campground not found!');
        return res.redirect('/campgrounds');
    }

    if (!campground.author.equals(req.user._id)) {
        req.flash('error', 'You do not have permission to delete this campground!');
        return res.redirect(`/campgrounds/${id}`);
    }

    await Campground.findByIdAndDelete(id);
    req.flash('success', 'Successfully deleted campground!');
    res.redirect('/campgrounds');
}