var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var browserSync = require('browser-sync').create();
 browserSync.init({
     server: './'
 });
 browserSync.stream();

gulp.task('default', ['copy-html','copy-images','styles'] ,function() {
	console.log('hello world!');
	gulp.watch('sass,/**/*scss', ['styles']);
	gulp.watch('js,/**/*.js', ['lint']);
	gulp.watch('/index.html', ['copy-html']);

});

gulp.task('styles',function() {
	gulp.src('sass/**/*.scss')
		.pipe(sass({
			outputStyle: 'compressed'
		}).on('error',sass.logError))
		.pipe(autoprefixer({
			browsers: ['last 2 versions']
		}))
		.pipe(gulp.dest('dist/css'))
		.pipe(browserSync.stream());
});

 gulp.task('copy-html',function(){
	 gulp.src('./index.html')
	 .pipe(gulp.dest('./dist'));
 });

 gulp.task('copy-images', function(){
	 gulp.src('img/*')
	 .pipe(gulp.dest('dist/img'));
 });

gulp.task('watch-html',function(){
	gulp.watch('build/index.html')
	.on('change', browserSync.reload)
});
