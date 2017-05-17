var gulp = require('gulp');
var plumber = require('gulp-plumber');
var rename = require('gulp-rename');
var concat = require('gulp-concat');
var browserSync = require('browser-sync');
var sass = require('gulp-sass');
var elixir = require('laravel-elixir');

//Task in Variable
var SERVER_BASE_DIR = './';

gulp.task('browser-sync', function() {
  browserSync({
    server: {
      baseDir: SERVER_BASE_DIR
    }
  });
});

gulp.task('bs-reload', function() {
  browserSync.reload();
});

gulp.task('default', ['browser-sync']);