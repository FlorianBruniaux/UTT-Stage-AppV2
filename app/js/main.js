requirejs([
    'app',
    'common/menu/menu_module',
    'common/breadcrumb/breadcrumb_module'
], function(AppManager){
    
    // Start the application manager
    AppManager.start()

});