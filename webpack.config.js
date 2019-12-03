var path = require('path')
var webpack = require('webpack')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const env = process.env.NODE_ENV

module.exports = {
    entry: {
        main: [path.resolve(__dirname, './src/www/browser.js')],
    },
    output: {
        path: path.resolve(__dirname, './public/dist'),
        publicPath: '/dist/',
        filename: '[name].js'
    },
    optimization: {
        minimizer: [
            // https://github.com/mishoo/UglifyJS2/tree/harmony#minify-options
            new UglifyJsPlugin({
                cache: true,
                parallel: true,
                extractComments: false,
                uglifyOptions: {
                  compress: true,
                  ecma: 6,
                  mangle: true,
                  output: {
                    comments: false
                    }
                },
                sourceMap: true
              })
        ],
        runtimeChunk: true,
        minimize: true,
        splitChunks: {
            cacheGroups: {
                vendor: {
                    test: path.resolve(__dirname, "./node_modules/"),
                    chunks: "all",
                    name: "vendor",
                    priority: -10,
                    enforce: true,
                    reuseExistingChunk: true,
                }
            }
        }
    },
    
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader"
          }
        }
      ]
    },

    plugins: [
        

        new webpack.DefinePlugin({
            __isBrowser__: "true"
        }),
    ]
  };