define([
    'app',
    'utt.stages',
    'common/roots/root_view'
], function(AppManager, UttStages, View){

    // OffersModule Root Controller
    AppManager.module('OffersModule.Root', function(Root, AppManager, Backbone, Marionette, $, _){
        
        var API = new UttStages.Application(AppManager);
        
        Root.Controller = {
            
            // To list all the options of root.
            listRootOptions: function(){
                
                if(DEBUG) console.info('teachers.offers.root.list_controller.listRootOptions()');
                
                // Updates breadcrumb
                var path = [
                    { name: 'offers', url: 'offers', navigationTrigger: 'offers:root' }
                ];
                AppManager.trigger('breadcrumb:update', path);
                    
                require([
                    'entities/teachers/roots'
                ], function(){
                    
                    // Gets all the options items (objects with differents information - CF entities folder)
                    var items = AppManager.request('teachers:offersRoot:entities');
                    var view = new View.optionsList({
                        collection: items
                    });
                    
                    // When one of the options is chosen, it triggers the event defined in the item object
                    view.on('itemview:navigate', function(childView, model){
                        var trigger = model.get('navigationTrigger');
                        AppManager.trigger(trigger);
                    });
                    
                    view.on('rendered', function(){


                        // When all the offers are fetched (CF use of defer.promise() )
                        var fetchingOffers = AppManager.request('offers:entities'),
                            fetchingUser = AppManager.request('user:entity', $('#user-id').html());
                        $.when(fetchingOffers, fetchingUser).done(function(_offers, _user){
                            
                            var filteredOffers = API.entities.filterCollection(_offers);
                            filteredOffers.filter('validation.state', '[NOT]validated');
                            if (filteredOffers.length > 0) {
                                $('.info-blocks a[href="#offers/validation"]').parent().find('span').html(filteredOffers.length+" offres à contrôler.").removeClass('bg-info').addClass('bg-danger');
                            }
                            
                            filteredOffers = API.entities.filterCollection(_offers);
                            filteredOffers.filter(['creationDate', 'validation.state'], ['[Created:after]'+_user.get('penultimateConnexion'), 'validated']);
                            if (filteredOffers.length > 0) {
                                $('.info-blocks a[href="#offers/list"]').parent().find('span').html(filteredOffers.length+" nouvelle(s) offre(s)").removeClass('bg-info').addClass('bg-success');
                            }

                            
                        });

                        
                    });
                    
                    
                    // Displays the view
                    AppManager.contentRegion.show(view);
                    
                });
            }  
        }
    });

    return AppManager.OffersModule.Root.Controller;
});
