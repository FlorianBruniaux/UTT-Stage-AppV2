define([
    'app',
    'tpl!common/user/right_corner/templates/right_corner.tpl'
], function(AppManager, rightCornerTpl){
    
    // Login 
    AppManager.module('Common.User.RightCorner.View', function(View, AppManager, Backbone, Marionette, $, _){
        
        View.rightCorner = Marionette.ItemView.extend({
            template: rightCornerTpl
        });
        
    });

    return AppManager.Common.User.RightCorner.View;
})