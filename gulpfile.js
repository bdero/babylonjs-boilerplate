var gulp = require('gulp'),
    fs = require('fs'),
    babel = require('gulp-babel'),
    livereload = require('gulp-livereload'),
    http = require('http'),
    st = require('st'),
    source = require('vinyl-source-stream'),
    buffer = require('vinyl-buffer'),
    rename = require('gulp-rename'),
    browserify = require('browserify'),
    download = require('gulp-download');

gulp.task('copylibs', function() {
  gulp.src('./node_modules/babylonjs/babylon.js')
    .pipe(gulp.dest('lib/'));
});

gulp.task('oimo', function() {
  // At the time of writing, Oimo.js doesn't have an official NPM or bower package, and the most official build source I can find is the build directory in the
  // build directory of it's GitHub repository.
  try {
    fs.accessSync('lib/oimo.min.js', fs.F_OK);
    // If the file is already accessible (doesn't error), do nothing
    console.log('Oimo.js already exists - skipping download.');
  } catch (e) {
    download('https://raw.githubusercontent.com/lo-th/Oimo.js/gh-pages/build/oimo.min.js')
      .pipe(gulp.dest('lib/'));
  }
});

gulp.task('browserify', ['es6', 'copylibs', 'oimo'], function() {
  var bundleStream = browserify({entries: 'main.js', debug: true, basedir: './build'}).bundle();

  return bundleStream
    .pipe(source('build/main.js'))
    .pipe(rename('bundle.js'))
    .pipe(gulp.dest('./'))
    .pipe(livereload());
});

gulp.task('es6', function() {
  return gulp.src("src/**/*.js")
    .pipe(babel())
    .pipe(gulp.dest("build"));
});


gulp.task('default', ['browserify'], function(done) {
  http.createServer(
    st({ index: 'index.html', cache: false, path: __dirname })
  ).listen(8080, done);
  console.log('Now listening: http://localhost:8080 ....');
  livereload.listen();
  gulp.watch('src/*', ['browserify']);
});
