'use strict'
const utils = require('./utils')
const config = require('../config')
const isProduction = process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'staging';

let buildConfig = config.build_prod;
if(process.env.NODE_ENV == 'staging') {
  buildConfig = config.build_staging;
}

module.exports = {
  loaders: utils.cssLoaders({
    sourceMap: isProduction
      ? config.productionSourceMap
      : config.cssSourceMap,
    extract: isProduction
  }),
  transformToRequire: {
    video: 'src',
    source: 'src',
    img: 'src',
    image: 'xlink:href'
  }
}
