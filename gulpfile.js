var gulp = require('gulp'),
    sass = require('gulp-sass'),
    browserSync = require('browser-sync').create(),
    userref = require('gulp-useref'),
    uglify = require('gulp-uglify'),
    gulpIf = require('gulp-if'),
    gutil = require('gulp-util'),
    cssnano = require('gulp-cssnano'),
    imagemin = require('gulp-imagemin'),
    cache = require('gulp-cache'),
    del = require('del'),
    runSequence = require('run-sequence');


// ------------------------
// Development Tasks
// ------------------------

// Start web server with browser-sync
gulp.task('browserSync', function() {
  browserSync.init({
    server: {
      baseDir: 'app'
    },
  });
});

// Sass task
gulp.task('sass', function() {
  // Grab all files ending in .scss in app/scss directory and sub-dirs
  return gulp.src('app/scss/**/*.scss')
    .pipe(sass())
    // Move converted files to app/css
    .pipe(gulp.dest('app/css'))
    // browserSyn injects new CSS when sass task runs
    .pipe(browserSync.reload({
      stream: true
    }));
});

// Watcher, after browserSync and sass task are run then watcher will run
gulp.task('watch', ['browserSync', 'sass'], function() {
  // Reload browser when any SCSS, HTML or JS files are saved
  gulp.watch('app/scss/**/*.scss', ['sass']);
  gulp.watch('app/*.html', browserSync.reload);
  gulp.watch('app/js/**/*.js', browserSync.reload);
});


// ------------------------
// Optimization Tasks
// ------------------------

// Optimizes mulptiple CSS and JS files in HTML doc
gulp.task('useref', function() {
  return gulp.src('app/*.html')
    .pipe(userref())
    // Minifies JS files with uglify
    .pipe(gulpIf('*.js', uglify()).on('error', function(err) {
gutil.log(gutil.colors.red('[Error]'), err.toString());
this.emit('end');
}))
    // Minifies CSS with cssnano
    .pipe(gulpIf('*.css', cssnano()))
    .pipe(gulp.dest('dist'));
});

// Image Optimization with gulp-imagemin
gulp.task('images', function() {
  return gulp.src('app/images/**/*.+(png|jpg|gif|svg)')
    // Cache any images that have already been comporessed
    .pipe(cache(imagemin()))
    .pipe(gulp.dest('dist/images'));
});

// Copy fonts over to dist directory
gulp.task('fonts', function() {
  return gulp.src('app/fonts/**/*')
    .pipe(gulp.dest('dist/fonts'));
});

// Cleaning up the dist directory
gulp.task('clean:dist', function() {
  return del.sync('dist')
});



// ------------------------
// Build Sequences
// ------------------------

// Grouped tasks, 'default' allows script to run by just using command 'gulp'
gulp.task('default', function(callback) {
  runSequence(['sass', 'browserSync', 'watch'],
    callback
  )
});


// runSequence here ensures 'clean' is run first before all others
gulp.task('build', function(callback) {
  runSequence(
    'clean:dist',
    'sass',
    ['useref', 'images', 'fonts'],
    callback
  )
});
