define([
    'app',
    'common/menu/list/list_view'
], function(AppManager, View){
    
    AppManager.module('MenuModule.List', function(List, AppManager, Backbone, Marionette, $, _){
        
        List.Controller = {
            
            listMenu: function(){
                
                if(DEBUG) console.info("menu.list.list_controller.listMenu()")
                
                require([
                    'entities/menu'
                ], function(){
                    
                    var links = AppManager.request('menu:entities');
                    var menu = new View.Menu({collection: links});
                    
                    menu.on('itemview:navigate', function(childView, model){
                        var trigger = model.get('navigationTrigger');
                        AppManager.trigger(trigger);
                    });
                    
                    AppManager.menuRegion.show(menu);
                });
            },
            
            setActiveMenuItem: function(menuItemUrl){
                
                if(DEBUG) console.info("menu.list.list_controller.setActiveMenuItem("+menuItemUrl+")")
                
                var links = AppManager.request('menu:entities');
                
                var menuItemToSelect = links.find(function(menu){
                    return menu.get('url') === menuItemUrl;
                });
                
                menuItemToSelect.select();
                links.trigger('reset');
            }
        };
    });

    return AppManager.MenuModule.List.Controller;
});