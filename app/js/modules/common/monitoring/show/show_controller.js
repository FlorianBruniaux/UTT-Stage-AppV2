define([
    'app',
    'utt.stages',
    'modules/common/monitoring/show/show_view'
], function(AppManager, UttStages, View){
  
    // MonitoringModule Show Controller
    AppManager.module('MonitoringModule.Show', function(Show, AppManager, Backbone, Marionette, $, _){
    
        var API = new UttStages.Application(AppManager);
        
        Show.Controller = {
            
            // To show a specific monitoring
            showMonitoring: function(_options){

                if(DEBUG) console.info('modules/common/monitoring/show/show_controller.js -> showMonitoring()');
                
                // Displays loader while data is loading
                API.misc.showLoader();
                
                // Gets the monitoring
                // When the monitoring is fetched (CF use of defer.promise() )
                var fetchingMonitoring = AppManager.request('monitoring:entity', _options.monitoringId);
                $.when(fetchingMonitoring).done(function(_monitoring){

                    if (_monitoring !== undefined) {
                        
                        _monitoring.set('userCategory', _options.userCategory);
                        
                        var path = [];
                        switch(_options.userCategory){
                            case 'internship_managers':
                                path.push(
                                    { name: 'monitoring', url: 'monitoring', navigationTrigger: 'internship_managers:monitoring:root' },
                                    { name: 'monitoring.list', url: 'monitoring/list', navigationTrigger: 'internship_managers:monitoring:list' },
                                    { name: _monitoring.get('offer').provided.by.firstName +' '+ _monitoring.get('offer').provided.by.lastName, url: 'monitoring/'+_monitoring.get('_id'), navigationTrigger: 'monitoring:show', options: {monitoringId: _monitoring.get('_id')} }
                                )
                                break;
                            
                            case 'teachers':
                                path.push(
                                    { name: 'monitoring.list', url: 'monitoring/list', navigationTrigger: 'teachers:monitoring:list' },
                                    { name: _monitoring.get('offer').provided.by.firstName +' '+ _monitoring.get('offer').provided.by.lastName, url: 'monitoring/'+_monitoring.get('_id'), navigationTrigger: 'monitoring:show', options: {monitoringId: _monitoring.get('_id')} }
                                )
                                break;
                        }
                        AppManager.trigger('breadcrumb:update', path);

                        var view = new View.Monitoring({
                            model: _monitoring
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
    
    return AppManager.MonitoringModule.Show.Controller;
});
