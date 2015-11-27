var gulp = require('gulp');
var sourcemaps = require('gulp-sourcemaps');
var ts = require('gulp-typescript');
var babel = require('gulp-babel');
var del = require('del');
var tslint = require('gulp-tslint');
var connect = require('gulp-connect');
var concat = require('gulp-concat');

var tsProject = ts.createProject('tsconfig.json');

gulp.task('tslint', function () {
  return gulp.src('src/**/*.ts')
    .pipe(tslint())
    .pipe(tslint.report('prose'));
});

gulp.task('clean', function () {
  del('.tmp/*');
});

gulp.task('copyhtml', function () {
  return gulp.src('demo/**/*.html')
    .pipe(gulp.dest('.tmp'))
    .pipe(connect.reload());
});

gulp.task('watch', function () {
  gulp.watch('src/**/*.ts', ['tslint', 'tscompile']);
  gulp.watch('demo/**/*.html', ['copyhtml']);

});

gulp.task('serve', ['clean', 'copyhtml', 'tslint', 'tscompile', 'watch'], function () {
  connect.server({
    root: '.tmp',
    livereload: true
  });
});

gulp.task('ts-single-compile', function () {
  return gulp.src('src/**/*.ts')
    //.pipe(sourcemaps.init())
    .pipe(ts(tsProject))
    .pipe(babel({presets: ['es2015']}))
    .pipe(concat('all.js'))
    //.pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('.tmp'))
    .pipe(connect.reload());
});

gulp.task('tscompile', ['tslint', 'ts-single-compile']);
gulp.task('default', ['tslint', 'tscompile']);
