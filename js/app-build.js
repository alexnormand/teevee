({
    baseUrl: "./",
    out: "../build/js/main.js",
    paths: {
	text: 'lib/require/text',
	order: 'lib/require/order',
	fastclick: 'lib/fastclick',
	zepto: 'lib/zepto',
	underscore: 'lib/underscore',
	backbone: 'lib/backbone'
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
