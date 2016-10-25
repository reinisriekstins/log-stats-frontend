const webpack = require('webpack');
const path    = require('path');
const CommonsChunkPlugin = require('./node_modules/webpack/lib/optimize/CommonsChunkPlugin');

module.exports = {
	entry: {
    index: './src/js/index.js',
    vendor: ['axios', 'c3', 'jquery', 'lodash'/*, 'react', 'react-dom'*/]
    
  },
	output: {
		path: path.join(__dirname, 'dist'),
    publicPath: '/public/',
		filename: 'bundle.js'
	},
	devServer: {
		inline: true,
		contentBase: 'dist',
		port: 3000
	},
	module: {
		loaders: [
			{
				test: /\.js$/,
				exclude: /(node_modules)/,
				loader: 'babel',
				query: {
					presets: [/*'react',*/ 'es2015']
				}
			},
			{
				test: /\.scss$/,
				loader: 'style-loader!css-loader!sass-loader'
			}
	 ]
	},
	plugins: [
		new CommonsChunkPlugin('vendor', 'vendor.bundle.js')
	]
};
