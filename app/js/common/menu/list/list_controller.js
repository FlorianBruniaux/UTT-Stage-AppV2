define([
    'app',
    'common/menu/list/list_view'
], function(AppManager, View){
    
    AppManager.module('MenuModule.List', function(List, AppManager, Backbone, Marionette, $, _){
        
        List.Controller = {
            
            userCategory: '',
            
            init: function(_userCategory){
                
                this.userCategory = _userCategory;
                var self = this;
                
                AppManager.commands.setHandler("set:active:menu", function(_name){
                    self.setActiveMenuItem(_name);
                });
                
                this.listMenu();
            },
            
            listMenu: function(){
                
                if(DEBUG) console.info("common.menu.list.list_controller.listMenu()")
                
                var self = this;
                
                require([
                    'entities/'+self.userCategory+'/menu'
                ], function(){

                    var links = AppManager.request(self.userCategory+':menu:entities'),
                    menu = new View.Menu({collection: links});
                
                    menu.on('itemview:navigate', function(childView, model){

                        var trigger = model.get('navigationTrigger');

                        AppManager.trigger(trigger);
                    });

                    AppManager.menuRegion.show(menu);

                });
            },
            
            setActiveMenuItem: function(menuItemUrl){
                
                if(DEBUG) console.info("common.menu.list.list_controller.setActiveMenuItem("+menuItemUrl+")")
                
                var self = this;
                
                require([
                    'entities/'+self.userCategory+'/menu'
                ], function(){
                    
                    var links = AppManager.request(self.userCategory+':menu:entities');
                    
                    var menuItemToSelect = links.find(function(menu){
                        return menu.get('url') === menuItemUrl;
                    });
                    
                    menuItemToSelect.select();
                    links.trigger('reset');
                });
            }
        };
    });

    return AppManager.MenuModule.List.Controller;
});