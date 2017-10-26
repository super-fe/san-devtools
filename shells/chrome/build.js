process.env.NODE_ENV = 'production';

var ora = require('ora');
var webpack = require('webpack');
var rm = require('rimraf');
var path = require('path');
var chalk = require('chalk');
var webpackConfig = require('./webpack.config.js');

var spinner = ora('building for production...');
spinner.start();

rm(path.join(__dirname, 'build'), err => {
	if (err) throw err;
	webpack(webpackConfig, (error, stats) => {
		spinner.stop();
		if (error) throw error;

		// console.log(stats);
		
		if (stats.hasErrors()) {
			console.log(chalk.red(stats.toJson().errors));
			console.log(chalk.red('\n  Build failed.'));
			process.exit(1);
		}

		console.log(chalk.green('   Build compeleted!\n'));
	});
});
