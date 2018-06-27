var gulp = require('gulp');
var pug = require('gulp-pug');

var browserSync = require('browser-sync');
var server = browserSync.create();

function reload(done) {
  server.reload();
  done();
}

function serve(done) {
  server.init({
    server: {
      baseDir: './build'
    }
  });
  done();
}


gulp.task('pug', function() {
	return gulp.src('src/**/*.pug')
		.pipe(pug({
			pretty: true
		}))
		.pipe(gulp.dest('build/'))
});


gulp.task('watch', function(){
	gulp.watch('src/**/*.pug', gulp.series('pug', reload));
});

gulp.task('clean', function(){
	return del('./build');	
});

gulp.task('build', gulp.parallel('pug'));

gulp.task('serve', gulp.parallel('watch', serve));

gulp.task('default', gulp.series('clean','build', 'serve'));