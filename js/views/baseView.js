define([
    'zepto',
    'underscore',
    'backbone',
    'text!templates/root.html',
], function($, _, Backbone, searchBoxTemplate) {
 
    var BaseView = Backbone.View.extend({

	initialize : function() {
	    this.spinner = '<div id="spinner"></div>';
	},

	showSpinner : function() {
	    this.el.html(this.spinner);
	}

    });
    
    return BaseView;
});
