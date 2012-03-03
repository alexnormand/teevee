define([
    'zepto',
    'underscore',
    'views/baseView',
    'text!templates/list.html',
    'text!templates/episode.html',
], function($, _, BaseView, episodeListTemplate, episodeTemplate ) {
 
    var TeeveeSeasonView = BaseView.extend({
	template : episodeListTemplate,

	tagName: 'ul',

	events : {
	    'click li ' : "displayEpisode"
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
	    this.main.html(html);
	    this.slideIn();
	},

	render : function(event) {
	    this.$el.html(_.template(this.template,
				     {list : this.collection.toJSON()}));			    	    	    	    
	    this.slideIn();
	    return this;
	}		
    });
    
    return TeeveeSeasonView;
});
