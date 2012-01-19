define([
    'zepto',
    'underscore',
    'views/baseView',
    'text!templates/list.html'    
], function($, _, BaseView, episodeListTemplate ) {
 
    var TeeveeShowView = BaseView.extend({
	el : $('#main'),
	template : episodeListTemplate,

	events : {
	    'click .current li ' : "displayShow"
	},

	displayShow : function(event) {
	    var query = $('searchbox').val();
	    e.preventDefault();	    	    
	},

	render : function(event) {
	    this.el.html(_.template(this.template, {list : this.collection.toJSON()}));			    	    	    	    
	    return this;
	}		
    });
    
    return TeeveeShowView;
});
