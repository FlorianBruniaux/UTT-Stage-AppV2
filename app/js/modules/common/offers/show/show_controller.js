define([
    'app',
    'utt.stages',
    'modules/common/offers/show/show_view'
], function(AppManager, UttStages, View){
  
    // OffersModule Show Controller
    AppManager.module('OffersModule.Show', function(Show, AppManager, Backbone, Marionette, $, _){
    
        var API = new UttStages.Application(AppManager);
        
        Show.Controller = {
            
            // To show a specific offer
            showOffer: function(_options){

                // Displays loader while data is loading
                API.misc.showLoader();
                
                // Gets the offer
                // When the offer is fetched (CF use of defer.promise() )
                var fetchingOffer = AppManager.request('offer:entity', _options.offerId);
                $.when(fetchingOffer).done(function(_offer){

                    if (_offer !== undefined) {
                        
                        _offer.set('userCategory', _options.userCategory);
                        
                        //  To set date format into dd/mm/yyyy
                        _offer.get('validation').date = API.dates.convertToDDMMYYYY(_offer.get('validation').date);
                        _offer.get('provided').date = API.dates.convertToDDMMYYYY(_offer.get('provided').date);
                        
                        // Updates breadcrumb
                        var path = [
                            { name: 'offers.list', url: 'offers/list', navigationTrigger: 'offers:list' },
                            { name: 'n° '+_offer.get('ref'), url: 'offers/'+_offer.get('_id'), navigationTrigger: 'offer:show', options: {offerId: _offer.get('_id')} }
                        ];
                        
                        if (_options.userCategory != 'students') {
                            path.unshift(
                                { name: 'offers', url: 'offers', navigationTrigger: _options.userCategory+':offers:root' }
                            )
                        }
                        
                        AppManager.trigger('breadcrumb:update', path);

                        var view = new View.Offer({
                            model: _offer
                        });
                        
                        
                        //  Students events
                        view.on('students:offer:postulate', function(){
                            console.log('POSTULATE');
                        });
                        
                        view.on('students:offer:favorites', function(){
                            console.log('ADD TO FAVORITES');
                        });
                        
                        
                        //  Internship_managers events
                        view.on('internship_managers:offer:edit', function(){
                            AppManager.trigger('internship_managers:offer:edit',{offerId: _offer.get('_id')})
                        });
                        
                        view.on('internship_managers:offer:provide', function(){
                            AppManager.trigger('internship_managers:offer:provide', {offerId: _offer.get('_id')})
                        });
                        
                        
                        //  Teachers
                        view.on('teachers:offer:deny', function(_msg){
                            $.ajax({
                                url: '/auth/isauth',
                                type: 'GET',
                                success: function(_userLogged) {
                                    
                                    _offer.get('validation').state = 'denied';
                                    _offer.get('validation').by = _userLogged;
                                    _offer.get('validation').msg = _msg;
                                    _offer.get('validation').date = new Date();
                                    
                                    _offer.save();
                                    
                                    AppManager.trigger('offers:validation');
                                    
                                }
                            });
                        });
                        
                        view.on('teachers:offer:validate', function(_msg){
                            $.ajax({
                                url: '/auth/isauth',
                                type: 'GET',
                                success: function(_userLogged) {
                                    
                                    _offer.get('validation').state = 'validated';
                                    _offer.get('validation').by = _userLogged;
                                    _offer.get('validation').msg = _msg;
                                    _offer.get('validation').date = new Date();
                                    
                                    _offer.save();
                                    
                                    AppManager.trigger('offers:validation');
                                }
                            });
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
    
    return AppManager.OffersModule.Show.Controller;
});
