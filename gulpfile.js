'use strict';
let gulp = require('gulp');
let babel = require('gulp-babel');
let uglify = require('gulp-uglify');
let rename = require('gulp-rename');
let concat = require('gulp-concat');
let cssmin = require('gulp-cssmin');

const jsPath = 'dist/js';
const cssPath = 'dist/css';

gulp.task('watch', () => gulp.watch(['src/*/*.*'], ['js', 'css']));

gulp.task('js', () =>
  gulp.src('src/js/*.js')
    .pipe(babel({
  		presets: ['es2015']
  	}))
    .pipe(concat('all.js'))
  	.pipe(gulp.dest(jsPath))
    .pipe(uglify())
    .pipe(rename({
      extname: '.min.js'
    }))
  	.pipe(gulp.dest(jsPath))
);

gulp.task('css', () =>
  gulp.src(['src/css/*.scss', 'src/css/*.css'])
    .pipe(concat('all.css'))
    .pipe(gulp.dest(cssPath))
    .pipe(cssmin())
    .pipe(rename({
      extname: '.min.css'
    }))
  	.pipe(gulp.dest(cssPath))
)

gulp.task('build', ['js', 'css']);

gulp.task('default', ['build']);
