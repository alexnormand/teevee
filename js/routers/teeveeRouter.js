define(['backbone'], function(Backbone){
    var router = Backbone.Router.extend({
	
	routes : {	
	    '/' : "bob",
	    '/search/:query' : "jim",
	    '/show/:showid/episodes':"ben"
	},


	initialize: function(action) {
//	    this.action = action;
	},
		
	root : function() {
//	    this.action.root;
	},
	
	
	search : function(query) {
//	    this.action.search.call(query);
	},
	
	
	episodes : function(showid) {
//	    this.action.episodes(showid);
	}
	
    });
    
    return router;

});
