// TODO: How do is this handled in production? i.e. Hashed names, server routes
const webpack = require('webpack')
const { sync } = require('glob')
const { resolve } = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const { RemoveFilesPlugin } = require('./plugins')

const mode = false && vapid.env === 'development' ? 'development' : 'production'
const site_modules = resolve(vapid.site.paths.root, 'node_modules')
const vapid_modules = resolve(vapid.root, 'node_modules')

module.exports = {
  mode: mode,
  
  context: vapid_modules,

  devtool: 'source-map',

  entry: {
    'javascripts/site': [resolve(vapid.site.paths.www, 'javascripts/site.js')],
    'stylesheets/site': sync(resolve(vapid.site.paths.www, 'stylesheets/site.s[ac]ss')),
    'dashboard/javascripts/dashboard': [resolve(vapid.root, 'assets/javascripts/dashboard.js')],
    'dashboard/stylesheets/dashboard': [resolve(vapid.root, 'assets/stylesheets/dashboard.scss')]
  },

  output: {
    path: resolve(vapid.site.paths.data, '.webpack'),
    publicPath: '/',
    filename: '[name].js'
  },

  module: {
    rules: [
      {
        test:/\.s[ac]ss$/,
        use: [
          { loader: MiniCssExtractPlugin.loader },
          { loader: 'css-loader', options: { url: false } },
          { loader: 'resolve-url-loader' },
          { loader: 'sass-loader?sourceMap' }
        ]
      }
    ]
  },

  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].css'
    }),
    new RemoveFilesPlugin({
      files: [
        'stylesheets/site.js',
        'dashboard/stylesheets/dashboard.js'
      ]
    })
  ],

  resolve: {
    modules: [
      vapid_modules,
      site_modules
    ],
  }
}