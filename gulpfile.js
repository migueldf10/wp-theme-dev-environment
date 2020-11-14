var gulp = require("gulp")
var less = require('gulp-less');
var sourcemaps = require("gulp-sourcemaps");
var browserSync = require("browser-sync").create();
var postcss = require("postcss")
var cssnano = require("cssnano")
var autoprefixer = require("autoprefixer")
var postcss = require('gulp-postcss');
var concat = require('gulp-concat');
const babel = require('gulp-babel');
	
var paths = {
    styles: {
        src:"scss/theme.scss",
        watch: "scss/**/*.scss",
        dest: "dist",
        outputFile : "theme.css"

    },
    scripts: {
        src: "js/theme/**/*.js",
        dest: "dist",
        outputFile : "theme.js"
    }
};

var plugins = [
    autoprefixer(),
    cssnano({preset: ['default', {
        discardComments: {
            removeAll: false,
        },
    }]})
];

function style() {
    return (
        gulp
            .src(paths.styles.src)
            .pipe(sourcemaps.init())
            .pipe(less())
            .on('error',console.log.bind(console))
            .pipe(postcss(plugins))
            .pipe(gulp.dest(paths.styles.dest))
            .pipe(browserSync.stream())

    );
}


function bundleJs(){
    return (
        gulp.src(paths.scripts.src)
            .pipe(concat(paths.scripts.outputFile))
            .pipe(babel({
                plugins: ['@babel/transform-runtime']
            }))
            .pipe(gulp.dest(paths.scripts.dest))
    );
}


function bundleAjax(){
    return (
        gulp.src(paths.ajax.src)
            .pipe(babel({
                plugins: ['@babel/transform-runtime']
            }))
            .pipe(gulp.dest(paths.ajax.dest))
    );
}





function watch(){
    //initialize browsersync
    browserSync.init({
        files: ["./*.php","dist"],
        //browsersync with a php server
        proxy: "http://localhost:8888/tdoa",
        notify: true
    });
    // gulp.watch takes in the location of the files to watch for changes
    // and the name of the function we want to run on change
    gulp.watch(paths.styles.watch, style)
    gulp.watch(paths.styles.outputFile).on('change', browserSync.reload);
    gulp.watch(paths.scripts.src, bundleJs)
    gulp.watch(paths.ajax.src, bundleAjax)
    gulp.watch(paths.scripts.outputFile).on('change', browserSync.reload);


}
    

exports.style = style;
exports.watch = watch
exports.bundleJs = bundleJs


