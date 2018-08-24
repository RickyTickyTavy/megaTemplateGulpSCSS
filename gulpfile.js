

var gulp = require('gulp'),
		scss = require('gulp-sass'),
		browserSync = require('browser-sync'),
		// concat = require('gulp-concat'),
		cleanCss = require('gulp-clean-css'); // минификация CSS

gulp.task('scss', function() {
	return gulp.src('app/_scss/**/*.scss') // Указываем папку с SCSS файлом
	.pipe(scss()) // Указываем плагин для работы с файлом ( преобразуем SCSS в CSS)
	.pipe(cleanCss( {level: { 1: { specialComments: 0 } } })) // Минифицируем CSS
	.pipe(gulp.dest('app/_css')) // Выгружаем результат в папку _css
	.pipe(browserSync.reload({stream: true})) // Обновляем CSS на странице при изменении
});

gulp.task('browser-sync', function() {
	browserSync({ 
		server: { // Параметры сервера
			baseDir: 'app' // Директория сервера
		},
		notify: true // Отключение уведомлений от сервера
	});
});

gulp.task('watch', ['browser-sync', 'scss'], function() {
	gulp.watch('app/_scss/**/*.scss', ['scss']);// Наблюдение за scss файлами
	gulp.watch('app/**/*.html', browserSync.reload);
	gulp.watch('app/_js/**/*.js', browserSync.reload);
	// Наблюдение за другими типами файлов
});

gulp.task('default', ['watch']);








// gulp.src - выборка исходных файлов проекта для обработки плагином;
// .pipe(plugin()) - вызов Gulp плагина для обработки файла;
// .pipe(gulp.dest('folder')) - вывод результирующего файла в папку назначения (dest - пункт назначения).