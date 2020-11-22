import * as path from 'path';
import * as webpack from 'webpack';

import { CleanWebpackPlugin } from 'clean-webpack-plugin';

const libraryName: string = 'xes-rx-tween';
const entry: string = `./src/${libraryName}.ts`;
const moduleConfig: webpack.ModuleOptions = {
	rules: [
		{
			test: /\.(t|j)sx?$/,
			exclude: /(node_modules|bower_components)/,
			use: {
				loader: 'babel-loader',
				options: {
					babelrc: true
				}
			}
		}
	],
};

module.exports = [
	...([
		['default', 'umd'],
		[undefined, 'commonjs'],
		[libraryName, 'amd'],
	] as [string | undefined, string][])
	.map(([library, libraryTarget]) => ({
		entry,
		output: {
			path: path.resolve(__dirname, 'dist', libraryTarget),
			filename: `${libraryName}.js`,
			library,
			libraryTarget,
			globalObject: 'this',
		},
		externals: {
			rxjs: 'rxjs',
			'rxjs/operators': 'rxjs/operators',
		},
		module: moduleConfig,
		plugins: [
			new CleanWebpackPlugin(),
			new webpack.SourceMapDevToolPlugin({
				filename: '[name].js.map',
				module: true,
			}),
		],
		resolve: {
			extensions: ['.ts', '.js', '.json']
		},
		optimization: {
			minimize: process.env.DEBUG_BUILD !== 'true'
		},
	})),
]
