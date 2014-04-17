define([
    'app',
    'tpl!common/errors/templates/404.tpl',
    'tpl!common/errors/templates/500.tpl'
], function(AppManager, e404Tpl, e500Tpl){
    
    AppManager.module('Common.Errors.View', function(View, AppManager, Backbone, Marionette, $, _){
        
        View.e404 = Marionette.ItemView.extend({
            template: e404Tpl,
        });
        
        View.e500 = Marionette.ItemView.extend({
            template: e500Tpl,
        });

    });
    
    return AppManager.Common.Errors.View;
})