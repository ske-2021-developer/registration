/* eslint-disable @typescript-eslint/no-var-requires */

const path = require('path')
const webpack = require('webpack')
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebPackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const TerserPlugin = require('terser-webpack-plugin')
// const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')

const isDevelopment = process.env.NODE_ENV !== 'production'

module.exports = {
	mode: isDevelopment ? 'development' : 'production',
	entry: './src/index.tsx',
	output: {
		path: path.resolve(__dirname, 'build'),
		filename: `js/${isDevelopment ? '[name].bundle' : '[name].[contenthash:8]'}.js`,
		chunkFilename: `js/[name].${isDevelopment ? '' : '[contenthash:8]'}.chunk.js`,
		publicPath: ''
	},
	resolve: {
		extensions: ['.ts', '.tsx', '.js', '.jsx'],
		alias: {
			'@assets': path.resolve(__dirname, 'src/assets'),
			'@colors': path.resolve(__dirname, 'src/_colors.scss'),
			'@components': path.resolve(__dirname, 'src/components'),
			'@datas': path.resolve(__dirname, 'src/datas'),
			'@enums': path.resolve(__dirname, 'src/enums'),
			'@helpers': path.resolve(__dirname, 'src/helpers'),
			'@hooks': path.resolve(__dirname, 'src/hooks'),
			'@routes': path.resolve(__dirname, 'src/routes'),
			'@stores': path.resolve(__dirname, 'src/stores'),
			'@typings': path.resolve(__dirname, 'src/typings')
		}
	},
	module: {
		rules: [
			{
				test: /\.[jt]sx?$/,
				exclude: /[\\/]node_modules[\\/](?!(recoil)[\\/])/,
				loader: 'babel-loader'
			},
			{
				test: /\.(html)$/,
				exclude: /node_modules/,
				loader: 'html-loader'
			},
			{
				test: /\.(sa|sc|c)ss$/,
				use: [
					isDevelopment
						? 'style-loader'
						: {
								loader: MiniCssExtractPlugin.loader,
								options: {
									publicPath: '../'
								}
						  },
					'css-loader',
					'sass-loader'
				]
			},
			{
				test: /\.(png|jpe?g|svg|[to]tf)$/i,
				use: [
					{
						loader: 'url-loader',
						options: {
							limit: 8192,
							name: 'assets/[name].[contenthash:8].[ext]',
							esModule: false
						}
					}
				]
			}
		]
	},
	devtool: isDevelopment ? 'cheap-module-source-map' : 'source-map',
	plugins: [
		...(isDevelopment ? [new ReactRefreshWebpackPlugin()] : []),
		new CleanWebpackPlugin(),
		new MiniCssExtractPlugin({
			filename: `css/${isDevelopment ? '[name].bundle' : '[name].[contenthash:8]'}.css`,
			chunkFilename: `css/[name].${isDevelopment ? '' : '[contenthash:8]'}.chunk.css`
		}),
		new HtmlWebPackPlugin({
			template: './public/index.html',
			filename: 'index.html',
			inject: 'body'
		}),
		new CopyWebpackPlugin({
			patterns: [
				{
					from: path.resolve(__dirname, 'public'),
					context: path.resolve(__dirname, 'public'),
					noErrorOnMissing: true,
					globOptions: {
						dot: true,
						ignore: ['**/*.html']
					}
				}
			]
		}),
		// ...(isDevelopment ? [] : [new BundleAnalyzerPlugin({ openAnalyzer: false })]),
		new webpack.DefinePlugin({
			NODE_ENV: JSON.stringify(process.env.NODE_ENV),
			'process.env.PUBLIC_URL': JSON.stringify(path.join('./'))
		})
	],
	optimization: {
		minimize: !isDevelopment,
		minimizer: [
			new TerserPlugin({
				terserOptions: {
					parse: {
						ecma: 8
					},
					compress: {
						ecma: 5,
						warnings: false,
						comparisons: false,
						inline: 2
					},
					mangle: {
						safari10: true
					},
					output: {
						ecma: 5,
						comments: false,
						ascii_only: true
					},
					sourceMap: true
				}
			}),
			new CssMinimizerPlugin({
				sourceMap: true
			})
		],
		splitChunks: {
			chunks: 'all',
			name: false
		}
	},
	devServer: {
		contentBase: path.join(__dirname, 'build'),
		port: 3000,
		hot: true
	}
}
