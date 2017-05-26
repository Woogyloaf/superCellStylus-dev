const watchify      = require('watchify');
const browserify    = require('browserify');
const gulp          = require('gulp');
const source        = require('vinyl-source-stream');
const buffer        = require('vinyl-buffer');
const gutil         = require('gulp-util');
const babelify      = require('babelify');
const uglify        = require('gulp-uglify');
const sourcemaps    = require('gulp-sourcemaps');
const assign        = require('lodash.assign');
const browserSync   = require('browser-sync');
const sass          = require('gulp-sass');
const autoprefixer  = require('gulp-autoprefixer');
const gulpif        = require('gulp-if');
const del           = require('del');

const spritesmith   = require('gulp.spritesmith');
const stylus        = require('gulp-stylus');
const imagemin      = require('gulp-imagemin');
const pug						= require('gulp-pug');

// setup node enviorment (development or production)
const env = process.env.NODE_ENV;

// ////////////////////////////////////////////////
// Javascript Browserify, Watchify, Babel, React
// https://github.com/gulpjs/gulp/blob/master/docs/recipes/fast-browserify-builds-with-watchify.md
// ////////////////////////////////////////////////

// add custom browserify options here
const customOpts = {
  entries: ['./src/js/index.js'],
  debug: true,
};
const opts = assign({}, watchify.args, customOpts);
const b = watchify(browserify(opts));

// add transformations here
b.transform('babelify', { presets: ['es2015', 'react'] });

gulp.task('js', bundle); // so you can run `gulp js` to build the file
b.on('update', bundle); // on any dep update, runs the bundler
b.on('log', gutil.log); // output build logs to terminal

function bundle() {
  return b.bundle()

    // log errors if they happen
    .on('error', gutil.log.bind(gutil, gutil.colors.red(
       '\n\n*********************************** \n' +
      'BROWSERIFY ERROR:' +
      '\n*********************************** \n\n'
      )))
    .pipe(source('main.js'))

    // optional, remove if you don't need to buffer file contents
    .pipe(buffer())
    .pipe(gulpif(env === 'production', uglify()))

    // optional, remove if you dont want sourcemaps
    .pipe(sourcemaps.init({ loadMaps: true })) // loads map from browserify file
    // Add transformation tasks to the pipeline here.
    // writes .map file
    .pipe(gulpif(env === 'development', sourcemaps.write('../maps')))
    .pipe(gulp.dest('./public/js'))
    .pipe(browserSync.reload({ stream: true }));
}

// ////////////////////////////////////////////////
// Browser-Sync Tasks
// ////////////////////////////////////////////////

gulp.task('browserSync', function () {
  browserSync({
    server: {
      baseDir: './public/',
    },
  });
});

// ////////////////////////////////////////////////
// HTML Tasks
// ////////////////////////////////////////////////

gulp.task('html', function () {
  return gulp.src('public/**/*.html')
    .pipe(browserSync.reload({ stream: true }));
});


// ////////////////////////////////////////////////
// Pug Tasks
// ////////////////////////////////////////////////

gulp.task('pug', function() {
	return gulp.src('src/pug/*.*')
		.pipe(pug({pretty: true }))
		.pipe(gulp.dest('public/'))
		.on('error', gutil.log.bind(gutil, gutil.colors.red(
			 '\n\n*********************************** \n' +
			'Pug ERROR:' +
			'\n*********************************** \n\n'
			)))
		.pipe(browserSync.reload({stream:true}));
});


// ////////////////////////////////////////////////
// Styles Tasks  Sass
// ///////////////////////////////////////////////

// gulp.task('styles', function () {
//   gulp.src('src/scss/style.scss')
//     .pipe(sourcemaps.init())

//       // scss output compressed if production or expanded if development
//       .pipe(gulpif(env === 'production', sass({ outputStyle: 'compressed' }),
//         sass({ outputStyle: 'expanded' })))
//       .on('error', gutil.log.bind(gutil, gutil.colors.red(
//          '\n\n*********************************** \n' +
//         'SASS ERROR:' +
//         '\n*********************************** \n\n'
//         )))
//       .pipe(autoprefixer({
//         browsers: ['last 3 versions'],
//         cascade: false,
//       }))
//     .pipe(gulpif(env === 'development', sourcemaps.write('../maps')))
// .pipe(gulp.dest('public/css'))
// .pipe(browserSync.reload({ stream: true }));
// });


// ////////////////////////////////////////////////
// Styles Tasks STYL
// ///////////////////////////////////////////////

gulp.task('styles', function() {
  gulp.src('src/stylus/style.styl')
    .pipe(sourcemaps.init())
       .pipe(stylus({compress: false }))
       // .pipe(sass({outputStyle: 'compressed'}))
      // .on('error', errorlog)
      .on('error', gutil.log.bind(gutil, gutil.colors.red(
         '\n\n*********************************** \n' +
        'Stylus ERROR:' +
        '\n*********************************** \n\n'
        )))
      .pipe(autoprefixer({
              browsers: ['last 3 versions'],
              cascade: false
          }))
    .pipe(sourcemaps.write('../maps'))
    .pipe(gulp.dest('public/css'))
    .pipe(browserSync.reload({stream:true}));
});


// ////////////////////////////////////////////////
// Sprite Tasks
// ///////////////////////////////////////////////

gulp.task('sprite', function() {
    var spriteData =
        gulp.src('./src/images/sprite/*.*') // путь, откуда берем картинки для спрайта
            .pipe(spritesmith({
                imgName: 'sprite.png',
                cssName: '_sprite.styl',
                cssFormat: 'stylus',
                algorithm: 'binary-tree',
                cssTemplate: 'stylus.template.mustache',
                cssVarMap: function(sprite) {
                    sprite.name = 's-' + sprite.name
                }
            }));

    spriteData.img.pipe(gulp.dest('public/images/sprite')); // путь, куда сохраняем картинку
    spriteData.css.pipe(gulp.dest('src/stylus/')); // путь, куда сохраняем стили
});

// ////////////////////////////////////////////////
// Image  Min Tasks
// ///////////////////////////////////////////////

gulp.task('imagemin', function () {
    gulp.src('src/images/*')
        .pipe(imagemin())
        .pipe(gulp.dest('public/images'))
});

// ////////////////////////////////////////////////
// Delete maps folder in production mode
// ///////////////////////////////////////////////

gulp.task('clean:maps', (env === 'production', deleteMapsFolder));

function deleteMapsFolder() {
  return del([
    'public//maps/**',
  ]);
}

// ////////////////////////////////////////////////
// Watch Tasks
// ////////////////////////////////////////////////

gulp.task('watch', function () {
  gulp.watch('public/**/*.html', ['html']);
  // gulp.watch('src/scss/**/*.scss', ['styles']);
  gulp.watch('src/images/sprite/*', ['sprite']);
  gulp.watch('src/pug/**/*.*', ['pug']);
  gulp.watch('src/images/*', ['imagemin']);
});

gulp.task('default', ['pug', 'js', 'styles','browserSync', 'clean:maps', 'watch']);
