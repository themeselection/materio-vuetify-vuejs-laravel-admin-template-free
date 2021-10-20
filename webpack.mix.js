const mix = require('laravel-mix')
const path = require('path')
require('vuetifyjs-mix-extension')

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel applications. By default, we are compiling the CSS
 | file for the application as well as bundling up all the JS files.
 |
 */
const webpack = {
  resolve: {
    alias: {
      '@resources': path.resolve(__dirname, 'resources/'),
      '@': path.resolve(__dirname, 'resources/js/src/'),
      'apexcharts': path.resolve(__dirname, 'node_modules/apexcharts-clevision'),
    },
  },
}

mix.webpackConfig(webpack)

mix
  .js('resources/js/app.js', 'public/js')
  .vuetify('vuetify-loader', './resources/sass/styles/variables.scss')
  .vue()
  .copyDirectory('resources/js/src/assets/images', 'public/images')

mix.webpackConfig({
  output: {
    chunkFilename: 'js/chunks/[name].[chunkhash].js',
  },
})
