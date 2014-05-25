define([
    'app',
    'utt.stages',
    'common/roots/root_view',
    'socket.io'
], function(AppManager, UttStages, View, io){

    // OffersModule Root Controller
    AppManager.module('OffersModule.Root', function(Root, AppManager, Backbone, Marionette, $, _){
        
        var API = new UttStages.Application(AppManager);
        
        Root.Controller = {
            
            // To list all the options of root.
            listRootOptions: function(){
                
                if(DEBUG) console.info('internship_managers.offers.root.list_controller.listRootOptions()');
                
                // Updates breadcrumb
                var path = [
                    { name: 'offers', url: 'offers', navigationTrigger: 'offers:root' }
                ];
                AppManager.trigger('breadcrumb:update', path);
                    
                require([
                    'entities/internship_managers/roots'
                ], function(){
   
                        // Gets all the options items (objects with differents information - CF entities folder)
                        var items = AppManager.request('internship_managers:offersRoot:entities');
                        var view = new View.optionsList({
                            collection: items
                        });
                        
                        // When one of the options is chosen, it triggers the event defined in the item object
                        view.on('itemview:navigate', function(childView, model){
                            var trigger = model.get('navigationTrigger');
                            AppManager.trigger(trigger);
                        });
                        
                        // When root view is rendered
                        view.on('rendered', function(){
                        
                            //  To update view when a new offer is created
                            socket = io.connect("http://127.0.0.1:8080");
                                
                            var showInfoInInfoBlockBottom = function(){
                                
                                // When all the offers are fetched (CF use of defer.promise() )
                                var fetchingOffers = AppManager.request('offers:entities'),
                                    fetchingUser = AppManager.request('user:entity', $('#user-id').html());
                                    
                                $.when(fetchingOffers, fetchingUser).done(function(_offers, _user){
                                    
                                    var target,
                                        filteredOffers;
                                    
                                    target = $('.info-blocks a[href="#offers/validation"]');
                                    if (target) {
                                        filteredOffers = API.entities.filterCollection(_offers);
                                        filteredOffers.filter('validation.state', '[NOT]validated');
                                        
                                        if (filteredOffers.length > 0) {
                                            target.parent().find('span').html(filteredOffers.length+" offres à contrôler.").removeClass('bg-info').addClass('bg-danger');
                                        }
                                        else{
                                            target.parent().find('span').html('<br />').removeClass('bg-danger').removeClass('bg-success').addClass('bg-info');
                                        }
                                    }
    
                                    target = $('.info-blocks a[href="#offers/list"]');
                                    if (target) {
                                        filteredOffers = API.entities.filterCollection(_offers);
                                        filteredOffers.filter(
                                            ['validation.date', 'validation.state', 'provided.by.firstName'],
                                            ['[Created:after]'+_user.get('penultimateConnexion'), 'validated', '[isEmpty]']
                                        );
                                        
                                        if (filteredOffers.length > 0) {
                                            target.parent().find('span').html(filteredOffers.length+" nouvelle(s) offre(s)").removeClass('bg-info').addClass('bg-success');
                                        }
                                        else{
                                            target.parent().find('span').html('<br />').removeClass('bg-danger').removeClass('bg-success').addClass('bg-info');
                                        }
                                    }
                                    
                                    
                                    target = $('.info-blocks a[href="#offers/list/provided"]');
                                    if (target) {
                                        filteredOffers = API.entities.filterCollection(_offers);
                                        filteredOffers.filter(
                                            ['provided.date', 'validation.state', 'provided.by.firstName'],
                                            ['[Created:after]'+_user.get('penultimateConnexion'), 'validated', '[NOTempty]']
                                        );
                                        
                                        if (filteredOffers.length > 0) {
                                            target.parent().find('span').html(filteredOffers.length+" nouvelle(s) offre(s)").removeClass('bg-info').addClass('bg-success');
                                        }
                                        else{
                                            target.parent().find('span').html('<br />').removeClass('bg-danger').removeClass('bg-success').addClass('bg-info');
                                        }
                                    }
    
                                });
                                
                            }
                            
                            showInfoInInfoBlockBottom();
                            
                            socket.on('update:offers:root:views', function () {
                                setTimeout(function(){
                                    showInfoInInfoBlockBottom();
                                }, 500)
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
