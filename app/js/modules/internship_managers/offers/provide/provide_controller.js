define([
    'app',
    'utt.stages',
    'modules/internship_managers/offers/provide/provide_view'
], function(AppManager, UttStages, View){
    
    // OffersModule provide Controller
    AppManager.module('OffersModule.Provide', function(Provide, AppManager, Backbone, Marionette, $, _){
        
        var API = new UttStages.Application(AppManager);
        
        Provide.Controller = {
            
            // To provide an offer
            provideOffer: function(_options){
                
                if(DEBUG) console.info("internship_managers.offers.provide.provide_controller.provideOffer()");
                
                // Displays loader while data is loading
                API.misc.showLoader();
                
                // Updates breadcrumb
                var path = [
                    { name: 'offers', url: 'offers', navigationTrigger: 'internship_managers:offers:root' },
                    { name: 'offer.provide', url: 'offers/provide', navigationTrigger: 'internship_managers:offer:provide' }
                ];
                AppManager.trigger('breadcrumb:update', path);

                // Gets the offer
                // When the offer is fetched (CF use of defer.promise() )
                var fetchingOffer = AppManager.request('offer:entity', _options.offerId),
                    fetchingUsers = AppManager.request('users:entities');
                    
                $.when(fetchingOffer,fetchingUsers).done(function(_offer, _users){
                    
                    if (_offer !== undefined) {

                        var filteredUsers = API.entities.filterCollection(_users);
                        filteredUsers.filter('userCategory', 'students');
                        
                        var stud = {};
                        filteredUsers.each(function(_student){
                            stud[_student.get('firstName')+' '+_student.get('lastName')] = _student;
                        });
                        
                        var view = new View.Form({
                            model: _offer,
                            title: polyglot.t('offer.provide'),
                            students: stud
                        });
                        
                        view.on('form:submit', function(_data){
                            
                            API.misc.showLoader();
                            
                            _data.provided = {};
                            _data.provided.by = stud[_data.student];
                            _data.provided.date = new Date();
                            
                            if (_offer.save(_data)) {
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
        }; 
    });
    
    return AppManager.OffersModule.Provide.Controller;
})