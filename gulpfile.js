

var gulp = require('gulp'),
		scss = require('gulp-sass'),
		browserSync = require('browser-sync'),
		// concat = require('gulp-concat'),
		cleanCss = require('gulp-clean-css'); // минификация CSS

gulp.task('scss', function() {
	return gulp.src('www/_scss/**/*.scss') // Указываем папку с SCSS файлом
	.pipe(scss()) // Указываем плагин для работы с файлом ( преобразуем SCSS в CSS)
	.pipe(cleanCss( {level: { 1: { specialComments: 0 } } })) // Минифицируем CSS
	.pipe(gulp.dest('www/_css')) // Выгружаем результат в папку _css
	.pipe(browserSync.reload({stream: true})) // Обновляем CSS на странице при изменении
});


// gulp.task('js', function() {
// 	return gulp.src([
// 		'app/libs/jquery/dist/jquery.min.js',
// 		'app/js/common.js', // Always at the end
// 		])
// 	.pipe(concat('scripts.min.js'))
// 	// .pipe(uglify()) // Mifify js (opt.)
// 	.pipe(gulp.dest('app/js'))
// 	.pipe(browsersync.reload({ stream: true }))
// });


gulp.task('browser-sync', function() {
	browserSync({ 
		proxy: "megaTemplateGulpSCSS", //название папки сайта
		notify: false // Отключение уведомлений от сервера
	});
});

gulp.task('watch', ['scss', 'browser-sync'], function() {
	gulp.watch('www/_scss/**/*.scss', ['scss']);// Наблюдение за scss файлами
	gulp.watch('www/**/*.php', browserSync.reload);
	gulp.watch('www/_js/**/*.js', browserSync.reload);
	gulp.watch('www/**/*.css', browserSync.reload);
	// Наблюдение за другими типами файлов
});

gulp.task('default', ['watch']);

//html version of browser sync
// gulp.task('browser-sync', function() {
// 	browserSync({ 
// 		server: { 
// 			baseDir: 'www' 
// 		},
// 		notify: true 
// 	});
// });



// gulp.src - выборка исходных файлов проекта для обработки плагином;
// .pipe(plugin()) - вызов Gulp плагина для обработки файла;
// .pipe(gulp.dest('folder')) - вывод результирующего файла в папку назначения (dest - пункт назначения).