"use strict";

const gulp = require("gulp");
const babel = require("gulp-babel");
const sass = require("gulp-sass");
const autoprefixer = require("gulp-autoprefixer");
const cleancss = require("gulp-clean-css");
const concat = require("gulp-concat");
const rename = require("gulp-rename");
const uglify = require("gulp-uglify");
const browserSync = require('browser-sync').create();

/**
 * Here we set a prefix for our compiled and stylesheet and scripts.
 * Note that this should be the same as the `$themeHandlePrefix` in `func-script.php` and `func-style.php`.
 */
const config = {
    fontName: "awesome",
    fontClassName: "awesome-icon",
    themePrefix: "theme-tysia"
};
const host = "tysia.local";
const src = {
    img: ["wp-content/themes/tysia/assets/images/**.{png,jpg,gif}"],
    scss: "wp-content/themes/tysia/assets/scss/style.scss",
    scss_watch: "wp-content/themes/tysia/assets/scss/**/*.scss",
    js: ["wp-content/themes/tysia/assets/js/scripts/common.js"],
    fontIcons: ["wp-content/themes/tysia/assets/icons/fonts/**/*.svg"]
};

const dest = {
    css: "wp-content/themes/tysia/assets/css/",
    js: "wp-content/themes/tysia/assets/js/"
};


/** Browser Sync **/
/******************/
gulp.task('browsersync', function () {
    browserSync.init({
        open: false,
        host: host,
        proxy: host,
        notify: true,
        ui: false
    });
});

/**
 * Task for styles.
 *
 * Scss files are compiled and sent over to `assets/css/`.
 */
gulp.task("css", function() {
    gulp
        .src(src.scss)
        .pipe(sass().on("error", sass.logError))
        .pipe(
            autoprefixer({
                Browserslist: ["last 3 versions", "> 5%", "Explorer >= 10", "Safari >= 8"],
                cascade: false
            })
        )
        .pipe(rename(`${config.themePrefix}.min.css`))
        .pipe(cleancss())
        .pipe(gulp.dest(dest.css))
        .pipe(browserSync.reload({stream: true}));;
});

/**
 * Task for scripts.
 *
 * Js files are uglified and sent over to `assets/js/scripts/`.
 */
gulp.task("js", function() {
    return gulp
        .src(src.js)
        .pipe(
            babel({
                presets: ["es2015"]
            })
        )
        .pipe(concat(`${config.themePrefix}.min.js`))
        .pipe(uglify())
        .pipe(gulp.dest(dest.js));
});

/**
 * Task for watching styles and scripts.
 */
gulp.task("watch", function() {
    gulp.watch(src.scss_watch, ["css"]);
    gulp.watch(src.js, ["js"]);
});

gulp.task("default", ['browsersync',"css", "js", "watch"]);
