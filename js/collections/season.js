define(['backbone', 'models/episode'], function(Backbone, Episode) {
 
    var Season = Backbone.Collection.extend({
	model : Episode,

	initialize : function(models, options) {
	    this.url = 'get/show/' + options.showid + 
		       '/season/'  + options.season;
	}
    });
    
    return Season;
});
