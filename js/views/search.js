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
	    'click .shows li' : "displaySeasons"
	},

	initialize: function() {
	    this.collection.bind('reset', this.render, this);
	    this.showSpinner();
	},

	displaySeasons : function(event) {
	    event.preventDefault();
	    this.options.router.navigate('/show/' + event.target.id.slice(1) + '/seasons', true);
	    this.el.html(this.spinner);
	},

	render : function() {
	    this.el.html(_.template(
		this.template, 
		{list : this.collection.toJSON(), cssClass: 'shows'}));			    	    	    
	    return this;
	}		
    });
    
    return TeeveeSearchView;
});
