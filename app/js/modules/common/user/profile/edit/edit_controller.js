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
                            { name: 'profile', url: 'user/profile', navigationTrigger: 'user:profile:show' },
                            { name: 'edit', url: 'user/profile/edit', navigationTrigger: 'user:profile:edit' }
                        ];
                        AppManager.trigger('breadcrumb:update', path);

                        var view = new View.User({
                            model: _user,
                            title: _user.get('firstName')+' '+_user.get('lastName')+' : '+polyglot.t('edit'),
                        });

                        view.on('image:upload', function(_title, _base64Data){
                            $.ajax({
                                url: "/upload/image/base64",
                                type: "POST",
                                data: JSON.stringify({
                                    folder: 'photos/users',
                                    title: _title,
                                    base64Data : _base64Data
                                }),
                                dataType: "json",
                                contentType: "application/json",
                                complete: function(res) {
                                    console.log(res.responseText);
                                }
                            });
                        });
                        
                        view.on('form:submit', function(_data){
                            
                            API.misc.showLoader();
                            
                            if (_user.save(_data)) {
                                AppManager.trigger("user:profile:show");
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
