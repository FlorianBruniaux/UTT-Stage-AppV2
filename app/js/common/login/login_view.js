define([
    'app',
    'utt.stages',
    'tpl!common/login/templates/login.tpl',
    'tpl!common/login/templates/sign_on.tpl',
    'tpl!common/login/templates/forgot_password.tpl'
], function(AppManager, UttStages, loginTpl, signOnTpl, forgotPasswordTpl){
    
    // Login 
    AppManager.module('Common.Login.View', function(View, AppManager, Backbone, Marionette, $, _){
        
        var API = new UttStages.Application(AppManager);
        
        //  Sign on view
        View.signOn = Marionette.ItemView.extend({
            template: signOnTpl,
            onRender: function(){
                API.views.forms.checkBeforeSubmit('#sign-on-form');
            },
        });
        
        //  Forgot password view
        View.forgotPassword = Marionette.ItemView.extend({
            template: forgotPasswordTpl,
            onRender: function(){
                API.views.forms.checkBeforeSubmit('#forgot-password-form');
            },
        });
        
        //  Login view
        View.login = Marionette.ItemView.extend({
            template: loginTpl,
            onRender: function(){
                API.views.forms.checkBeforeSubmit('#login-form');
            },
            
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