define(['backbone', 'models/episode'], function(Backbone, Episode) {
 
    var Episodes = Backbone.Collection.extend({
	model : Episode,
	url : 'get/show/',

	initialize : function(models, showid) {
	    this.url += showid;
	}

    });
    
    return Episodes;
});
