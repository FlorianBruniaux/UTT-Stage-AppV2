define([
    'app',
    'utt.stages',
    'modules/internship_managers/monitoring/common/view'
], function(AppManager, UttStages, View){
    
    // MonitoringModule edit Controller
    AppManager.module('MonitoringModule.Edit', function(Edit, AppManager, Backbone, Marionette, $, _){
        
        var API = new UttStages.Application(AppManager);
        
        Edit.Controller = {
            
            // To edit an monitoring
            editMonitoring: function(_options){
                
                if(DEBUG) console.info("internship_managers.monitoring.edit.edit_controller.editMonitoring()");
                
                // Displays loader while data is loading
                API.misc.showLoader();
                
                // Gets the monitoring
                // When the monitoring is fetched (CF use of defer.promise() )
                var fetchingMonitoring = AppManager.request('monitoring:entity', _options.monitoringId);
                $.when(fetchingMonitoring).done(function(_monitoring){
                    
                    if (_monitoring !== undefined) {
                        
                        // Updates breadcrumb
                        var path = [
                            { name: 'monitoring', url: 'monitoring', navigationTrigger: 'internship_managers:monitoring:root' },
                            { name: 'monitoring.edit', url: 'monitoring/'+_monitoring.get('_id')+'/edit', navigationTrigger: 'internship_managers:monitoring:edit', options: {monitoringId: _monitoring.get('_id')} }
                        ];
                        AppManager.trigger('breadcrumb:update', path);
                
                        var view = new View.Form({
                            model: _monitoring,
                            title: polyglot.t('monitoring.edit')
                        });
                        
                        view.on('form:submit', function(_data){
                            
                            API.misc.showLoader();

                            if (_monitoring.save(_data)) {
                                AppManager.trigger("monitoring:show", _options);
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
    
    return AppManager.MonitoringModule.Edit.Controller;
})