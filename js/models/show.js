define(['backbone'], function(Backbone ) {
    var Show = Backbone.Model.extend({	
	urlRoot: 'get/seasons'
    }); 

    return Show;
});
