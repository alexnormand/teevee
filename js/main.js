require.config({
    paths: {
	text: 'lib/require/text',
	order: 'lib/require/order',
	fastclick: 'lib/fastclick',
	zepto: 'lib/zepto',
	underscore: 'lib/underscore',
	backbone: 'lib/backbone'
    }
});


require(['require','order!fastclick', 'order!zepto', 'order!underscore', 'order!backbone', 'order!routers/router'], 
	function(require, FastClick, $, _, Backbone, Router) {
		
	     // Hides mobile browser's address bar when page is done loading.
	    $(window).bind('load', function(e) {
		setTimeout(function() { window.scrollTo(0, 1); }, 1);
	    });

	    $(window).bind('resize', function() {
		var s = document.styleSheets[0];
		s.insertRule("ul {margin-left:" + $('#container').width() + "px;}",
			 s.cssRules.length);
	    });

	    //Add FastClick for native-like tapping on smartphones
	    new FastClick(document.body);

	    // Dynamically set margin-left property for consistent transition speed
	    // depending on device-width.
	    var s = document.styleSheets[0];
	    s.insertRule("ul {margin-left:" + $('#container').width() + "px;}",
			 s.cssRules.length);

	    var router = new Router;	
	    Backbone.history.start();
	    	   
	    if(!window.location.hash)
		router.navigate('/', true);							    
});

