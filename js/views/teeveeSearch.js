define([
    'zepto',
    'underscore',
    'views/baseView',
    'text!templates/list.html'    
], function($, _, BaseView, showListTemplate) {
 
    var TeeveeSearchView = BaseView.extend({
	el : $('#main'),
	template : showListTemplate,

	events : {
	    'click .current li' : "displayShow"
	},

	displayShow : function(event) {
	    event.preventDefault();
	    this.options.router.navigate('/show/' + event.target.parentNode.id.slice(1), true);
	    this.el.html(this.spinner);
	},

	render : function() {
	    this.el.html(_.template(this.template, {list : this.collection.toJSON()}));			    	    	    
	    return this;
	}		
    });
    
    return TeeveeSearchView;
});
