define([
    'zepto',
    'underscore',
    'backbone'    
], function($, _, Backbone) {
 
    var BaseView = Backbone.View.extend({

	el: '#main',

	spinner : '<div id="spinner"></div>',

	showSpinner : function() {
	    this.$el.html(this.spinner);
	},

	slideIn: function() {
	    setTimeout(function() {
		$('ul').addClass('current')
	    }, 1);
	}

    });
    
    return BaseView;
});
