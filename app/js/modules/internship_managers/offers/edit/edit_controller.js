define([
    'app',
    'utt.stages',
    'modules/internship_managers/offers/common/view'
], function(AppManager, UttStages, View){
    
    // OffersModule edit Controller
    AppManager.module('OffersModule.Edit', function(Edit, AppManager, Backbone, Marionette, $, _){
        
        var API = new UttStages.Application(AppManager);
        
        Edit.Controller = {
            
            // To edit an offer
            editOffer: function(_options){
                
                if(DEBUG) console.info("internship_managers.offers.edit.edit_controller.editOffer()");
                
                // Displays loader while data is loading
                API.misc.showLoader();

                // Gets the offer
                // When the offer is fetched (CF use of defer.promise() )
                var fetchingOffer = AppManager.request('offer:entity', _options.offerId),
                    fetchingCompanies = AppManager.request('companies:entities');
                $.when(fetchingOffer,fetchingCompanies).done(function(_offer, _companies){
                    
                    if (_offer !== undefined) {
                        
                        var path = [
                            { name: 'offers', url: 'offers', navigationTrigger: 'internship_managers:offers:root' },
                            { name: 'offers.list', url: 'offers/list', navigationTrigger: 'offers:list' },
                            { name: 'Edit n° '+_offer.get('ref'), url: 'offers/'+_offer.get('_id'), navigationTrigger: 'offer:show', options: {offerId: _offer.get('_id')} }
                        ];
                        AppManager.trigger('breadcrumb:update', path);
                        
                        var comp= {};
                        _companies.each(function(_company){
                            comp[_company.get('cname')] = _company;
                        });
                        
                        var view = new View.Form({
                            model: _offer,
                            title: polyglot.t('offer.edit'),
                            companies: comp
                        });
                        
                        view.on('form:submit', function(_data){
                            
                            API.misc.showLoader();
                            
                            if (_data.company && _data.company != '') {
                                _data.company = comp[_data.company];
                            }
                            
                            _offer.lastModifDate = new Date();
                            
                            if (_offer.save(_data)) {
                                AppManager.trigger("offer:show", _options);
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
    
    return AppManager.OffersModule.Edit.Controller;
})