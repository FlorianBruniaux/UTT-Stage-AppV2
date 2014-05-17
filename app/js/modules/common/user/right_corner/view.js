define([
    'app',
    'tpl!modules/common/user/right_corner/templates/right_corner.tpl'
], function(AppManager, rightCornerTpl){
    
    // Login 
    AppManager.module('UserModule.RightCorner.View', function(View, AppManager, Backbone, Marionette, $, _){
        
        View.rightCorner = Marionette.ItemView.extend({
            template: rightCornerTpl
        });
        
    });

    return AppManager.UserModule.RightCorner.View;
})