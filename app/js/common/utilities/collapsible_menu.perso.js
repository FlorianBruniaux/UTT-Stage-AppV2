define([

],function() {
    
    return function(){

        $('.sidebar-toggle').click(function () {
		$('.page-container').toggleClass('sidebar-hidden');
	});


	//===== Disabling main navigation links =====//

	$('.navigation li.disabled a, .navbar-nav > .disabled > a').click(function(e){
		e.preventDefault();
	});
        
        $('.sidebar-wide li:not(.disabled) .expand, .sidebar-narrow .navigation > li ul .expand').collapsible({
            defaultOpen: 'second-level,third-level',
            cssOpen: 'level-opened',
            cssClose: 'level-closed',
            speed: 150
	});
    }();
    
});

