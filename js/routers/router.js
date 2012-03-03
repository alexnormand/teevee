define(
    ['backbone', 
     'views/root',
     'views/search',
     'views/seasons',
     'views/season', 
     'collections/shows',
     'collections/season',
     'models/show'],
    function(Backbone, RootView, SearchView, SeasonsView, SeasonView, Shows, Season, Show) {    

	var Router = Backbone.Router.extend({

	    routes : {	
		''                            : 'root',
		'search/:query'               : 'search',
		'show/:showid/seasons'        : 'seasons',
		'show/:showid/season/:season' : 'season',	
	    },
	    
	    root : function() {
		var view = new RootView({router: this});
		view.render();	
		view.main.html(view.el);
	    },	
	
	    search : function(query) {		
		var shows = new Shows,
		    view  = new SearchView({router: this, collection: shows});
				
		shows.setUrl(query);
		$.getJSON(shows.url, function(json) {			
		    shows.reset(json);			
		    view.main.html(view.el);
		});
	    },	

	    seasons: function(showid) {	
		var show = new Show({id: showid}),
    		    view = new SeasonsView({router: this, model: show});		
					
		show.setUrl(showid);
		$.getJSON(show.url, function(json) {
		    show.set(json);
		    view.main.html(view.el);
		});						
	    },
	
	    season : function(showid, season) {
		var season = new Season(null, {showid: showid, season: season}),
		      view = new SeasonView({router : this, collection: season});
		
		$.getJSON(season.url, function(json) {
		    season.reset(json);
		    view.main.html(view.el);		    
		});		
	    },
	});
	
	return Router;	
    });
