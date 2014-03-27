define([
    'app',
    'tpl!modules/common/login/templates/login.tpl',
    'tpl!modules/common/login/templates/sign_on.tpl',
    'tpl!modules/common/login/templates/forgot_password.tpl'
], function(AppManager, loginTpl, signOnTpl, forgotPasswordTpl){
    
    // Login 
    AppManager.module('Common.Login.View', function(View, AppManager, Backbone, Marionette, $, _){
        
        View.signOn = Marionette.ItemView.extend({
            template: signOnTpl
        });
        
        View.forgotPassword = Marionette.ItemView.extend({
            template: forgotPasswordTpl
        });
        
        View.login = Marionette.ItemView.extend({
            template: loginTpl,
            
            events: {
                'click a.js-sign-on': 'signOnClicked',
                'click a.js-forgot-password': 'forgotPasswordClicked'
            },
            
            signOnClicked: function(e){
                e.preventDefault();
                this.trigger('login:signOn');
            },
            
            forgotPasswordClicked: function(e){
                e.preventDefault();
                this.trigger('login:forgotPassword');
            }
        });
        
    });

    return AppManager.Common.Login.View;
})