const express    = require('express'),
      router     = express.Router(),
      Grower     = require('../models/grower'),
      middleware = require('../middleware')

// ===============================
// GROWERS ROUTES (REST)
// ===============================

//INDEX - display list of all growers
router.get('/', (req,res) => {

    //get all growers from DB
    Grower.find({}, (err, allGrowers) => {
        if(err) {
            console.log(err);
        } else {
            res.render('growers/index.ejs', {growers:allGrowers});
        }
    })
});

// NEW  - display form to make new grower
router.get('/new', middleware.isLoggedIn, (req,res) => {
    res.render('growers/new.ejs');
});

// CREATE - post; add new grower to DB
router.post('/', middleware.isLoggedIn, (req,res) => {
    console.log(req.body);
    let newName = req.body.newname;
    let newPhoto = req.body.newphoto;
    let newDescription = req.body.newdescription;
    let author = {
        id: req.user._id,
        username: req.user.username
    };
    let newGrower = {name: newName, image: newPhoto, description: newDescription, author: author};

    //create new grower and save to DB
    Grower.create(newGrower, (err, newlyCreated) => {
        if(err) {
            console.log(err);
        } else {
            console.log(newlyCreated);
            req.flash('success', 'You\'ve successfully added a grower!');
            res.redirect('/growers');
        }
    });
});

// SHOW  - display info/profile about a grower
router.get('/:id', (req,res) => {

    //find the grower with provided ID
    Grower.findById(req.params.id).populate('comments').exec((err, foundGrower) => {
        if(err) {
            console.log(err);
        } else {
            //render show template for the found grower
            res.render('growers/show.ejs', {grower: foundGrower});
        }
    });
});

// EDIT GROWER ROUTE (edit form)
router.get('/:id/edit', middleware.checkGrowerOwnership, (req,res) => {
    Grower.findById(req.params.id, (err, foundGrower) => {
        if(err) {
            console.log(err);
            req.flash('error', 'You don\'t have permission to do that.');
            res.redirect('back');
        } else {
            res.render('growers/edit.ejs', {grower: foundGrower});
        }
    });
});

// UPDATE GROWER ROUTE (update route)
router.put('/:id', middleware.checkGrowerOwnership, (req,res) => {
    Grower.findByIdAndUpdate(req.params.id, req.body.theGrower, (err, growerToUpdate) => {
        if(err) {
            console.log(err);
            res.redirect('/growers');
        } else {
            res.redirect('/growers/' + req.params.id);
        }
    });
});

// DESTROY route
router.delete('/:id', middleware.checkGrowerOwnership, (req,res) => {
    Grower.findByIdAndRemove(req.params.id, (err) => {
        if(err) {
            console.log(err);
            res.redirect('/growers');
        } else {
            res.redirect('/growers');
        }
    });
});


module.exports = router;