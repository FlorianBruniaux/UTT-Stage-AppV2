define([
    'app',
    'utt.stages',
    'modules/common/user/profile/show/show_view'
], function(AppManager, UttStages, View){
  
    // UserModule Show Controller
    AppManager.module('UserModule.Show', function(Show, AppManager, Backbone, Marionette, $, _){
    
        var API = new UttStages.Application(AppManager);
        
        Show.Controller = {
            
            // To show a specific user
            showUser: function(_options){

                // Displays loader while data is loading
                API.misc.showLoader();
                
                var id = $('#user-id').html();

                // Gets the user
                // When the user is fetched (CF use of defer.promise() )
                var fetchingUser = AppManager.request('user:entity', id);
                $.when(fetchingUser).done(function(_user){

                    if (_user !== undefined) {
  
                        // Updates breadcrumb
                        var path = [
                            { name: 'profile', url: 'user/profile', navigationTrigger: 'user:profile' }, 
                        ];
                        AppManager.trigger('breadcrumb:update', path);

                        var view = new View.User({
                            model: _user
                        });
                        
                        //  Internship_managers events
                        view.on('user:profile:edit', function(){
                            AppManager.trigger('user:profile:edit', _user.get('_id'))
                        });
                        
                        AppManager.contentRegion.show(view);
                        
                    }
                    else{
                        API.errors.e404();
                    }
                });
                
            } 
        }
    });
    
    return AppManager.UserModule.Show.Controller;
});
