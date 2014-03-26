define([
    'app',
    'tpl!modules/common/login/templates/login.tpl'
], function(AppManager, loginTpl){
    
    // Login 
    AppManager.module('Common.Login.View', function(View, AppManager, Backbone, Marionette, $, _){
        
        View.login = Marionette.CompositeView.extend({
            template: loginTpl
        });
        
    });

    return AppManager.Common.Login.View;
})