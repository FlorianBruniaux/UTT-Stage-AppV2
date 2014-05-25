define([
    'app',
    'utt.stages',
    'modules/internship_managers/offers/common/view',
    'socket.io'
], function(AppManager, UttStages, View, io){
    
    // OffersModule new Controller
    AppManager.module('OffersModule.New', function(New, AppManager, Backbone, Marionette, $, _){
        
        var API = new UttStages.Application(AppManager);
        
        New.Controller = {
            
            // To add a new user
            addNewOffer: function(){
                
                if(DEBUG) console.info("internship_managers.offers.new.new_controller.addNewOffer()");
                
                // Displays loader while data is loading
                API.misc.showLoader();
                
                // Updates breadcrumb
                var path = [
                    { name: 'offers', url: 'offers', navigationTrigger: 'internship_managers:offers:root' },
                    { name: 'offer.new', url: 'offers/new', navigationTrigger: 'internship_managers:offer:new' }
                ];
                AppManager.trigger('breadcrumb:update', path);

                // Gets a new user model (CF entities folder)
                var newOffer = AppManager.request('offer:entity:new');
                
                // Gets all the companies (CF entities folder)
                // When all the offers are fetched (CF use of defer.promise() )
                var fetchingCompanies = AppManager.request('companies:entities');
                $.when(fetchingCompanies).done(function(_companies){
                
                    var comp= {};
                    _companies.each(function(_company){
                        comp[_company.get('cname')] = _company;
                    });
                    
                    var view = new View.Form({
                        model: newOffer,
                        title: polyglot.t('offer.new'),
                        companies: comp
                    });
                    
                    view.on('form:submit', function(_data){
                        
                        API.misc.showLoader();
                        
                        if (_data.company && _data.company != '') {
                            _data.company = comp[_data.company];
                        }

                        _data.creationDate = new Date();
                        
                        if (newOffer.save(_data)) {
                            
                            //  To inform listeners
                            var socket = io.connect("http://127.0.0.1:8080");
                            socket.emit('offer:new');
                            
                            AppManager.trigger('offers:validation');
                        }
                        
                    });
                    
                    AppManager.contentRegion.show(view);
                
                });
                    
                
            }
        }; 
    });
    
    return AppManager.OffersModule.New.Controller;
})