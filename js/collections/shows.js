define(['backbone', 'models/show'], function(Backbone, Show) {
 
    var Shows = Backbone.Collection.extend({
	model : Show,

	setUrl: function(query) {
	    this.url = 'get/search/' + query;
	}
	

    });
    
    return Shows;
});
