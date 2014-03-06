define([
    'app',
    'tpl!common/errors/templates/404.tpl'
], function(AppManager, e404Tpl){
    
    AppManager.module('Common.Errors.View', function(View, AppManager, Backbone, Marionette, $, _){
        
        View.e404 = Marionette.ItemView.extend({
            template: e404Tpl,
        });

    });
    
    return AppManager.Common.Errors.View;
})