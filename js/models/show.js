define(['backbone'], function(Backbone ) {
    var Show = Backbone.Model.extend({

	setUrl: function(showid) {
	    this.url = 'get/seasons/' + showid;
	}
    }); 

    return Show;
});
