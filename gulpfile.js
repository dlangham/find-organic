const gulp =        require('gulp'),
      sass =        require('gulp-sass'),
      sourcemaps =  require('gulp-sourcemaps'),
      browserSync = require('browser-sync').create(),
      reload =      browserSync.reload;
 
// Compile sass, map source, then reload  [[[[[[[[[[[[[[[[]]]]]]]]]]]]]]]]
gulp.task('sass', function() {
    gulp.src('./public/styles/scss/style.scss')
        .pipe(sourcemaps.init())
        .pipe(sass())
        .on('error', function (err) {
            console.log(err.toString());

            this.emit('end');
        })
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('./public/styles'))
        .pipe(reload({
            stream: true
        }))
});

// Browsersync any file changes [[[[[[[[[[[[[[[[[[[[]]]]]]]]]]]]]]]]]]]]
gulp.task('sync', function () {
 
    // Serve files from the root of this project
    browserSync.init({
        // server: { baseDir: "/" },
        proxy: 'localhost:3000', // use with Vagrant vm
        // proxy: 'localhost:5500/public', // use with Live Server extension
        notify: false // removes the "Browsersync: connected" browser notification
    });
    
    // Watchers
    gulp.watch('./views/**/*.ejs', reload);
    gulp.watch('./public/**/*.+(html|js|php)', reload);
    gulp.watch('./public/styles/scss/*.scss', ['sass']);

});

// Use `gulp` in command line   [[[[[[[[[[[[[[[[[[[[]]]]]]]]]]]]]]]]]]]]
gulp.task('default', ['sass', 'sync']);