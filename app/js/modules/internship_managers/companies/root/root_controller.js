define([
    'app',
    'common/roots/root_view'
], function(AppManager, View){

    // CompaniesModule Root Controller
    AppManager.module('CompaniesModule.Root', function(Root, AppManager, Backbone, Marionette, $, _){
        
        Root.Controller = {
            
            // To list all the options of root.
            listRootOptions: function(){
                
                if(DEBUG) console.info('modules/internship_managers/companies/root/root_controller.js -> listRootOptions()');
                
                // Updates breadcrumb
                var path = [
                    { name: 'companies', url: 'companies', navigationTrigger: 'companies:root' }
                ];
                AppManager.trigger('breadcrumb:update', path);
                    
                require([
                    'entities/internship_managers/roots'
                ], function(){
                    
                    // Gets all the options items (objects with differents information - CF entities folder)
                    var items = AppManager.request('internship_managers:companiesRoot:entities');
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

    return AppManager.CompaniesModule.Root.Controller;
});
