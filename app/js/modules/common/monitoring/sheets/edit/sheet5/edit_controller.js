define([
    'app',
    'utt.stages',
    'modules/common/monitoring/sheets/edit/sheet5/edit_view'
], function(AppManager, UttStages, View){
    
    // MonitoringModule edit Controller
    AppManager.module('MonitoringModule.Sheets.Edit', function(Edit, AppManager, Backbone, Marionette, $, _){
        
        var API = new UttStages.Application(AppManager);
        
        Edit.Controller = {
            
            // To edit an monitoring
            editSheet: function(_options){
                
                if(DEBUG) console.info("internship_managers.monitoring.edit.edit_controller.editSheet()");
                
                // Displays loader while data is loading
                API.misc.showLoader();
                
                // Gets the monitoring
                // When the monitoring is fetched (CF use of defer.promise() )
                var fetchingMonitoring = AppManager.request('monitoring:entity', _options.monitoringId);
                    
                $.when(fetchingMonitoring).done(function(_monitoring){
                    
                    if (_monitoring !== undefined) {
                        
                        var path = [];
                        switch (_options.userCategory) {
                            case 'students':
                                path.push(
                                    { name: 'monitoring.show', url: 'monitoring', navigationTrigger: 'students:monitoring:show'},
                                    { name: 'monitoring.sheet.edit.sheet5', url: 'monitoring/sheet5/edit', navigationTrigger: 'students:monitoring:edit:sheet', options: {sheet:'sheet5'} }
                                )
                                break;
                            
                            case 'teachers':
                                path.push(
                                    { name: 'monitoring.list', url: 'monitoring/list', navigationTrigger: 'teachers:monitoring:list'},
                                    { name: 'monitoring.show', url: 'monitoring/'+_monitoring.get('_id'), navigationTrigger: 'teachers:monitoring:show', options: {monitoringId: _monitoring.get('_id')} },
                                    { name: 'monitoring.sheet.edit.sheet5', url: 'monitoring/'+_monitoring.get('_id')+'/edit/sheet5', navigationTrigger: 'teachers:monitoring:edit:sheet', options: {monitoringId: _monitoring.get('_id'), sheet:'sheet5'} }
                                )
                                break;
                            
                            case 'internship_managers':
                                path.push(
                                    { name: 'monitoring', url: 'monitoring', navigationTrigger: 'internship_managers:monitoring:root' },
                                    { name: 'monitoring.list', url: 'monitoring/list', navigationTrigger: 'internship_managers:monitoring:list'},
                                    { name: 'monitoring.show', url: 'monitoring/'+_monitoring.get('_id'), navigationTrigger: 'internship_managers:monitoring:show', options: {monitoringId: _monitoring.get('_id')} },
                                    { name: 'monitoring.sheet.edit.sheet5', url: 'monitoring/'+_monitoring.get('_id')+'/edit/sheet5', navigationTrigger: 'internship_managers:monitoring:edit:sheet', options: {monitoringId: _monitoring.get('_id'), sheet:'sheet5'} }
                                )
                                break;
                        }
                        AppManager.trigger('breadcrumb:update', path);

                        var view = new View.sheet5({
                            model: _monitoring,
                            title: polyglot.t('monitoring.edit')+' - '+ _monitoring.get('sheets').sheet5.name
                        });
                        
                        view.on('form:submit', function(_data){
                            
                            API.misc.showLoader();

                            if (_monitoring.save(_data)) {
                                AppManager.trigger("monitoring:show", _options.monitoringId);
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
    
    return AppManager.MonitoringModule.Sheets.Edit.Controller;
})