// ========================================================================================
// Подключаем поиск файлов, выгрузку в целевую директорию, наблюдателя за изменениями
// в файлах, paralel паралельный запуск слежения и отслеживания изменений в файлах,
// series - последовательное удаление задач
const { src, dest, watch, parallel, series } = require('gulp');

// Подключаем препроцессор SASS (конвертация *.scss файлов в обычные *.css)
const scss = require('gulp-sass')(require('sass'));

// Конкатенация файлов (плагин gulp-concat из нескольких файлов делает один файл)
// Также этот плагин переименовывает файлы
const concat = require('gulp-concat');

// Подключаем плагин для минификации JS-кода
const uglifyJS = require('gulp-uglify-es').default;

// Подключаем плагин для синхронизации и отображения изменений файлов
// в реальном времени.
const browserSync = require('browser-sync').create();

// Подключаем автопрефиксы для тсарых браузеров
const autoprefixer = require('gulp-autoprefixer');

// Очистка папки dist перед сборкой проекта
const clean = require('gulp-clean');

// ========================================================================================
// Функция для работы с препроцессором SASS и минимизации стилей
function styles() {
	return src('./src/scss/style.scss')
		.pipe(scss().on('error', scss.logError)) // Включаем коменнтарии в стиле JS
		.pipe(
			autoprefixer({
				grid: true,
				overrideBrowserslist: ['last 10 version'],
				cascade: true,
			}),
		)
		.pipe(concat('style.min.css'))
		.pipe(scss({ outputStyle: 'compressed' }))
		.pipe(dest('./src/css/'))
		.pipe(browserSync.stream());
}

// Функция для минимизации js-файлов
function scripts() {
	return src('./src/js/main.js')
		.pipe(concat('main.min.js'))
		.pipe(uglifyJS())
		.pipe(dest('./src/js/'))
		.pipe(browserSync.stream());
}

// Функция для отслеживания изменений в файлах
function watching() {
	watch(['./src/scss/style.scss'], styles);
	watch(['./src/js/main.js'], scripts);

	// Найти все файлы *.html во всех папках
	// watch(['/src/**/*.html']);
	watch(['./src/*.html']).on('change', browserSync.reload);
}

// Функция для синхронизации и отображения изменений файлов в реальном времени
function browsersync() {
	browserSync.init({
		server: {
			baseDir: './src/',
		},
	});
}

// Очистка папки dist перед сборкой проекта
function cleanDist() {
	return src('dist').pipe(clean());
}

// Сборка проекта
function building() {
	return src(
		['./src/css/style.min.css', './src/**/*.js', './src/**/*.html', './src/img/**/*', './src/fonts/**/*'],
		{
			base: './src/',
		},
	).pipe(dest('dist'));
}

// ========================================================================================
// Экспортируем функции для внешнего вызова
exports.styles = styles; // Работа со стилями
exports.scripts = scripts; // Работа со скриптами
exports.watching = watching; // Наблюдатель за файлами
exports.browsersync = browsersync; // Синхронизация с браузером

// Сборка проекта
exports.build = series(cleanDist, building);

// Task на паралельный запуск всех функций
exports.default = parallel(styles, scripts, browsersync, watching);
