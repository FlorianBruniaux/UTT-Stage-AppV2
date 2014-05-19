define([
    'app',
    'common/roots/root_view'
], function(AppManager, View){

    // MonitoringModule Root Controller
    AppManager.module('MonitoringModule.Root', function(Root, AppManager, Backbone, Marionette, $, _){
        
        Root.Controller = {
            
            // To list all the options of root.
            listRootOptions: function(){
                
                if(DEBUG) console.info('internship_managers.monitoring.root.list_controller.listRootOptions()');
                
                // Updates breadcrumb
                var path = [
                    { name: 'Monitoring', url: 'monitoring', navigationTrigger: 'monitoring:root' }
                ];
                AppManager.trigger('breadcrumb:update', path);
                    
                require([
                    'entities/internship_managers/roots'
                ], function(){
                    
                    // Gets all the options items (objects with differents information - CF entities folder)
                    var items = AppManager.request('internship_managers:monitoringRoot:entities');
                    var view = new View.optionsList({
                        collection: items
                    });
                    
                    // When one of the options is chosen, it triggers the event defined in the item object
                    view.on('itemview:navigate', function(childView, model){
                        var trigger = model.get('navigationTrigger');
                        AppManager.trigger(trigger);
                    });
                    
                    // Displays the view
                    AppManager.contentRegion.show(view);
                    
                });
            }  
        }
    });

    return AppManager.MonitoringModule.Root.Controller;
});
