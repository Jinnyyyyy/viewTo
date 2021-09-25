const mongoose = require('mongoose');
const { commentReviews } = require('../controllers/reviews');
const Schema = mongoose.Schema;

const commentSchema = new Schema({
    user: {
        type: String
    },
    comment: {
        type: String
    }
})

const reviewSchema = new Schema({
    name: {
        type:String
    },

    location: {
        type:String
    },    

    description: {
        type:String
    },

    rate: {
        type:Number
    },
    comment:[commentSchema]
});



module.exports = mongoose.model('Review', reviewSchema);