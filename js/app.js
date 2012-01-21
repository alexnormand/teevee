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
    
	var shows = new Shows;

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
		
		view.showSpinner();
		shows.setUrl(query);
		shows.fetch({success: function() {
		    view.render();
		}});		

	
	    },	

	    seasons: function(showid) {	
		var show = new Show({id: showid}),
    		    view = new TeeveeSeasonsView({router: this, model: show});		
			
		view.showSpinner();
		show.setUrl(showid);
		show.fetch({success: function(show) {		    
		    view.render();
		}});								
	    },
	
	    season : function(showid, season) {
		var season = new Season(null, {showid: showid, season: season}),
		      view = new TeeveeSeasonView({router : this, collection: season});
		
		view.showSpinner();
		season.fetch({success: function() {
		    view.render();
		}});
	    },
	});
		
	var router = new TeeveeRouter;	
	Backbone.history.start({root: '/~alex/github/teevee'});

	if(!window.location.hash)
	    router.navigate('/', true);

    });
