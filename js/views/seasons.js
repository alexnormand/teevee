define([
    'zepto',
    'underscore',
    'views/baseView',
    'text!templates/seasons.html'    
], function($, _, BaseView, episodeListTemplate ) {
 
    var TeeveeSeasonsView = BaseView.extend({
	template : episodeListTemplate,

	events : {
	    'click .seasons li' : "displaySeason"
	},
	
	initialize: function() {
	    this.model.bind('change', this.render, this);
	    this.showSpinner();
	},

	displaySeason : function(event) {
	    event.preventDefault();	    	    
	    var url = '/show/'   + this.model.get('id') +
                      '/season/' + event.target.id.slice(1);	  

	    this.options.router.navigate(url, true);
	    this.el.html(this.spinner);	    
	},

	render : function(event) {
	    this.el.html(_.template(this.template, {list : this.model.get('seasons')}));
	    return this;
	}		
    });
    
    return TeeveeSeasonsView;
});
