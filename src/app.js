var myApp = (function(){

	var _index = 0;
	var _player = null;

	// initialize the player
	var _initialize = function(){
		// Add items to the list view
       var counter = 1;
       myCasts.forEach(function(item){
       		$("#myListView").append("<li item-num=" + counter+ ">" + counter +". " + item.name + "</li>");
       		counter++;	
       });
       
       // apply jQuery mobile styling
       $("#myListView").listview("refresh");

        $('#myListView').on('click', 'li', function(e){
             myApp.jump(e.currentTarget.attributes['item-num'].value - 1 );
             //e.currentTarget.addClass('.selected-list-item');
    	});

    	_player = $('#myPlayer');
    	_player.attr('src', myCasts[_index].url);

        // jump to next item.
        _player.bind('ended', function(){
        	myApp.next();
        });
	};



	var _next = function(){
		if(++_index === myCasts.length)
			return;

		_jump(_index % myCasts.length);
	};

	var _prev = function(){
		if(--_index === -1)
			return;

		_jump(_index % myCasts.length)
	};

	var _jump = function(index){
		_index = index;
		_player.attr('src', myCasts[_index].url);
        _player.trigger('play');
	};

	
	return {
		initialize: _initialize,
		next: 		_next,
		prev: 		_prev,
		jump: 		_jump
	};


})();



jQuery(document).ready(function ($) {
         var percentChange = .62;
         var newHeight = $(window).height() * percentChange; 
        $('#contentDiv').css('height', newHeight + 'px');

        myApp.initialize();
    });