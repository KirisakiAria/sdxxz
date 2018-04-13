'use strict'

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {

	context: path.resolve(__dirname, "../"),

	entry: {
		app: './src/main.js'
	},

	resolve: {
		extensions: ['.js', '.vue', '.json']
	},

	module: {
		rules: [{
			test: /\.vue$/,
			use: [{
				loader: 'vue-loader'
			}]
		}, {
			test: /\.mp3(\?.*)?$/,
			loader: 'url-loader',
			options: {
				limit: 1000000,
				name: './static/media/[name].[hash].[ext]'
			}
		}, {
			test: /\.(png|gif|jpg|svg|jpeg)$/i,
			use: [{
				loader: 'url-loader',
				options: {
					limit: 1000000,
					name: './static/images/[name].[hash].[ext]'
				}
			}]
		}, {
			test: /\.(woff|woff2|eot|ttf)\??.*$/,
			use: [{
				loader: 'url-loader',
				options: {
					limit: 1000000,
					mimetype: 'application/font-woff',
					filename: './static/fonts/[name].[hash].[ext]'
				}
			}]
		}]
	},

	plugins: [
		new HtmlWebpackPlugin({
			filename: 'index.html',
			template: 'index.html',
			minify: {
				removeComments: true,
				collapseWhitespace: true,
				removeAttributeQuotes: true
			}
		})
	]
}