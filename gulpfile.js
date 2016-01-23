var gulp = require('gulp');
var jade = require('gulp-jade');
var stylus = require('gulp-stylus');
var connect = require('gulp-connect');
var concatCss = require('gulp-concat-css');
var bower = require('gulp-bower');
var open = require('gulp-open');

gulp.task('connect', ['styles', 'scripts', 'views'], function() {
  connect.server({
    root: 'dist',
    port: 4444,
    livereload: true,
  });
  var options = {
    url: 'http://localhost:4444',
    client: 'google chrome'
  };
  gulp.src('./dist/index.html')
    .pipe(open('', options));
});

gulp.task('views', function() {
  gulp
    .src('./app/**/*.jade')
    .pipe(jade())
    .pipe(gulp.dest('./dist/'))
    .pipe(connect.reload());
});

gulp.task('scripts', function() {
  gulp
    .src('./app/**/*.js')
    .pipe(gulp.dest('./dist/'))
    .pipe(connect.reload());
});

gulp.task('styles', function() {
  gulp
    .src('./app/**/*.styl')
    .pipe(stylus())
    .pipe(concatCss('main.css'))
    .pipe(gulp.dest('./dist/'))
    .pipe(connect.reload());
});

gulp.task('bower', function() {
  return bower();
});

gulp.task('default', ['connect'], function() {
  gulp.watch('./app/**/*.styl', ['styles']);
  gulp.watch('./app/**/*.js', ['scripts']);
  gulp.watch('./app/**/*.jade', ['views']);
});
