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

			var insertDeviceWidthRule = function() {
        var s = document.styleSheets[0],
            containerWidth = $('#container').width(),
            prefixes = ['-webkit-transform', '-moz-transform', '-ms-transform', '-o-transform', 'transform'],
            rule;

        prefixes = $.map(prefixes, function (prefix) {
            return prefix + ': translateX(' + containerWidth + 'px);';
        });

        rule = 'ul {' + prefixes.join(' ') + '}';

        s.insertRule(rule, s.cssRules.length);
      };


	     // Hides mobile browser's address bar when page is done loading.
	    $(window).bind('load', function(e) {
				setTimeout(function() { window.scrollTo(0, 1); }, 1);
	    });

			$(window).bind('resize', insertDeviceWidthRule);
      insertDeviceWidthRule();


	    //Add FastClick for native-like tapping on smartphones
	    new FastClick(document.body);


	    var router = new Router;
	    Backbone.history.start();

	    if(!window.location.hash)
		router.navigate('/', true);
});

