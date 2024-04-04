const path = require('path');

module.exports = {
	mode : 'production',
	entry : {
			'pull_test' : './pull_test.ts',
	},

	module : {
		rules : [
		{
			test : /\.tsx?$/,
			use : 'ts-loader',
			exclude : [/node_modules/, /old/]
		},
	],
	},
	resolve : {
		extensions : ['.tsx', '.ts', '.js', '.json'],
	},
	output : {
		filename : '[name].js',
		path: path.resolve(__dirname, 'dist'),
	},
};
