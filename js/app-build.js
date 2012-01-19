({
    appDir: "./",
    baseUrl: "./",
    paths: {
	text: 'lib/require/text',
	order: 'lib/require/order',
	zepto: 'lib/zepto-0.8',
	underscore: 'lib/underscore-1.2.4',
	backbone: 'lib/backbone-0.5.3'
    },
    optimize: "uglify",
    modules: [
        {
            name: "main",
            exclude: [
                // If you prefer not to include certain libs exclude them here
            ]
        }
    ]
})
