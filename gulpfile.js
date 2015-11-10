var gulp = require('gulp');
var sass = require('gulp-sass');
var markdown = require('gulp-markdown');
var browsersync = require('browser-sync');
var autoprefixer = require("gulp-autoprefixer");
var csscomb = require('gulp-csscomb');
var jade = require('gulp-jade');
var plumber = require('gulp-plumber');
var coffee = require('gulp-coffee');
var eslint = require('gulp-eslint');
var notifier = require('node-notifier');
var path = require('path');

//sass
// gulp.task('sassbuild',function(){
//   gulp.src('src/sass/**/*.scss')
//   .pipe(sass())
//   .pipe(gulp.dest('src/css'));
// });

// markdown to html
gulp.task('mdown', function () {
  return gulp.src('docs/*.md')
      .pipe(markdown())
      .pipe(gulp.dest('src/md'));
});

//sass
gulp.task('sass', function () {
    gulp.src('./src/**/sass/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('./src/**/css'));
});

// browsersync
gulp.task('browsersync',function(){
  browsersync({
    port: 8282,
    server: {
      baseDir: './' // document root
    }
  });
});

//jade template
gulp.task('templates', function() {
  var YOUR_LOCALS = {};
  gulp.src('./src/lib/*.jade')
    .pipe(jade({
      locals: YOUR_LOCALS
    }))
    .pipe(gulp.dest('./dist/'));
});

// jslint
gulp.task('lint', function() {
  return gulp.src(['./src/**/*.js']) // ここでエラーが発生するとgulpが落ちて止まる
    .pipe($.plumber({
      errorHandler: function(error) {
        // ここでエラーをキャッチできる
        var title = '[task]' + taskName + ' ' + error.plugin;
        var errorMsg = 'error: ' + error.message;
        console.error(title + '\n' + errorMsg);
        // node-notifierがデスクトップ通知をしてくれる
        notifier.notify({
          title: title,
          message: errorMsg,
          time: 3000
        });
      }
    }))
    .pipe($.eslint())
    .pipe($.eslint.format())
    .pipe($.eslint.failOnError())
    .pipe($.plumber.stop());
});

//reload
gulp.task('bs-reload',function(){
  browsersync.reload();
});

//watch
gulp.task('watch', function() {
  gulp.watch('./', ['bs-reload']);
  // gulp.watch(['./app/js/*.js', './app/js/controller/*.js'], ['js', 'reloadServer']);
  // gulp.watch(['./app/css/hoge.css'], ['css', 'reloadServer']);
});

gulp.task('default',['browsersync'],function(){
  gulp.watch('./**',['bs-reload']);
  gulp.watch('./src/**/*.scss', ['sass']);
});
