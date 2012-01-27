require.config({
    paths: {
	text: 'lib/require/text',
	order: 'lib/require/order',
	fastclick: 'lib/fastclick',
	zepto: 'lib/zepto-0.8',
	underscore: 'lib/underscore-1.2.4',
	backbone: 'lib/backbone-0.5.3'
    }
});


require(['require','order!fastclick', 'order!zepto', 'order!underscore', 'order!backbone', 'order!routers/router'], 
	function(require, FastClick, $, _, Backbone, Router) {
		
	     // Hides mobile browser's address bar when page is done loading.
	    $(window).bind('load', function(e) {
		setTimeout(function() { window.scrollTo(0, 1); }, 1);
	    });;

	    //Add FastClick for native-like tapping on smartphones
	    new FastClick(document.body);

	    var router = new Router;	
	    Backbone.history.start({root: '/~alex/github/teevee'});
	    
	    if(!window.location.hash)
		router.navigate('/', true);							    
});

