define([
    'app',
    'utt.stages',
    'modules/common/offers/show/show_view',
    'socket.io'
], function(AppManager, UttStages, View, io){
  
    // OffersModule Show Controller
    AppManager.module('OffersModule.Show', function(Show, AppManager, Backbone, Marionette, $, _){
    
        var API = new UttStages.Application(AppManager);
        
        Show.Controller = {
            
            // To show a specific offer
            showOffer: function(_options){

                if(DEBUG) console.info('modules/common/offers/show/show_controller.js -> showOffer()');
                
                // Displays loader while data is loading
                API.misc.showLoader();
                
                // Gets the offer
                // When the offer is fetched (CF use of defer.promise() )
                var fetchingOffer = AppManager.request('offer:entity', _options.offerId),
                    fetchingUser = AppManager.request('user:entity', $('#user-id').html());
                    
                $.when(fetchingOffer, fetchingUser).done(function(_offer, _user){

                    if (_offer !== undefined) {
                        
                        //  To inform listeners
                        var socket = io.connect("http://127.0.0.1:8080");
                        
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
                        

                        
                        if ( _user.get('favorites') ) {
                            var favoritesIds = _user.get('favorites');

                            if (_.indexOf(favoritesIds, _offer.get('_id')) > -1) {
                                _offer.set('isUserFavorite', true);
                            }
                            else{
                                _offer.set('isUserFavorite', false);
                            }
                        }
                        
                    
                        var view = new View.Offer({
                            model: _offer
                        });
                        
                        
                        //  Students events
                        view.on('students:offer:postulate', function(){
                            
                            //  FEATURE n°XX
                            alert('An email will be sent to the company');
                            
                        });
                        
                        view.on('students:offer:favorites', function(){
                            
                            var fetchingUser = AppManager.request('user:entity', $('#user-id').html());
                            $.when(fetchingUser).done(function(_user){
                                
                                var favorites = _user.get('favorites');
                                favorites.push(_offer.get('_id'));
                                _user.set('favorites', favorites);
                                
                                _user.save();
                                
                                AppManager.trigger('offer:show', {offerId: _offer.get('_id')});
                            });
                            
                        });
                        
                        view.on('students:offer:favorites:delete', function(){
                            
                            var fetchingUser = AppManager.request('user:entity', $('#user-id').html());
                            $.when(fetchingUser).done(function(_user){
                                
                                var favorites = _user.get('favorites');
                                favorites = _.without(favorites, _offer.get('_id'));
                                _user.set('favorites', favorites);
                                
                                _user.save();
                                
                                AppManager.trigger('offer:show', {offerId: _offer.get('_id')});
                                
                            });
                            
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
                            
                            var fetchingUser = AppManager.request('user:entity', $('#user-id').html());
                            $.when(fetchingUser).done(function(_user){
                                
                                _offer.get('validation').state = 'denied';
                                _offer.get('validation').by = _user.attributes;
                                _offer.get('validation').msg = _msg;
                                _offer.get('validation').date = new Date();
                                
                                _offer.save();
                                
                                socket.emit('offer:state:changed', {});
                                
                                AppManager.trigger('offers:validation');
                            });
                                
                        });
                        
                        view.on('teachers:offer:validate', function(_msg){
                            
                            var fetchingUser = AppManager.request('user:entity', $('#user-id').html());
                            $.when(fetchingUser).done(function(_user){
                                    
                                _offer.get('validation').state = 'validated';
                                _offer.get('validation').by = _user.attributes;
                                _offer.get('validation').msg = _msg;
                                _offer.get('validation').date = new Date();
                                
                                _offer.save();
                                
                                socket.emit('offer:state:changed', {});
                                
                                AppManager.trigger('offers:validation');
                                
                            });
                            
                        });
                        
                        AppManager.contentRegion.show(view);
                        
                    }
                    else{
                        AppManager.trigger('breadcrumb:update', []);
                        API.errors.e404();
                    }
                }); 
            } 
        }
    });
    
    return AppManager.OffersModule.Show.Controller;
});
