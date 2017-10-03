var gulp = require('gulp');
var postcss = require('gulp-postcss');
const babel = require('gulp-babel');
var minify = require('gulp-minify');
//postcss 添加前缀
gulp.task('css', function () {
    var postcss      = require('gulp-postcss');
    var sourcemaps   = require('gulp-sourcemaps');
    var autoprefixer = require('autoprefixer');

    return gulp.src('./src/*.css')
        .pipe(sourcemaps.init())
        .pipe(postcss([autoprefixer()]))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('./dist'));
        //dest:destination 目的地
        //dist:distribution 发布
});

//babel ES6转换成ES5
gulp.task('js',() =>
    gulp.src('src/*.js')
        .pipe(babel({
            presets: ['env']
        }))
        .pipe(minify({noSource: true,ext:{min:'.js'}}))
        .pipe(gulp.dest('dist'))
);

gulp.task('default',['css','js'])
