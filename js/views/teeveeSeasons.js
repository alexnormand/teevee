define([
    'zepto',
    'underscore',
    'views/baseView',
    'text!templates/seasons.html'    
], function($, _, BaseView, episodeListTemplate ) {
 
    var TeeveeSeasonsView = BaseView.extend({
	el : $('#main'),
	template : episodeListTemplate,

	events : {
	    'click .seasons li' : "displaySeason"
	},

	displaySeason : function(event) {
	    event.preventDefault();	    	    
	    var url = '/show/'   + this.model.get('id') +
                      '/season/' + event.target.id.slice(1);	  


	    console.log(this.model.get('id'));

	    this.options.router.navigate(url, true);
	    this.el.html(this.spinner);	    
	},

	render : function(event) {
	    this.el.html(_.template(this.template, {list : this.model.get('seasons')}));
	    this.slideIn();
	    return this;
	}		
    });
    
    return TeeveeSeasonsView;
});
