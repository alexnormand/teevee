define([
    'zepto',
    'underscore',
    'backbone',
], function($, _, Backbone) {
    var Episode = Backbone.Model.extend({
	defaults: {
	    title  : 'episode title',
	    num    : 'episode number',
	    airdate: 'episode airdate'
	},

    });
    
});
