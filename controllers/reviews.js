const Review = require('../models/review');

function newReviews(req, res) {
    res.render('reviews/newPost');
}

function home(req, res) {
    res.render('reviews/home');
}

function deleteReviews(req, res) {
    res.render('reviews/newPost');
}

function commentReviews(req, res) {
    res.render('reviews/newPost');
}

function getAll(req, res){
    Review.find(function(err, reviews) {
        res.render('reviews/home', { reviews })
    })  
}

function reviewcreate(req, res) {
    const review = new Review(req.body);
    review.save(function(err) {
      if (err) return res.render('error', {message: 'something went wrong :(', error: err});
      console.log(review);
      res.redirect('/review');
    }); 

}

function postWrite(req, res) {
    console.log(req.body)
    const newPost = new Review ({
        name:req.body.name,
        location: req.body.location,
        rate:req.body.rate,
        description: req.body.description,
        comment:[]
    })
    newPost.save().then(()=> console.log(newPost))
    // Review.find({}, function (err, docs) {
    //     console.log(docs)
    //     res.render('reviews', {posts: docs})
    // })  
    res.redirect('/reviews')
}

function displayAllReviews(req, res){
    Review.find({}, function (err, docs) {
        console.log(docs)
        res.render('reviews', {posts: docs})
    })  
}


async function addComment(req, res, next) {
    let review = await Review.findById(req.params.id)
    review.comment.push({
        user:req.user.name,
        comment:req.body.comment
    });
    await review.save();
    console.log(review.comment)
    console.log(review)
    res.redirect('/reviews');
}  


async function removeReview(req, res) {
    let cancelReview =  await Review.deleteOne({
        _id: req.params.deleteReviewIdNumber
    });
    res.redirect('/reviews');
}


function reviewSearch(req, res) {
    if(req.body.search == null){
        res.redirect('/reveiws/home')
    }
    let reviewQuery = req.query.name ? {name: new RegExp(req.query.name, 'i')} : {};
    Review.findOne({"name":req.body.search},function(err, reviews) {
        console.log(reviews)
      res.render('reviews/search',{posts:reviews})
    });
  }


module.exports = {
    getAll,                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           
    postWrite,
    displayAllReviews,
    reviewcreate,
    deleteReviews,
    addComment,
    commentReviews,
    newReviews,
    home,
    reviewSearch,
    removeReview
}