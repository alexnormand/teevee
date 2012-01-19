define([
    'zepto',
    'underscore',
    'backbone',
    'text!templates/root.html'    
], function($, _, Backbone, searchBoxTemplate) {
 
    var Teevee = Backbone.View.extend({
	el: $('#main'),
	
	template: searchBoxTemplate,

	events: {
	    'submit #target' : "search"
	},

	initialize : function() {
	    this.render();
	},

	search: function(event) {
	    event.preventDefault();	    	   

	    var query = $('#searchbox').val();
	    this.options.router.navigate('/search/' +  encodeURIComponent(query), true);
	},


	render: function(event) {
	    this.el.html(this.template);	    
	    return this;
	}		
    });
    
    return Teevee;

});
