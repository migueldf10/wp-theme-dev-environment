var gulp = require("gulp"),
    sass = require("gulp-sass"),
    // postcss = require("gulp-postcss"),
    autoprefixer = require("autoprefixer"),
    cssnano = require("cssnano"),
    sourcemaps = require("gulp-sourcemaps");

var browserSync = require("browser-sync").create();
const sitename = 'gulp'; // set your siteName here

	
var paths = {
    styles: {
        src: "scss/**/*.scss",
        dest: "app/css"
    }
};


function style() {
    return (
        gulp
            .src(paths.styles.src)
            // Initialize sourcemaps before compilation starts
            .pipe(sourcemaps.init())
            .pipe(sass())
            .on("error", sass.logError)
            // Use postcss with autoprefixer and compress the compiled file using cssnano
            // .pipe(postcss([autoprefixer(), cssnano()]))
            // Now add/write the sourcemaps
            .pipe(sourcemaps.write())
            .pipe(gulp.dest(paths.styles.dest))
            .pipe(browserSync.stream())

    );
}



function watch(){
    browserSync.init({

        server: {
            baseDir: './'
        }
     });
    // gulp.watch takes in the location of the files to watch for changes
    // and the name of the function we want to run on change
    gulp.watch(paths.styles.src, style)
    gulp.watch(paths.styles.dest).on('change', browserSync.reload);


}
    

exports.style = style;
exports.watch = watch


