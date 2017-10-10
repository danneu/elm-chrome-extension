const gulp = require('gulp')
const loadPlugins = require('gulp-load-plugins')
const webpack = require('webpack')
const rimraf = require('rimraf')

const plugins = loadPlugins()

const webpackConfig = {
  background: require('./background/webpack.config.js'),
  popup: require('./popup/webpack.config.js'),
  content: require('./content/webpack.config.js'),
}

for (const appName of ['background', 'popup', 'content']) {
  gulp.task(`${appName}-js`, ['clean'], cb => {
    webpack(webpackConfig[appName], (err, stats) => {
      if (err) {
        throw new plugins.util.PluginError('webpack', err)
      }
      plugins.util.log('[webpack]', stats.toString())
      cb()
    })
  })
}

gulp.task('popup-html', ['clean'], () => {
  return gulp
    .src('popup/src/index.html')
    .pipe(plugins.rename('popup.html'))
    .pipe(gulp.dest('./dist'))
})

gulp.task('copy-manifest', ['clean'], () => {
  return gulp.src('manifest.json').pipe(gulp.dest('./dist'))
})

gulp.task('clean', cb => {
  rimraf('./dist', cb)
})

gulp.task('build', [
  'copy-manifest',
  'popup-js',
  'popup-html',
  'background-js',
  'content-js',
])

gulp.task('watch', ['default'], () => {
  gulp.watch('popup/**/*', ['build'])
  gulp.watch('content/**/*', ['build'])
  gulp.watch('background/**/*', ['build'])
})

gulp.task('default', ['build'])
