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
    name: 'lib/require/almond',
    include: 'main',
    wrap:true
})
