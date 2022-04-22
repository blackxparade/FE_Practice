const { resolve } = require('path');
const { VueLoaderPlugin } = require('vue-loader');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CssExtractPlugin = require('mini-css-extract-plugin');

const cssLoaders = [CssExtractPlugin.loader, 'css-loader', 'postcss-loader'];

// This config is concerned what's going on inside the /src and /test
module.exports = {
	resolve: {
		alias: {
			'src': resolve(__dirname, '../src'),
			'test': resolve(__dirname, '../test'),
		},
		extensions: ['*', '.ts', '.js', '.vue', '.json'],
		mainFiles: ['index', 'index.vue'],
	},
	module: {
		rules: [
			{ test: /\.vue$/, loader: 'vue-loader' },
			{ test: /\.js$/, include: projectPaths(['src', 'test']), use: ['babel-loader'] },
			{ test: /\.ts$/, include: projectPaths(['src', 'test']), use: ['babel-loader',
				{ loader: 'ts-loader', options: { appendTsSuffixTo: ['\\.vue$'], compilerOptions: { noEmit: false }, transpileOnly: true } },
			] },
			{ test: /\.css$/, use: cssLoaders },
			{ test: /\.(scss|sass)$/, use: [...cssLoaders, 'resolve-url-loader', 'sass-loader'] },
			{ test: /\.(otf|ttf|woff|woff2)$/, type: 'asset/resource', generator: { filename: 'assets/[name]-[contenthash][ext]' } },
		],
	},
	plugins: [
		new VueLoaderPlugin(),
		new ForkTsCheckerWebpackPlugin({ typescript: { extensions: { vue: { enabled: true, compiler: '@vue/compiler-sfc' } } } }),
		new CssExtractPlugin({ filename: 'assets/[name]-[contenthash].css' }),
		new HtmlWebpackPlugin(),
	],
	devtool: 'source-map',
};

function projectPaths(rootPaths) {
	const toAbsolute = rootRelative => resolve(__dirname, '../', rootRelative);
	return rootPaths.map(toAbsolute);
}
