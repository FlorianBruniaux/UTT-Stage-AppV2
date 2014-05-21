define([
    'app',
    'utt.stages',
    'modules/students/monitoring/show/show_view'
], function(AppManager, UttStages, View){
  
    // MonitoringModule Show Controller
    AppManager.module('MonitoringModule.Show', function(Show, AppManager, Backbone, Marionette, $, _){
    
        var API = new UttStages.Application(AppManager);
        
        Show.Controller = {
            
            // To show a specific monitoring
            showMonitoring: function(_options){

                // Displays loader while data is loading
                API.misc.showLoader();
                
                var fetchingMonitorings = AppManager.request('monitoring:entities');
                $.when(fetchingMonitorings).done(function(_monitorings){
                
                    if (_monitorings.length != 0){
                        
                        var filteredMonitorings = API.entities.filterCollection(_monitorings);
                        filteredMonitorings.filter('offer.provided.by._id', $('#user-id').val());
                        
                        if (filteredMonitorings.length != 0) {
                            // Gets the monitoring
                            // When the monitoring is fetched (CF use of defer.promise() )
                            var fetchingMonitoring = AppManager.request('monitoring:entity', filteredMonitorings.models[0].get('_id'));
                            $.when(fetchingMonitoring).done(function(_monitoring){
            
                                if (_monitoring !== undefined) {
                                    
                                    var path = [
                                        { name: _monitoring.get('offer').provided.by.firstName +' '+ _monitoring.get('offer').provided.by.lastName, url: 'monitoring', navigationTrigger: 'monitoring:show'}
                                    ];
                                    AppManager.trigger('breadcrumb:update', path);
            
                                    var view = new View.Monitoring({
                                        model: _monitoring
                                    });
                                   
                                    AppManager.contentRegion.show(view);
                                    
                                }
                                else{
                                    API.errors.e404();
                                }
                            });
                        }
            
                    }
                    else{
                        API.errors.e404();
                    }
                    
                    
                });
            } 
        }
    });
    
    return AppManager.MonitoringModule.Show.Controller;
});
