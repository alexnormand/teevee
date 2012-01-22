require.config({
    paths: {
	text: 'lib/require/text',
	order: 'lib/require/order',
	zepto: 'lib/zepto-0.8',
	underscore: 'lib/underscore-1.2.4',
	backbone: 'lib/backbone-0.5.3'
    }
});


require(['require', 'order!zepto', 'order!underscore', 'order!backbone', 'order!routers/router'], 
	function(require, $, _, Backbone, Router) {
		
	    var router = new Router;	
	    Backbone.history.start({root: '/~alex/github/teevee'});
	    
	    if(!window.location.hash)
		router.navigate('/', true);							    
});

