const express   = require('express'),
      router    = express.Router(),
      passport  = require('passport'),
      User      = require('../models/user.js')
;

//root route
router.get('/', (req, res) => {
    res.render('landing.ejs');
});
//about
router.get('/about', (req, res) => {
    res.render('about');
});

// ================================
// AUTH ROUTES
// ================================

//show register form
router.get('/register', (req, res) => {
    res.render('register');
});
//handle sign-up logic
//note: this passport.authenticate is the same thing being used below in "handle login", but here there is User.register work being done beforehand, and so then logging user in automatically (so, here no middleware needed to check login info)
router.post('/register', (req, res) => {
    let newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, (err, user) => { //.register is from passport-local-mongoose pkg
        if(err) {
            console.log(err);
            req.flash('error', err.message);
            return res.redirect('/register');
        }
        passport.authenticate('local')(req, res, () => {
            req.flash('success', 'Successfully registered. Welcome to Find Organic, ' + user.username + '!')
            res.redirect('/growers');
        });
    });
});

//show login form
router.get('/login', (req,res) => {
    res.render('login');
});

//handle login logic
router.post('/login', passport.authenticate('local', //passport.authenticate (here using 'local' strategy) will call the method from passport-local-mongoose pkg
    {
        successRedirect: '/growers',
        failureRedirect: '/login'
    }), (req,res) => {
    
});

//logout route
router.get('/logout', (req,res) => {
    req.logout();
    req.flash('success', 'You have logged out.');
    res.redirect('/growers');
});


module.exports = router;