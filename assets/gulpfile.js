/*
 * Required plugins
 * SCSS:
 */
var gulp          = require( 'gulp' );
var postcss       = require( 'gulp-postcss' );
var sass          = require( 'gulp-sass' );
var autoprefixer  = require( 'autoprefixer' );
var flexbugsfixes = require( 'postcss-flexbugs-fixes' );
var cssnano       = require( 'cssnano' );

// JS:
var concat = require( 'gulp-concat' );
var uglify = require( 'gulp-uglify' );

// BrowserSync:
var browserSync = require( 'browser-sync' ).create();
var reload      = browserSync.reload;





/*
 * File sources
 */
const sass_src   = './sass/**/*scss';
const theme_root = './../';
const js_src     = './js/*.js';
const js_output  = './js/min/';





/*
 * Style Task
 */
gulp.task( 'styles', function() {
	// Plugins that run on sass compiling. Remember to keep autoprefixer below other plugins.
	var plugins = [
		flexbugsfixes(),
		cssnano({
			zindex: false
		}),
		autoprefixer() // Browserslist is defined in package.json
	];
	return gulp.src( sass_src )
		.pipe( sass().on( 'error', sass.logError ) )
		.pipe( postcss( plugins ) )
		.pipe( gulp.dest( theme_root ) );
} );





/*
 * Task: Compile JavaScript
 */
gulp.task( 'scripts', function() {
	return gulp.src( js_src )
		.pipe( concat( 'maksimer.min.js' ) )
		.pipe( uglify() )
		.pipe( gulp.dest( js_output ) );
} );





/*
 * Browser sync task
 */
gulp.task( 'browser-sync', function() {
	var files = [
		theme_root + 'style.css',
		theme_root + '/**/*.php'
	];

	browserSync.init( files, {
		proxy: 'wp.dev',
		open: true,
		injectChanges: true,
		reloadDelay: 500
	} );
} );





/*
 * Watch task
 */
gulp.task( 'watch', function() {
	gulp.watch( sass_src, ['styles'] ); // CSS changes
	gulp.watch( js_src, ['scripts'] ); // JavaScript changes
} );





/*
 * Default task
 */
gulp.task( 'default', [
	'styles',
	'scripts'
] );