define([
    'app',
    'utt.stages',
    'modules/common/user/profile/edit/edit_view'
], function(AppManager, UttStages, View){
  
    // UserModule Edit Controller
    AppManager.module('UserModule.Edit', function(Edit, AppManager, Backbone, Marionette, $, _){
    
        var API = new UttStages.Application(AppManager);
        
        Edit.Controller = {
            
            // To edit a specific user
            editUser: function(_options){

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
                            { name: 'edit', url: 'user/profile/edit', navigationTrigger: 'user:profile:edit' }
                        ];
                        AppManager.trigger('breadcrumb:update', path);

                        var view = new View.User({
                            model: _user,
                            title: _user.get('firstName')+' '+_user.get('lastName')+' : '+polyglot.t('edit'),
                        });

                        view.on('form:submit', function(_data){
                            
                            API.misc.showLoader();
                            
                            if (_user.save(_data)) {
                                AppManager.trigger("offer:show", _options.offerId);
                            }
                            
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
    
    return AppManager.UserModule.Edit.Controller;
});
