var gulp = require('gulp'),
    sass = require('gulp-sass'),
    browserSync = require('browser-sync').create();

// ------------------------
// Development Tasks
// ------------------------


// Start server with browser-sync
gulp.task('browserSync', function() {
  browserSync.init({
    server: {
      baseDir: 'app'
    },
  })
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
    }))
});

// Sass watcher
gulp.task('watch', ['browserSync', 'sass'], function() {
  gulp.watch('app/scss/**/*.scss', ['sass']);
});
