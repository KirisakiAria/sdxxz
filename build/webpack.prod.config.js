'use strict'

const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const webpack = require('webpack');
const merge = require('webpack-merge');
const baseWebpackConfig = require('./webpack.base.config');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const webpackConfig = merge(baseWebpackConfig, {

	output: {
		path: path.resolve(__dirname, '../dist'),
		filename: 'static/js/[name].[hash].js',
		publicPath: './'
	},

	module: {
		rules: [{
			test: /\.(less|css)$/,
			use: ExtractTextPlugin.extract({
				use: [{
					loader: 'css-loader',
					options: {
						minimize: true
					}
				}, 'less-loader'],
				fallback: 'style-loader'
			}),
		}]
	},

	resolve: {
		alias: {
			'vue$': 'vue/dist/vue.esm.js',
			'vue-router': 'vue-router/dist/vue-router.esm.js'
		}
	},

	plugins: [
		new webpack.DefinePlugin({
			'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'production')
		}),
		new webpack.ProvidePlugin({
			Vue: ['vue', 'default'],
			VueRouter: ['vue-router', 'default']
		}),
		new CleanWebpackPlugin('dist', {
			root: path.resolve(__dirname, '../')
		}),
		new ExtractTextPlugin({
			filename: 'static/css/styles.[hash].css',
		}),
		new UglifyJSPlugin({
			test: /\.js$/,
			uglifyOptions: {
				ecma: 8
			}
		}),
		new webpack.BannerPlugin({
			banner: `伟大鱼塘 ${new Date().getFullYear()}-${new Date().getMonth()+1}-${new Date().getDate()}`
		})
	]
});

module.exports = webpackConfig;