define(
    ['backbone', 
     'views/teeveeRoot',
     'views/teeveeSearch', 
     'views/teeveeShow', 
     'collections/shows',
     'collections/episodes'],
    function( Backbone,  TeeveeRootView, TeeveeSearchView, TeeveeShowView, Shows, Episodes) {
    
	var TeeveeRouter = Backbone.Router.extend({

	    routes : {	
		'/' : "root",
		'/search/:query' : "search",
		'/show/:showid' : "show"
	    },
	    
	    root : function() {
		var view = new TeeveeRootView({router: this});
		view.render();
	    },	
	
	    search : function(query) {
		var shows = new Shows(null, query),
		    view  = new TeeveeSearchView({router: this, collection: shows});
		
		view.showSpinner();

		shows.fetch({success: function() {
		    view.render();
		}});		
	    },	
	
	    show : function(showid) {
		var episodes = new Episodes(null, showid),
		    view = new TeeveeShowView({router : this, collection: episodes});
		
		view.showSpinner();

		episodes.fetch({success: function() {
		    view.render();
		}});
	    }	
	});
		
	var router = new TeeveeRouter;	
	Backbone.history.start({root: '/~alex/github/teevee'});

	if(!window.location.hash)
	    router.navigate('/', true);

    });
