define(['backbone', 'models/show'], function(Backbone, Show) {
 
    var Shows = Backbone.Collection.extend({
	model : Show,

	initialize : function(models, options) {
	    this.url = 'get/search/' + options.query;
	}
    });
    
    return Shows;
});
