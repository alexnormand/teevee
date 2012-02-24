({
    baseUrl: "./",
    out: "../build/js/main.js",
    paths: {
	text: 'lib/require/text',
	order: 'lib/require/order',
	fastclick: 'lib/fastclick',
	zepto: 'lib/zepto-0.8',
	underscore: 'lib/underscore-1.3.1',
	backbone: 'lib/backbone-0.9.1'
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
