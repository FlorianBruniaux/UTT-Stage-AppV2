define([
    "app",
    "modules/common/login/login_view"
], function(AppManager, View){

    // Common Root Login Controller
    AppManager.module("Common.Login", function(Login, AppManager, Backbone, Marionette, $, _){
        
        Login.Controller = {
            
            // To list all the options of root.
            showLogin: function(){
                
                if(DEBUG) console.info("common.login.showLogin()");

                var view = new View.login();
                
                view.on("login:signOn", function(){
                    AppManager.mainlayoutRegion.show(new View.signOn());
                });
                
                view.on("login:forgotPassword", function(){
                    AppManager.mainlayoutRegion.show(new View.forgotPassword());
                });
                
                // Displays the view
                AppManager.mainlayoutRegion.show(view);
                
            }  
        }
    });

    return AppManager.Common.Login.Controller;
});
