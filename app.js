const express           = require('express'),
      app               = express(),
      mongoose          = require('mongoose'),
      flash             = require('connect-flash'),
      passport          = require('passport'),
      LocalStrategy     = require('passport-local'),
      methodOverride    = require('method-override'),
      User              = require('./models/user'),
      Grower            = require('./models/grower'),
      Comment           = require('./models/comment')
;

// set environment: development or production?
const environment = 'development'
// const environment = 'production'
;
      
// routes files
const commentsRoutes    = require('./routes/comments'),
      growersRoutes     = require('./routes/growers'),
      indexRoutes       = require('./routes/index')
;

// CONFIG
const env   = process.env.NODE_ENV || environment,
      conn  = require('./conn')[env],
      url   = `mongodb+srv://${conn.db.user}:${conn.db.pass}@${conn.db.host}/${conn.db.name}?retryWrites=true` || 'www.google.com';
      
mongoose.connect(url, { useNewUrlParser: true , useFindAndModify: false, useCreateIndex: true });

app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded({extended: true}));
app.use(methodOverride('_method'));
app.use(flash());

// PASSPORT CONFIG
app.use(require('express-session')({
    secret: 'Organics are the seed of healthy life',
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// our own little middleware, called for every route:
app.use((req,res,next) => {
    res.locals.currentUser = req.user;
    res.locals.messageSuccess = req.flash('success');
    res.locals.messageError = req.flash('error');
    next();
});

// SEED THE DATABASE (clears all entries before seeding)
require('./seeds')();

// ================================
// ROUTES
// ======

app.use(indexRoutes);
app.use('/growers', growersRoutes);
app.use('/growers/:id/comments', commentsRoutes);

// ================================

app.get('/*', (req,res) => {
    res.send('404 page not found :(');
});

app.listen(conn.server.port, conn.server.host, () => {
    console.log('env: ' + app.get('env'));
    console.log('find-organics server + db are UP');
});