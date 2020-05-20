const withPlugins = require("next-compose-plugins");

const path = require('path');
const Dotenv = require('dotenv-webpack');
const withOffline = require('next-offline');
const withImages = require('next-images')
const withSass = require("@zeit/next-sass");
const withCSS = require("@zeit/next-css");
const withSourceMaps = require('@zeit/next-source-maps')
const withBundleAnalyzer = require('@next/bundle-analyzer')({
	enabled: process.env.BUNDLE_ANALYZE === 'true',
});

module.exports = withPlugins([
	[withOffline],
	[withBundleAnalyzer],
	[withCSS],
	[withSass],
	[withImages, {
		esModule: true
	}],
	[withSourceMaps]
], {
	//target: 'serverless',
	// next-offline options
	workboxOpts: {
		swDest: process.env.NODE_EXPORT ? 'service-worker.js' : 'static/service-worker.js',
		runtimeCaching: [
			{
				urlPattern: /^https?.*/,
				handler: 'NetworkFirst',
				options: {
					cacheName: 'https-calls',
					networkTimeoutSeconds: 15,
					expiration: {
						maxEntries: 150,
						maxAgeSeconds: 30 * 24 * 60 * 60, // 1 month
					},
					cacheableResponse: {
						statuses: [0, 200],
					},
				},
			},
		],
	},
	//useFileSystemPublicRoutes: false,
	webpack(config, { dev }) {
		config.module.rules.push({
			test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
			use: {
				loader: 'url-loader',
				options: {
					limit: 100000
				}
			}
		});
		config.plugins.push(
			new Dotenv({
				path: path.resolve(
					__dirname,
					`internals/enviroments/${process.env.NODE_BRANCH}.env`
				)
			}),
		)
		return config;
	}
})