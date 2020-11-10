module.exports = api => {
	return {
		presets: [
			[
				'@babel/preset-env',
				{
					targets: {
						esmodules: true
					}
				}
			],
			[
				'@babel/preset-react',
				{
					runtime: 'automatic'
				}
			],
			'@babel/preset-typescript'
		],
		plugins: [
			['@babel/plugin-proposal-class-properties', { loose: false }],
			...(api.env('development') ? [require.resolve('react-refresh/babel')] : [])
		]
	}
}
