define([
    'zepto',
    'underscore',
    'backbone',
    'text!templates/list.html'    
], function($, _, Backbone, showListTemplate) {
 
    var TeeveeSearchView = Backbone.View.extend({
	el: $('#main'),	
	template : showListTemplate,

	events: {
	    'click .current li' : "displayShow"
	},

	initialize : function () {
	    this.render();
	},

	displayShow: function(event) {
	    event.preventDefault();	    	   
	    this.options.router.navigate('/show/' + event.target.id.slice(1), true);
	},

	render: function() {
	    var query     = decodeURIComponent(this.options.query),	       
	        t         = '&_=' + new Date().getSeconds(),
                template  = this.template,
                el        = this.el;
	
	    $('#spinner').css('display', 'inline-block');

	    $.getJSON('get/search/' + query, function(response) {
		el.html(_.template(template, {list : response}));		
	    });	    	   
	    
	    

	    return this;
	}		
    });
    
    return TeeveeSearchView;

});
