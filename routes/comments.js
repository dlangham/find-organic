const express   = require('express'),
      router    =  express.Router({mergeParams: true}), //`mergParams: true` options will merge the params from Grower and Comments together.. this is a fix for using the path-shortenting append trick in app.js
      Grower = require('../models/grower'),
      Comment   = require('../models/comment'),
      middleware = require('../middleware')

// ===============================
// COMMENTS ROUTES
// ===============================

//NEW COMMENT
router.get('/new', middleware.isLoggedIn, (req,res) => {
    Grower.findById(req.params.id, (err, foundGrower) => {
        if(err) {
            console.log(err);
        } else {
            res.render('comments/new.ejs', {grower:foundGrower});
        }
    });
});

//CREATE COMMENT
router.post('/', middleware.isLoggedIn, (req,res) => {
    Grower.findById(req.params.id, (err, grower) => {
        if(err) {
            console.log(err);
            res.redirect('/growers' + grower._id);
        } else {
            console.log(req.body.comment);
            // Comment.create({text: req.body.comment.text, author: req.body.comment.author}, (err, newComment) => {
            Comment.create(req.body.comment, (err, newComment) => {
                if(err) {
                    console.log(err);
                } else {
                    //add username and id to comment, then save comment
                    newComment.author.id = req.user._id;
                    newComment.author.username = req.user.username;
                    newComment.save();
                    //push comment onto grower, then save grower
                    grower.comments.push(newComment);
                    grower.save();
                    req.flash('success', 'Your comment has been added!');
                    res.redirect('/growers/' + grower._id);
                }
            });
        }
    });
});

//EDIT ROUTE
router.get('/:commentid/edit', middleware.checkCommentOwnership, (req,res) => {
    Comment.findById(req.params.commentid, (err, foundComment) => {
        if(err) {
            console.log(err);
            res.render('back');
        } else {
            Grower.findById(req.params.id, (err, foundGrower) => {
                if(err) {
                    console.log(err);
                    res.render('back');
                } else {
                    res.render('comments/edit', {comment: foundComment, grower: foundGrower});
                }
            });
        }
    });
});

//UPDATE ROUTE
router.put('/:commentid', middleware.checkCommentOwnership, (req,res) => {
    Comment.findByIdAndUpdate(req.params.commentid, req.body.comment, (err, foundComment) => {
        if(err) {
            console.log(err);
            res.redirect('/growers/' + req.params.id);
        } else {
            res.redirect('/growers/' + req.params.id);
        }
    });
});

//DESTROY ROUTE
router.delete('/:commentid', middleware.checkCommentOwnership, (req,res) => {
    Comment.findByIdAndRemove(req.params.commentid, (err) => {
        if(err) {
            res.redirect('back');
        } else {
            req.flash('success', 'Comment deleted!');
            res.redirect('/growers/' + req.params.id);
        }
    });
});


module.exports = router;