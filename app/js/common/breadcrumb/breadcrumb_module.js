define([
    'app',
    'common/breadcrumb/list/list_controller'
], function(AppManager, ListController){

    AppManager.module('BreadcrumbModule', function(Breadcrumb, AppManager, Backbone, Marionette, $, _){

        var API = {
            updateBreadcrumb: function(_path){
                ListController.updateBreadcrumb(_path);
            }
        };

        AppManager.on('breadcrumb:update',function(_path){
            if(DEBUG) console.info("common.breadcrumb.breadcrumb_module.update("+_path+")")
            API.updateBreadcrumb(_path);
        });

    });

    return AppManager.BreadcrumbModule;

})