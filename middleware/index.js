const Grower    = require('../models/grower'),
      Comment       = require('../models/comment')

// all middleware goes here

const middleware = {};

middleware.checkGrowerOwnership = function(req,res,next) {
    if(req.isAuthenticated()) {
        Grower.findById(req.params.id, (err, foundGrower) => {
            if(err) {
                console.log(err);
                res.redirect('back');
            } else {
                // does user own the grower?
                // note: foundGrower.author.id LOOKS the same as req.user._id, but `req.user._id` is a String and `...author.id` is a Mongoose Object; so must use Mongoose method `.equals` to normalize them
                if(foundGrower.author.id.equals(req.user._id)) {
                    next();
                } else {
                    req.flash('error', 'You don\'t have permission to do that.');
                    res.redirect('back');
                }
            }
        });
    } else {
        req.flash('error', 'You need to be logged in to do that.');
        res.redirect('back');
    }
}

middleware.checkCommentOwnership = function(req,res,next) {
    if(req.isAuthenticated()) {
        Comment.findById(req.params.commentid, (err, foundComment) => {
            if(err) {
                console.log(err);
                res.redirect('back');
            } else {
                // does user own the comment?
                // note: can't do equality check (== or ===) because foundComment.author.id LOOKS the same as req.user._id, but actually `req.user._id` is a String and `...author.id` is a Mongoose Object; so must use Mongoose method `.equals` to normalize them
                if(foundComment.author.id.equals(req.user._id)) {
                    next();
                } else {
                    req.flash('error', 'You don\'t have permission to do that.');
                    res.redirect('back');
                }
            }
        });
    } else {
        req.flash('error', 'You need to be logged in to do that.');
        res.redirect('back');
    }
}

middleware.isLoggedIn = function(req, res, next) {
    if(req.isAuthenticated()) {
        return next();
    }
    req.flash('error', 'You need to be logged in to do that.');
    res.redirect('/login');
}

module.exports = middleware;