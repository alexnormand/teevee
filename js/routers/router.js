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
		'/'                            : 'root',
		'/search/:query'               : 'search',
		'/show/:showid/seasons'        : 'seasons',
		'/show/:showid/season/:season' : 'season',	
	    },
	    
	    root : function() {
		var view = new RootView({router: this});
		view.render();
	    },	
	
	    search : function(query) {		
		var shows = new Shows,
		    view  = new SearchView({router: this, collection: shows});
				
		shows.setUrl(query);
		shows.fetch();	
	    },	

	    seasons: function(showid) {	
		var show = new Show({id: showid}),
    		    view = new SeasonsView({router: this, model: show});		
					
		show.setUrl(showid);
		show.fetch();							
	    },
	
	    season : function(showid, season) {
		var season = new Season(null, {showid: showid, season: season}),
		      view = new SeasonView({router : this, collection: season});
		
		season.fetch();
	    },
	});
	
	return Router;	
    });
