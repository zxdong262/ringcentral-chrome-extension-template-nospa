
const webpack = require('webpack')
const sysConfigDefault = require('./config.default')
const ExtraneousFileCleanupPlugin = require('webpack-extraneous-file-cleanup-plugin')
const path = require('path')
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const pack = require('./package.json')

const stylusSettingPlugin =  new webpack.LoaderOptionsPlugin({
  test: /\.styl$/,
  stylus: {
    preferPathResolver: 'webpack'
  }
})

const opts = {
  extensions: ['.map', '.js'],
  minBytes: 3900
}

const from = path.resolve(
  __dirname,
  'node_modules/ringcentral-embeddable-extension-common/src/icons'
)
const to1 = path.resolve(
  __dirname,
  'dist/icons'
)
const to2 = path.resolve(
  __dirname,
  'dist-firefox/icons'
)

let {
  clientID,
  appServer
} = sysConfigDefault.ringCentralConfigs
let {
  serviceName
} = sysConfigDefault.thirdPartyConfigs

let appConfigQuery = ''
if (clientID || appServer) {
  appConfigQuery = `?prefix=${serviceName}-rc&newAdapterUI=1&userAgent=${serviceName}_extension%2F${pack.version}&disableActiveCallControl=false&appKey=${clientID}&appServer=${encodeURIComponent(appServer)}`
}

const {version} = pack

const pug = {
  loader: 'pug-html-loader',
  options: {
    data: {
      version,
      appConfigQuery,
      _global: {
        version,
        appConfigQuery
      }
    }
  }
}


var config = {
  mode: 'production',
  entry: {
    content: './src/content.js',
    background: './src/background.js',
    standalone: './node_modules/ringcentral-embeddable-extension-common/src/app/standalone.pug',
    app: './node_modules/ringcentral-embeddable-extension-common/src/app/app.js',
    manifest: './src/manifest.json',
    '../dist-firefox/content': './src/content.js',
    '../dist-firefox/background': './src/background.js',
    '../dist-firefox/standalone': './node_modules/ringcentral-embeddable-extension-common/src/app/standalone-firefox.pug',
    '../dist-firefox/app': './node_modules/ringcentral-embeddable-extension-common/src/app/app.js',
    '../dist-firefox/manifest': './src/manifest-firefox.json'
  },
  output: {
    path: __dirname + '/dist',
    filename: '[name].js',
    publicPath: '/',
    chunkFilename: '[name].[hash].js',
    libraryTarget: 'var'
  },
  watch: true,
  resolve: {
    extensions: ['.js', '.json']
  },
  resolveLoader: {
    modules: [
      path.join(process.cwd(), 'node_modules/ringcentral-embeddable-extension-common/loaders'),
      path.join(process.cwd(), 'node_modules')
    ]
  },
  optimization: {
    minimize: sysConfigDefault.minimize
  },
  module: {
    rules: [
      {
        test: /manifest\.json$|manifest-firefox\.json$/,
        use: [
          'manifest-loader'
        ]
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules\/(?!(ringcentral-embeddable-extension-common)\/).*/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              cacheDirectory: true,
              presets: [
                '@babel/preset-env'
              ],
              plugins: [
                '@babel/plugin-proposal-class-properties',
                'babel-plugin-lodash',
                '@babel/plugin-syntax-dynamic-import',
                [
                  '@babel/plugin-proposal-decorators',
                  {
                    legacy: true
                  }
                ],
                [
                  '@babel/plugin-transform-runtime',
                  {
                    regenerator: true
                  }
                ]
              ]
            }
          }
        ]
      },
      {
        test: /\.styl$/,
        use: [
          'style-loader',
          'css-loader',
          'stylus-loader'
        ]
      },
      {
        test: /\.(png|jpg|svg)$/,
        use: ['url-loader?limit=101920&name=images/[hash].[ext]']
      },
      {
        test: /standalone\.pug$/,
        use: [
          'file-loader?name=./standalone.html',
          'concat-loader',
          'extract-loader',
          'html-loader',
          pug
        ]
      },
      {
        test: /standalone-firefox\.pug$/,
        use: [
          'file-loader?name=../dist-firefox/standalone.html',
          'concat-loader',
          'extract-loader',
          'html-loader',
          pug
        ]
      }
    ]
  },
  devtool: 'source-map',
  plugins: [
    stylusSettingPlugin,
    new LodashModuleReplacementPlugin({
      collections: true,
      paths: true
    }),
    new CopyWebpackPlugin([{
      from,
      to: to1,
      force: true
    }, {
      from,
      to: to2,
      force: true
    }], {}),
    new ExtraneousFileCleanupPlugin(opts),
    new webpack.DefinePlugin({
      'process.env.ringCentralConfigs': JSON.stringify(sysConfigDefault.ringCentralConfigs),
      'process.env.thirdPartyConfigs': JSON.stringify(sysConfigDefault.thirdPartyConfigs)
    })
  ]
}

module.exports = config

