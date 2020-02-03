'use strict';

const { parallel, series, src, dest, watch, lastRun, task } = require('gulp');
var sourcemaps = require('gulp-sourcemaps');
var gulp = require('gulp');
var sass = require('gulp-sass');
var babel = require('gulp-babel');
var imagemin = require('gulp-imagemin');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');

//var cleanCSS = require('gulp-clean-css');
var del = require('del');

var paths = {
    scss: {
        src: './src/scss/*.scss',
        dest: './src/css'
    },
    css: {
        src: './src/css/**/*.css',
        dest: './dist/css/'
    },
    png: {
        src: 'src/images/**/*.png',
        dest: 'dist/img/'
    },
    jpg: {
        src: 'src/images/**/*.jpg',
        dest: 'dist/img/'
    },
    gif: {
        src: 'src/images/**/*.gif',
        dest: 'dist/img/'
    },
    js: {
        src: 'src/js/**/*.js',
        dest: 'dist/js/'
    },
    html: {
        src: 'src/*.html',
        dest: 'dist/'
    }
};

function clean() {
    return del(['dist']);
}

function js() {
    return src(paths.js.src, { sourcemaps: true })
        .pipe(babel())
        .pipe(uglify())
        .pipe(concat('operation.js'))
        .pipe(dest(paths.js.dest));
}

function js_src() {
    return src(paths.js.src, { sourcemaps: true })
        .pipe(concat('operation.src.js'))
        .pipe(dest(paths.js.dest));
}

function jpg() {
    return src(paths.jpg.src, { since: lastRun(jpg) })
        .pipe(imagemin())
        .pipe(dest(paths.jpg.dest));
}

function png() {
    return src(paths.png.src, { since: lastRun(png) })
        .pipe(imagemin())
        .pipe(dest(paths.png.dest));
}

function gif() {
    return src(paths.gif.src, { since: lastRun(gif) })
        .pipe(imagemin())
        .pipe(dest(paths.gif.dest));
}

function scss() {
    return src(paths.scss.src)
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(sourcemaps.write())
        .pipe(dest(paths.scss.dest));

    //return done(new Error('sass'));

}

function css() {
    return src(paths.css.src)
        .pipe(dest(paths.css.dest));

    ///return done(new Error('css'));
}

function html() {
    return src(paths.html.src)
        .pipe(dest(paths.html.dest));
}

function watchFiles() {

    watch(paths.scss.src, scss);
    watch(paths.css.src, css);
    watch(paths.js.src, js);
    watch(paths.js.src, js_src);
    watch(paths.html.src, html);
    watch(paths.jpg.src, jpg);
    watch(paths.png.src, png);
    watch(paths.gif.src, gif);
}

exports.clean = series(clean);
exports.scss = parallel(scss);
exports.default = parallel(watchFiles, series(clean, js, js_src, jpg, png, gif, scss, css, html));