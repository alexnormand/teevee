define(['backbone', 'models/show'], function(Backbone, Show) {
 
    var Shows = Backbone.Collection.extend({
	model : Show,
	url : 'get/search/',

	initialize : function(models, query) {
	    this.url += query;
	}

    });
    
    return Shows;
});
