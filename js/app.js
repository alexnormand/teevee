define(
    ['backbone', 'views/teeveeRoot', 'views/teeveeSearch', 'views/teeveeShow'],
    function( Backbone,  TeeveeRootView, TeeveeSearchView, TeeveeShowView) {
    
	var TeeveeRouter = Backbone.Router.extend({

	    routes : {	
		'/' : "root",
		'/search/:query' : "search",
		'/show/:showid' : "show"
	    },
	    
	    root : function() {
		var view = new TeeveeRootView({router: this});
	    },	
	
	    search : function(query) {	
		var view = new TeeveeSearchView({router: this, query: query});
	    },	
	
	    show : function(showid) {
		var view = new TeeveeShowView(this);
	    }	
	});
		
	var router = new TeeveeRouter;	
	Backbone.history.start({root: "/~alex/github/epguides-scraper/"});

	if(!window.location.hash)
	    router.navigate('/', true);

    });
