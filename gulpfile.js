var gulp = require('gulp');
var plumber = require('gulp-plumber');
var rename = require('gulp-rename');
var concat = require('gulp-concat');
var browserSync = require('browser-sync');
var sass = require('gulp-sass');

//Task in Variable
var SERVER_BASE_DIR = './';

// Static Server + watching scss/html files
gulp.task('serve', ['sass'], function() {

    browserSync.init({
        server: SERVER_BASE_DIR
    });

    //gulp.watch("appscss/*.scss", ['sass']);
    gulp.watch("*").on('change', browserSync.reload);
});

// Compile sass into CSS & auto-inject into browsers
gulp.task('sass', function() {
    return gulp.src("app/scss/*.scss")
        .pipe(sass())
        .pipe(gulp.dest("app/css"))
        .pipe(browserSync.stream());
});

gulp.task('default', ['serve']);