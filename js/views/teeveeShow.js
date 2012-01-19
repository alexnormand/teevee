define([
    'zepto',
    'underscore',
    'backbone',
    'text!templates/list.html'    
], function($, _, Backbone, searchBoxTemplate) {
 
    var TeeveeShowView = Backbone.View.extend({
	el: $('#main'),	

	events: {
	    'click .current li ' : "displayShow"
	},

	initialize: function() {
	    this.render();
	},

	displayShow: function(event) {
	    var query = $('searchbox').val();
	    e.preventDefault();	    	    

	},

	render: function(event) {
	    this.el.html('<h1>hurray!</h1>');
	    return this;
	}		
    });
    
    return TeeveeShowView;

});
