var gulp = require('gulp');
var sourcemaps = require('gulp-sourcemaps');
var ts = require('gulp-typescript');
var babel = require('gulp-babel');
var del = require('del');
var tslint = require('gulp-tslint');
var browserSync = require('browser-sync');
var superstatic = require('superstatic');

var tsProject = ts.createProject('tsconfig.json');

gulp.task('tscompile', function () {
  return gulp.src('src/**/*.ts')
    .pipe(sourcemaps.init())
    .pipe(ts(tsProject))
    .pipe(babel())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('src'));
  //.pipe(livereload());
});

gulp.task('tslint', function () {
  return gulp.src('src/**/*.ts')
    .pipe(tslint())
    .pipe(tslint.report('prose'));
});

gulp.task('clean', function () {
  del('src/**/*.js');
});

gulp.task('copyhtml', function () {
  //return gulp.src('demo/**/*.html')
  //  .pipe(gulp.dest('.tmp'));
  //.pipe(livereload());
});

gulp.task('watch', function () {
  //livereload.listen();
  gulp.watch('src/**/*.ts', ['tslint', 'tscompile']);
  gulp.watch('demo/**/*.html', ['copyhtml']);
  //gulp.watch('.tmp/*').on('change', browserSync.reload);
  gulp.watch('.tmp/**/*.html').on('change', browserSync.reload);

});

gulp.task('serve', ['copyhtml', 'tslint', 'tscompile', 'watch'], function () {
  process.stdout.write('Starting browserSync and superstatic...\n');
  browserSync({
    port: 3000,
    files: ['index.html', '**/*.js'],
    injectChanges: true,
    logFileChanges: false,
    logLevel: 'silent',
    logPrefix: 'renuo-cms-client',
    notify: false,
    reloadDelay: 0,
    server: {
      baseDir: './src',
      middleware: superstatic({debug: true})
    }
  });
});

gulp.task('default', ['tslint', 'tscompile']);
