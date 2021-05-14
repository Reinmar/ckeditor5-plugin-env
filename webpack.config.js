'use strict';

const path = require( 'path' );
const { styles, builds } = require( '@ckeditor/ckeditor5-dev-utils' );

if ( process.argv.includes( '--dll' ) ) {
	module.exports = builds.getDllPluginWebpackConfig( {
		themePath: require.resolve( '@ckeditor/ckeditor5-theme-lark' ),
		packagePath: __dirname,

		// In the future, once the manifest is published we can remove `../` below so
		// to read it directly from `ckeditor5` package installed via npm (not a local repo).
		manifestPath: require.resolve( '../ckeditor5/build/ckeditor5-dll.manifest.json' ),

		// TODO
		// isDevelopmentMode: process.argv.includes( '--dev' )
	} );
} else {
	// TODO
	// The below can also be replaced with something like `builds.getPluginDevWebpackConfig()` call.

	module.exports = {
		// https://webpack.js.org/configuration/entry-context/
		entry: './sample/sample-dev.js',

		// https://webpack.js.org/configuration/output/
		output: {
			path: path.resolve( __dirname, 'build' ),
			filename: 'sample.js'
		},

		module: {
			rules: [
				{
					test: /ckeditor5-[^/\\]+[/\\]theme[/\\]icons[/\\][^/\\]+\.svg$/,

					use: [ 'raw-loader' ]
				},
				{
					test: /ckeditor5-[^/\\]+[/\\]theme[/\\].+\.css$/,

					use: [
						{
							loader: 'style-loader',
							options: {
								injectType: 'singletonStyleTag',
								attributes: {
									'data-cke': true
								}
							}
						},
						{
							loader: 'postcss-loader',
							options: styles.getPostCssConfig( {
								themeImporter: {
									themePath: require.resolve( '@ckeditor/ckeditor5-theme-lark' )
								},
								minify: true
							} )
						}
					]
				}
			]
		},

		// Useful for debugging.
		devtool: 'source-map',

		// By default webpack logs warnings if the bundle is bigger than 200kb.
		performance: { hints: false }
	};
}