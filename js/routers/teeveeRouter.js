define(
    ['backbone', 
     'views/teeveeRoot',
     'views/teeveeSearch',
     'views/teeveeSeasons',
     'views/teeveeSeason', 
     'collections/shows',
     'collections/season',
     'models/show'],
    function(Backbone, TeeveeRootView, TeeveeSearchView, TeeveeSeasonsView, TeeveeSeasonView, Shows, Season, Show) {    

	var TeeveeRouter = Backbone.Router.extend({
	    routes : {	
		'/'                            : 'root',
		'/search/:query'               : 'search',
		'/show/:showid/seasons'        : 'seasons',
		'/show/:showid/season/:season' : 'season',	
	    },
	    
	    root : function() {
		var view = new TeeveeRootView({router: this});
		view.render();
	    },	
	
	    search : function(query) {		
		var shows = new Shows,
		    view  = new TeeveeSearchView({router: this, collection: shows});
				
		shows.setUrl(query);
		shows.fetch();	
	    },	

	    seasons: function(showid) {	
		var show = new Show({id: showid}),
    		    view = new TeeveeSeasonsView({router: this, model: show});		
					
		show.setUrl(showid);
		show.fetch();							
	    },
	
	    season : function(showid, season) {
		var season = new Season(null, {showid: showid, season: season}),
		      view = new TeeveeSeasonView({router : this, collection: season});
		
		season.fetch();
	    },
	});
	
	return TeeveeRouter;	
    });
