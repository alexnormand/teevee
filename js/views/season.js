define([
    'zepto',
    'underscore',
    'views/baseView',
    'text!templates/list.html',
    'text!templates/episode.html',
], function($, _, BaseView, episodeListTemplate, episodeTemplate ) {
 
    var TeeveeSeasonView = BaseView.extend({
	el : $('#main'),
	template : episodeListTemplate,

	events : {
	    'click .episodes li ' : "displayEpisode"
	},

	initialize: function() {
	    this.collection.bind('reset', this.render, this);
	    this.showSpinner();
	},
	
	displayEpisode : function(event) {	
	    event.preventDefault();	    	    

	    var episode = this.collection.get(event.target.id.slice(1) - 0),
	            url = '/show/'    + episode.get('showid') +
   		          '/season/'  + episode.get('season') + 
                          '/episode/' + episode.get('id'),
                   html = _.template(episodeTemplate, {episode: episode.toJSON()});
	  

	    this.options.router.navigate(url);
	    this.el.html(html);	    
	},

	render : function(event) {
	    this.el.html(_.template(
		this.template, 
		{list : this.collection.toJSON(), cssClass : 'episodes'}));			    	    	    	    
	    return this;
	}		
    });
    
    return TeeveeSeasonView;
});
