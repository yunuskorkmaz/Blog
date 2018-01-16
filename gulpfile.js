var gulp = require('gulp');
var sass = require('gulp-sass');
var prefix = require('gulp-autoprefixer')
var plumber = require('gulp-plumber')
var browsersync = require('browser-sync').create();

const reload = browsersync.reload;

gulp.task('browser', function () {
    var files = [
        
        'css/**/*.css',
        
        './*.html'
    ];

    browsersync.init({
        
        server: {
          baseDir: './'
        }
      })

    gulp.watch('./scss/**/*.scss', ['css']);

    gulp.watch('./*.html', ['html']);
})


gulp.task('css', function () {

    return gulp.src('./scss/main.scss')
        .pipe(plumber([{
            errorHandler: false
        }]))
        .pipe(sass())
        .pipe(gulp.dest('./css/'))
        .pipe(browsersync.stream())
});

gulp.task('html', function () {
    return gulp.src('./*.html')
        .on('end', reload);
});

gulp.task('default', ['browser', 'html', 'css']);