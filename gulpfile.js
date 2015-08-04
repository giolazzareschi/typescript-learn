var gulp = require('gulp');
var sass = require('gulp-ruby-sass');
var minifyCss = require('gulp-minify-css');
var handlebars = require('gulp-handlebars');
var wrap = require('gulp-wrap');
var declare = require('gulp-declare');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var watch = require('gulp-watch');
var ts = require('gulp-typescript');
var typescript = require('gulp-tsc');

gulp.task('default', function() {
  // place code for your default task here
});

gulp.task('sass', function () {
    return sass('dev/css')
        .on('error', function (err) {
            console.error('Error!', err.message);
        })
    	.pipe(minifyCss({compatibility: 'ie8'}))
    	.pipe(concat('app.css'))
        .pipe(gulp.dest('dist/css'));
});

gulp.task('tpl', function(){
  gulp.src('dev/tpl/*.hbs')
    .pipe(handlebars())
    .pipe(wrap('Handlebars.template(<%= contents %>)'))
    .pipe(declare({
      namespace: 'MDL.templates',
      noRedeclare: true, // Avoid duplicate declarations 
    }))
    .pipe(concat('templates.js'))
    .pipe(gulp.dest('dev/js/tpl'));
});

gulp.task('ts5', function() {
  return gulp.src('dev/ts/*.ts')
    .pipe(ts({
      target : 'ES5',
      removeComments : true,
      declarationFiles : true,
      noExternalResolve: false,
      module: 'commonjs',
      emitDecoratorMetadata  : true,
      experimentalDecorators : true
    }))
    .pipe(gulp.dest('dev/js/es5'));
});

gulp.task('app5', function() {
  return gulp.src('*.ts')
    .pipe(ts({
      target : 'ES5',
      removeComments : true,
      declarationFiles : true,
      module: 'commonjs',
      emitDecoratorMetadata  : true,
      experimentalDecorators : true
    }))
    .pipe(gulp.dest(''));
});

gulp.task('ts6', function() {
  return gulp.src('dev/ts/*.ts')
    .pipe(ts({
      target : 'ES6',
      declarationFiles : false,
      noExternalResolve: true
    }))
    .pipe(gulp.dest('dev/js/es6'));
});

gulp.task('js5', function() {
  return gulp.src('dev/js/es5/*.js')
    .pipe(uglify())
    .pipe(concat('app.js'))
    .pipe(gulp.dest('dist/js/es5'));
});

gulp.task('js6', function() {
  return gulp.src('dev/js/es6/*.js')    
    .pipe(concat('app.js'))
    .pipe(gulp.dest('dist/js/es6'));
});

gulp.task('watch5', function () {
    gulp.watch(['dev/css/*.scss'], ['sass']);
    gulp.watch(['dev/ts/*.ts'], ['ts5']);
    gulp.watch(['dev/js/es5/*.js'], ['js5']);
    gulp.watch(['dev/tpl/*.hbs'], ['tpl']);
    gulp.watch(['*.ts'], ['app5']);
});

gulp.task('watch6', function () {
    gulp.watch(['dev/css/*.scss'], ['sass']);
    gulp.watch(['dev/ts/*.ts','*.ts'], ['ts6']);
    gulp.watch(['dev/js/es6/*.js'], ['js6']);
    gulp.watch(['dev/tpl/*.hbs'], ['tpl']);    
});