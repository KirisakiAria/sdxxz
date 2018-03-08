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
				loader: 'vue-loader',
				options: {
					transformToRequire: {
						feImage: 'xlink:href',
						audio: "src"
					}
				}
			}]
		}, {
			test: /\.mp3(\?.*)?$/,
			loader: 'url-loader',
			options: {
				limit: 10000,
				name: 'static/media/[name].[hash].[ext]'
			}
		}, {
			test: /\.(png|gif|jpg|svg|jpeg)$/i,
			use: [{
				loader: 'url-loader',
				options: {
					limit: 8192,
					name: 'static/images/[name].[hash].[ext]'
				}
			}]
		}, {
			test: /\.(woff|woff2|eot|ttf)\??.*$/,
			use: [{
				loader: 'url-loader',
				options: {
					limit: 8192,
					mimetype: 'application/font-woff',
					filename: '[name].[hash].[ext]',
					outputPath: 'static/fonts/',
					publicPath: '../'
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