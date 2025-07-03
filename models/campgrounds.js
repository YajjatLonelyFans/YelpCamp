const mongoose = require('mongoose')
const reviews = require('./reviews');
const { coordinates } = require('@maptiler/client');
const Schema = mongoose.Schema

const ImageSchema = new Schema({
    url: String,
    filename: String
})
ImageSchema.virtual('thumbnail').get(function () {
    return this.url.replace('/upload', '/upload/w_200');
});

const CampgroundSchema = new Schema({
    title : String,
    image:[ImageSchema],
    price: Number,
    description : String,
    location : String,
    geometry : {
        type:{
            type: String,
            enum: ['Point'], // 'location.type' must be 'Point'
            required: true
        },
        coordinates:{
            type: [Number], // 'location.coordinates' must be an array of numbers
            required: true
        }
    },
    author:{
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    reviews : [
        {
            type: Schema.Types.ObjectId,
            ref: 'Review'
        }
    ],
})
CampgroundSchema.post('findOneAndDelete', async function (doc) {
    if (doc) {
        await reviews.deleteMany({
            _id: {
                $in: doc.reviews
            }
        })
    }
})
module.exports = mongoose.model('Campground' ,  CampgroundSchema )