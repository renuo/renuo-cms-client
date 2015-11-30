var gulp = require('gulp');
var gutil = require('gulp-util');
var sourcemaps = require('gulp-sourcemaps');
var ts = require('gulp-typescript');
var babel = require('gulp-babel');
var del = require('del');
var tslint = require('gulp-tslint');
var connect = require('gulp-connect');
var uglify = require('gulp-uglify');

var tsProject = ts.createProject('tsconfig.json');

// TODO: setup uglyfier
// TODO: setup jasmine
// TODO: setup protractor

var run_if = function (env, truthy, falsy) {
  if (!falsy) falsy = gutil.noop();
  return gutil.env.type === env ? truthy : falsy;
};

gulp.task('tslint', function () {
  return gulp.src('src/**/*.ts')
    .pipe(tslint())
    .pipe(tslint.report('prose'));
});

gulp.task('clean', function (callback) {
  return del('.tmp/*', callback);
});

gulp.task('copyhtml', function () {
  return gulp.src('demo/**/*.html')
    .pipe(gulp.dest('.tmp'))
    .pipe(connect.reload());
});

gulp.task('serve', ['clean', 'copyhtml', 'tslint', 'tscompile', 'watch'], function (callback) {
  connect.server({
    root: ['.tmp', './bower_components'],
    livereload: true,
    host: 'renuo-cms-client.dev'
  });
  callback();
});

gulp.task('ts-single-compile', function () {
  return gulp.src('src/app/main.ts')
    .pipe(sourcemaps.init())
    .pipe(ts(tsProject))
    .pipe(babel({presets: ['es2015']}))
    .pipe(sourcemaps.write('.'))
    .pipe(run_if('production', uglify()))
    .pipe(gulp.dest('.tmp'))
    .pipe(connect.reload());
});

gulp.task('watch', function () {
  gulp.watch('src/**/*.ts', ['tslint', 'tscompile']);
  gulp.watch('demo/**/*.html', ['copyhtml']);
});

gulp.task('tscompile', ['tslint', 'ts-single-compile']);
gulp.task('default', ['tslint', 'tscompile']);
