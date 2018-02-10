'use strict'

process.env.NODE_ENV = 'production'

const webpack = require('webpack');
const chalk = require('chalk');
const webpackConfig = require('./webpack.prod.config');

webpack(webpackConfig, (err, stats) => {
	if (err) throw err;
	process.stdout.write(stats.toString({
		colors: true,
		modules: true,
		children: false,
		chunks: false,
		chunkModules: false
	}) + '\n\n');

	if (stats.hasErrors()) {
		console.log(chalk.red('ERROR.\n'));
		process.exit(1);
	}

	console.log(chalk.cyan('OJBK.\n'));
});