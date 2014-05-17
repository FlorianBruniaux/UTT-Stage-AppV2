define([
    'app',
    'tpl!modules/common/user/profile/show/templates/user_details.tpl'
], function(AppManager, userDetailsTpl, Bootbox){
    
    // UsersModule Show View
    AppManager.module('UsersModule.Show.View', function(View, AppManager, Backbone, Marionette, $, _){
        
        View.User = Marionette.ItemView.extend({
            template: userDetailsTpl,
            onRender: function(){

            },
            events: {
                //  Internship managers
                'click .js-modify': 'modifyClicked',
            },
            
            //  Internship_managers -> to modify the user
            modifyClicked: function(_e){
                
                _e.preventDefault();
                this.trigger('user:profile:edit');
                
            }

        });
        
    });
    
    return AppManager.UsersModule.Show.View;
})