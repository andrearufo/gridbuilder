var paths = {
    styles: {
        src: 'dev/scss/**/*.scss',
        dest: 'dist/css'
    },
    scripts: {
        src: 'dev/js/**/*.js',
        dest: 'dist/js'
    },
};

let gulp = require('gulp');
let sourcemaps = require('gulp-sourcemaps');
let sass = require('gulp-sass');
let rename = require('gulp-rename');
let postcss = require('gulp-postcss');
let autoprefixer = require('autoprefixer');
let cssnano = require('cssnano');
let browserSync = require('browser-sync').create();
var uglify = require('gulp-uglify');
var eslint = require('gulp-eslint');

function styles(done) {
    return (
        gulp
            .src(paths.styles.src)
            .pipe(sourcemaps.init())

            .pipe(sass({
                outputStyle: 'expanded'
            }).on('error', sass.logError))
            .pipe(postcss([autoprefixer()]))
            .pipe(gulp.dest(paths.styles.dest))

            .pipe(sass({
                outputStyle: 'compressed'
            }).on('error', sass.logError))
            .pipe(postcss([autoprefixer(), cssnano()]))
            .pipe(rename({ suffix: '.min' }))

            .pipe(sourcemaps.write('.'))
            .pipe(gulp.dest(paths.styles.dest))

            .pipe(browserSync.stream())
    );
	done();
}
exports.styles = styles;

function scripts(done) {
    return (
        gulp
            .src(paths.scripts.src)
            .pipe(sourcemaps.init())

            .pipe(eslint({
                'rules':{
                    'quotes': [1, 'single'],
                    'semi': [1, 'always']
                }
            }))
            .pipe(eslint.format())
            .pipe(eslint.failAfterError())
            .pipe( gulp.dest(paths.scripts.dest) )

    		.pipe( uglify() )
            .pipe(rename({ suffix: '.min' }))

            .pipe(sourcemaps.write('.'))
    		.pipe( gulp.dest(paths.scripts.dest) )

            .pipe(browserSync.stream())
    );
	done();
}
exports.scripts = scripts;

function serve(){
    browserSync.init({
        server: true
    });

    watch();
    gulp.watch('*.html').on('change', browserSync.reload);
}
exports.serve = serve;

function watch(){
    gulp.watch(paths.styles.src, gulp.series('styles'));
    gulp.watch(paths.scripts.src, gulp.series('scripts'));
}
exports.watch = watch;

// exports.build = gulp.parallel(styles, favicon, injectFaviconMarkups);

function start(){
    serve();
}
exports.default = start;
