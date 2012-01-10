$(document).ready(function(){
    
    $('#target').submit(function(){
	var query = $('#searchbox').val();

	if( $.trim(query) !== '' ) {

	    $('#linklist').remove();
	    $('#spinner').css('display', 'inline-block');

	    $.ajax({
		type: "GET",
		url: "get",
		data: "q=" + query,
		dataType: 'json',
		cache: false,
		success: function(response) {		   		    		    
		    var list = $('<ul>', { id: 'linklist' });

		    for(var link in response) {
			$('<li><a  target="_blank" href="' + response[link] + '">' + response[link] + '</a></li>').appendTo(list);
		    }
					    
		    list.appendTo('#container').hide().fadeIn(700);
		    $('#spinner').hide();		    
		}	    
	    });
	}
	return false;
    });
   
});
