define([
    'zepto',
    'underscore',
    'views/baseView',
    'text!templates/root.html',
], function($, _, BaseView, searchBoxTemplate) {
 
    var Teevee = BaseView.extend({	
	template : searchBoxTemplate,

	tagName: 'form',
	id: 'target',

	events : {
	    'submit' : "search"
	},

	search : function(event) {
	    event.preventDefault();	    	   
	    var query = $('#searchbox').val();
	    this.options.router.navigate('/search/' +  encodeURIComponent(query), true);
	},

	render : function(event) {
	    this.$el.html(this.template);	   
	    return this;
	}		
    });
    
    return Teevee;

});
