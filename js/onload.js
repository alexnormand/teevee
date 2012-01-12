$(function() {

    var templates = {
	root   : '<form id="target"><input id="searchbox" type="search" placeholder="Search" name="q" required=""><div id="spinner"></div></form>',
	shows   : '<ul class="current"> {{#items}}<li>{{.}}</li>{{/items}} </ul>',
	seasons : '<ul class="current"> {{#items}}<li>{{.}}</li>{{/items}} </ul>',
        episodes: '<ul> {{#items}}<li>{{.}}</li>{{/items}} </ul>'
    };

    var Router = Backbone.Router.extend({
	routes: {
	    '/'               : "main",
	    '/search/:query'  : "searchTVShows",
	    '/:show'          : "getTVShowInfo",
	    '/:show/:season'  : "getTVShowInfo",	    
	},

	main: function(){
	 
	    var that = this;
	    
	    $('#main').html(Mustache.to_html(templates.root));	   
	    $('#main').on('submit', '#target', function(e){
		var query = $('#searchbox').val();
		e.preventDefault();
		that.searchTVShows(query);
		that.navigate('/search/' + encodeURIComponent(query));
	    });
	    $('#main').on('click', '.current li', that.getTVShowInfo);        
	},

	searchTVShows: function(query) {
	    var args  = Array.prototype.slice.call(arguments),		        
                t     = '&_=' + new Date().getSeconds();	

	    $('#linklist').remove();
	    $('#spinner').css('display', 'inline-block');
	    
	    $.getJSON('get/?q=' + query + t, function(response){	    	    
		$('#main').html(Mustache.to_html(templates.shows,
						 {items: response.filter(function(elt) {
						     return elt !== null;
						 })}));
	    });	    	    
	},

	getTVShowInfo: function(e) {	    	

	    e.preventDefault();

	    var t = '&_=' + new Date().getSeconds();	

	    $.getJSON('get/?show=' + this.textContent, function(response) {
						
		var list = document.createElement('ul');
		list.id = 'seasonslist';
		list.classList.toggle('current');

		response.forEach(function(element) {
		    for( var episodeName in element) {		    
			if(element.hasOwnProperty(episodeName)) {
			    var li = document.createElement('li')
			    li.textContent = element[episodeName];			     
			    list.appendChild(li);
			}
		    }
	    });
	    
	    $('ul.current').remove();
	    $('#main').append(list);	    
	});
	return false;
	}
    });
    		       
    var eprouter = new Router();    
    Backbone.history.start({root: "/~alex/github/epguides-scraper/"});       

    if(!window.location.hash)
       eprouter.navigate('/', true);
});
   
