'use strict'
const path = require('path')
const utils = require('./utils')
const config = require('../config')
const vueLoaderConfig = require('./vue-loader.conf')

function resolve (dir) {
  return path.join(__dirname, '..', dir)
}



module.exports = {
  context: path.resolve(__dirname, '../'),
  entry: {
    app: './src/main.js'
  },
  output: {
    path: config.build.assetsRoot,
    filename: '[name].js',
    publicPath: process.env.NODE_ENV === 'production'
      ? config.build.assetsPublicPath
      : config.dev.assetsPublicPath
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': resolve('src'),
    }
  },
  devServer: {
    before(app) {
      app.get('/coming', (req, res) => {
        res.json({
          "coming":[{"id":1283276,"img":"http://p1.meituan.net/w.h/movie/fcabb91dbae511e8a32af1deeb0c1cec204154.jpg","wish":36931,"wishst":1,"nm":"大红包","comingTitle":"4月30日 周四"},{"id":1197077,"img":"http://p0.meituan.net/w.h/movie/07e0ee6c6f30700e6d4ab6774d95fc4f108727.jpg","wish":22622,"wishst":0,"nm":"我的初恋十八岁","comingTitle":"7月10日 周五"},{"id":1301478,"img":"http://p0.meituan.net/w.h/movie/644b66958ccbeb8bac4955c52864c8881471793.jpg","wish":20882,"wishst":0,"nm":"北平会馆","comingTitle":"6月12日 周五"},{"id":1241385,"img":"http://p0.meituan.net/w.h/movie/f52ccebd4f91402b6532f44a494713855261102.jpg","wish":17617,"wishst":0,"nm":"秘密访客","comingTitle":"6月25日 周四"},{"id":1292570,"img":"http://p0.meituan.net/w.h/moviemachine/e10ceb90d2c06d3524d01d573ccf88fb7514998.jpg","wish":16221,"wishst":0,"nm":"金禅降魔","comingTitle":"5月8日 周五"},{"id":1280270,"img":"http://p0.meituan.net/w.h/moviemachine/0c3f4cd8caf0f0848a54e3081349bdac22615677.jpg","wish":11416,"wishst":0,"nm":"魔法学院","comingTitle":"5月1日 周五"},{"id":1302281,"img":"http://p0.meituan.net/w.h/moviemachine/1d2b4985d0187b437d41a73994ba2e191607376.jpg","wish":6679,"wishst":0,"nm":"奇妙王国之魔法奇缘","comingTitle":"5月1日 周五"},{"id":1302405,"img":"http://p1.meituan.net/w.h/movie/81fe2197ef930c79624a28cc76c423835264620.png","wish":6075,"wishst":0,"nm":"小公主艾薇拉与神秘王国2","comingTitle":"5月1日 周五"},{"id":1262874,"img":"http://p0.meituan.net/w.h/movie/1907a5af889e44236fd80952980d36e13257090.jpg","wish":4689,"wishst":0,"nm":"82号古宅","comingTitle":"5月15日 周五"},{"id":1301774,"img":"http://p0.meituan.net/w.h/movie/60f85d237dc024edb46e5badfaa71c29512553.jpg","wish":1721,"wishst":0,"nm":"错爱迷踪","comingTitle":"6月19日 周五"}],"paging":{"hasMore":true,"limit":10,"offset":0,"total":19}
        })
      })
      }
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: vueLoaderConfig
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [resolve('src'), resolve('test'), resolve('node_modules/webpack-dev-server/client')]
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('img/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('media/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      }
    ]
  },
  node: {
    // prevent webpack from injecting useless setImmediate polyfill because Vue
    // source contains it (although only uses it if it's native).
    setImmediate: false,
    // prevent webpack from injecting mocks to Node native modules
    // that does not make sense for the client
    dgram: 'empty',
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
    child_process: 'empty'
  }
}
