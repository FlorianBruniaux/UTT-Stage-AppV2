define([
    'app',
    'utt.stages',
    'modules/internship_managers/offers/provide/provide_view',
    'socket.io'
], function(AppManager, UttStages, View, io){
    
    // OffersModule provide Controller
    AppManager.module('OffersModule.Provide', function(Provide, AppManager, Backbone, Marionette, $, _){
        
        var API = new UttStages.Application(AppManager);
        
        Provide.Controller = {
            
            // To provide an offer
            provideOffer: function(_options){
                
                if(DEBUG) console.info("internship_managers.offers.provide.provide_controller.provideOffer()");
                
                // Displays loader while data is loading
                API.misc.showLoader();

                // Gets the offer
                // When the offer is fetched (CF use of defer.promise() )
                var fetchingOffer = AppManager.request('offer:entity', _options.offerId),
                    fetchingUsers = AppManager.request('users:entities');
                    
                $.when(fetchingOffer,fetchingUsers).done(function(_offer, _users){
                    
                    if (_offer !== undefined) {
 
                        // Updates breadcrumb
                        var path = [
                            { name: 'offers', url: 'offers', navigationTrigger: 'internship_managers:offers:root' },
                            { name: 'offer.provide', url: 'offers/'+_offer.get('_id')+'/provide', navigationTrigger: 'internship_managers:offer:provide', options: {offerId: _offer.get('_id')} }
                        ];
                        AppManager.trigger('breadcrumb:update', path);
                
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
                                
                                //  To inform listeners
                                var socket = io.connect("http://127.0.0.1:8080");
                                socket.emit('offer:provided');
                                
                                AppManager.trigger("offer:show", {offerId: _offer.get('_id')});
                            }
                            
                        });
                        
                        AppManager.contentRegion.show(view);

                    }
                    else{
                        AppManager.trigger('breadcrumb:update', []);
                        API.errors.e404();
                    }
                    
                });
                
                
            }
        }; 
    });
    
    return AppManager.OffersModule.Provide.Controller;
})