define([
    "app",
    "modules/home/root/root_view"
], function(AppManager, View){

    // HomeModule Root OptionsList Controller
    AppManager.module("HomeModule.Root.OptionsList", function(OptionsList, AppManager, Backbone, Marionette, $, _){
        
        OptionsList.Controller = {
            
            // To list all the options of root.
            listRootOptions: function(){
                
                if(DEBUG) console.info("home.root.list_controller.listRootOptions()");
                
                // Updates breadcrumb
                AppManager.trigger("breadcrumb:update", null);
                    
                require([
                    "entities/roots"
                ], function(){

                    // Gets all the options items (objects with differents information - CF entities folder)
                    var items = AppManager.request("homeRoot:entities");
                    var optionsList = new View.optionsList({collection: items});
                    
                    // When one of the options is chosen, it triggers the event defined in the item object
                    optionsList.on("itemview:navigate", function(childView, model){
                        var trigger = model.get("navigationTrigger");
                        AppManager.trigger(trigger);
                    });
                    
                    // Displays the view
                    AppManager.contentRegion.show(optionsList);
                });
            }  
        }
    });

    return AppManager.HomeModule.Root.OptionsList.Controller;
});
