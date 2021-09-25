var router = require('express').Router();

const reviewsCtrl = require('../controllers/reviews')

router.get('/post',reviewsCtrl.newReviews)

router.get('/home',reviewsCtrl.home)

// router.get('/',reviewsCtrl.deleteReviews)

// router.get('/',reviewsCtrl.commentReviews)

router.get('/',isLoggedIn,reviewsCtrl.displayAllReviews)

router.post('/newPost',reviewsCtrl.postWrite)

router.post('/addComment/:id', isLoggedIn, reviewsCtrl.addComment)

router.post('/', reviewsCtrl.reviewcreate)

router.post('/search', reviewsCtrl.reviewSearch)

router.delete('/delete/:deleteReviewIdNumber',reviewsCtrl.removeReview)

// router.delete('/delete/:deleteCommentIdNumber',reviewsCtrl.deleteComment);

function isLoggedIn(req, res, next) {
    if ( req.isAuthenticated() ) return next();
    res.redirect('/auth/google');
  }

module.exports = router;
