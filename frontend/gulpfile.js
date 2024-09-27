    const gulp = require('gulp');
    const less = require('gulp-less');
    const cleanCss = require('gulp-clean-css');
    const rename = require('gulp-rename');
    const concat = require('gulp-concat');
    const uglify = require('gulp-uglify');

    function lessTask() {
        return gulp.src('src/less/common.less',
            'src/less/main.less',
            'src/less/form.less',
            'src/less/choice.less',
            'src/less/test.less',
            'src/less/result.less',
            'src/less/show-result.less')
            .pipe(less())
            .pipe(concat('style.less'))
            .pipe(cleanCss())
            .pipe(rename({extname: '.min.css'}))
            .pipe(gulp.dest('src/css/'));
    }


    function watchLessTask() {
        gulp.watch('src/less/*.less', lessTask);
    }

    exports.default = gulp.series(lessTask, watchLessTask);
// exports.default = gulp.series(lessTask, jsTask, watchLessTask);

//
// function jsTask() {
//     return gulp.src('src/js/*.js')
//         .pipe(concat('app.ts'))
//         .pipe(uglify())
//         .pipe(rename({extname: '.min.js'}))
//         .pipe(gulp.dest('dist/js'));
// }