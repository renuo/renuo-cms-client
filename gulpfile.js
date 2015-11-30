var gulp = require('gulp');
var gutil = require('gulp-util');
var sourcemaps = require('gulp-sourcemaps');
var ts = require('gulp-typescript');
var babel = require('gulp-babel');
var del = require('del');
var tslint = require('gulp-tslint');
var connect = require('gulp-connect');
var uglify = require('gulp-uglify');
var karma = require('karma');
var open = require('open');

var tsProject = ts.createProject('tsconfig.json');
var tsSpecsProject = ts.createProject('tsconfig_specs.json');

// TODO: setup uglyfier
// TODO: setup jasmine
// TODO: setup protractor

var run_if = function (env, truthy, falsy) {
  if (!falsy) falsy = gutil.noop();
  return gutil.env.type === env ? truthy : falsy;
};


gulp.task('test', function (done) {
  new karma.Server({
    configFile: __dirname + '/karma.conf.coffee',
    singleRun: true
  }, done).start();
});

gulp.task('tdd', function (done) {
  new karma.Server({
    configFile: __dirname + '/karma.conf.coffee',
  }, done).start();
});


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

gulp.task('serve', ['clean', 'copyhtml', 'tslint', 'tscompile', 'tscompile-specs', 'watch'], function (callback) {
  connect.server({
    root: ['.tmp', './bower_components'],
    livereload: true,
    host: 'renuo-cms-client.dev'
  });
  open('http://renuo-cms-client.dev:8080');
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

gulp.task('ts-specs-compile', function () {
  return gulp.src('src/app/**/*_spec.ts')
    .pipe(sourcemaps.init())
    .pipe(ts(tsSpecsProject))
    .pipe(babel({presets: ['es2015']}))
    .pipe(sourcemaps.write('.'))
    .pipe(run_if('production', uglify()))
    .pipe(gulp.dest('.tmp'))
    .pipe(connect.reload());
});

gulp.task('watch', function () {
  gulp.watch('src/**/*.ts', ['tslint', 'ts-single-compile', 'ts-specs-compile']);
  gulp.watch('.tmp/specs.js', ['test']);
  gulp.watch('demo/**/*.html', ['copyhtml']);
});

gulp.task('tscompile', ['tslint', 'ts-single-compile']);
gulp.task('tscompile-specs', ['tslint', 'ts-specs-compile']);
gulp.task('default', ['tslint', 'tscompile', 'tscompile-specs', 'test']);
