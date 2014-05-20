define([
    'app',
    'utt.stages',
    'modules/internship_managers/monitoring/common/view'
], function(AppManager, UttStages, View){
    
    // MonitoringModule new Controller
    AppManager.module('MonitoringModule.New', function(New, AppManager, Backbone, Marionette, $, _){
        
       var API = new UttStages.Application(AppManager);
        
        New.Controller = {
            
            // To add a new user
            addNewMonitoring: function(){
                
                if(DEBUG) console.info("internship_managers.monitoring.new.new_controller.addNewMonitoring()");
                
                // Displays loader while data is loading
                API.misc.showLoader();
                
                // Updates breadcrumb
                var path = [
                    { name: 'monitoring', url: 'monitoring', navigationTrigger: 'internship_managers:monitoring:root' },
                    { name: 'monitoring.new', url: 'monitoring/new', navigationTrigger: 'internship_managers:monitoring:new' }
                ];
                AppManager.trigger('breadcrumb:update', path);

                // Gets a new user model (CF entities folder)
                var newMonitoring = AppManager.request('monitoring:entity:new');
                
                // Gets the monitoring
                // When the monitoring is fetched (CF use of defer.promise() )
                var fetchingOffers = AppManager.request('offers:entities');
                $.when(fetchingOffers).done(function(_offers){
                    
                    var filteredOffers = API.entities.filterCollection(_offers);
                        filteredOffers.filter(['provided.by.firstName','alreadyMonitored'], ['[NOTempty]','no']);
                        
                    var off = {};
                    filteredOffers.each(function(_offer){
                        off[_offer.get('title') +' - '+ _offer.get('provided').by.firstName+' '+_offer.get('provided').by.lastName] = _offer;
                    });
                        
                    var view = new View.Form({
                        model: newMonitoring,
                        offers: off,
                        title: polyglot.t('monitoring.new')
                    });
                    
                    view.on('form:submit', function(_data){
                        
                        API.misc.showLoader();
                        
                        _data.offer = off[_data.offer];
                        
                        var fetchingOffer = AppManager.request('offer:entity', _data.offer.get('_id'));
                        $.when(fetchingOffer).done(function(_offer){

                            _offer.set('alreadyMonitored','yes');
                            
                            if (_offer.save() && newMonitoring.save(_data)) {
                                AppManager.trigger("internship_managers:monitoring:list");
                            }
                            
                        });
                        
                    });
                    
                    AppManager.contentRegion.show(view);
                    
                });
            }
        }; 
    });
    
    return AppManager.MonitoringModule.New.Controller;
})