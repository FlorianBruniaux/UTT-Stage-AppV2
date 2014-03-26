define([
    'app',
    'common/menu/list/list_controller'
], function(AppManager, ListController){
    
    AppManager.module('MenuModule', function(Menu, AppManager, Backbone, Marionette, $, _){
        
        /****************************************/
        /*  API                                 */
        /****************************************/
        var API = {
            listMenu: function(){
                ListController.listMenu();
            }
        };
        
        // Sets the active menu item
        AppManager.commands.setHandler("set:active:menu", function(_name){
            ListController.setActiveMenuItem(_name);
        });
        
        /**
         *  Event = 'start'
         */
        AppManager.on('menu:start', function(){
            console.log('menu starts!');
            API.listMenu(); 
        });
        
    });

    return AppManager.MenuModule;
    
})