define([
    'app',
    'common/breadcrumb/list/list_view'
], function(AppManager,View){
    
    AppManager.module('BreadcrumbModule.List', function(List, AppManager, Backbone, Marionette, $, _){
        
        List.Controller = {

            updateBreadcrumb: function(_path){
                
                if(DEBUG) console.info("common.breadcrumb.list.list_controller.updateBreadcrumb()")

                require([
                    'entities/common/breadcrumb'
                ], function(){
                    
                    var items = AppManager.request('breadcrumb:entities', _path);
                    var breadcrumb = new View.Breadcrumb({collection: items});

                    breadcrumb.on('itemview:navigate', function(_childView, _model){
                        var trigger = _model.get('navigationTrigger');
                        
                        if(_model.get('options')){
                            AppManager.trigger(trigger, _model.get('options'));
                        }else{
                            AppManager.trigger(trigger);
                        }
                    });

                    AppManager.breadcrumbRegion.show(breadcrumb);
                });
            }
        };
    });

    return AppManager.BreadcrumbModule.List.Controller;
});