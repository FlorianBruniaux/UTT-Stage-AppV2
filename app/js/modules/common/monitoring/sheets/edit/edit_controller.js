define([
    'app',
    'utt.stages',
    'modules/common/monitoring/sheets/edit/edit_view'
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
                var fetchingMonitoring = AppManager.request('monitoring:entity', _options.monitoringId),
                    fetchingUsers = AppManager.request('users:entities');
                    
                $.when(fetchingMonitoring, fetchingUsers).done(function(_monitoring, _users){
                    
                    if (_monitoring !== undefined) {
                        
                        // Updates breadcrumb
                        var path = [
                            { name: 'monitoring', url: 'monitoring', navigationTrigger: 'internship_managers:monitoring:root' },
                            { name: 'monitoring.edit', url: 'monitoring/'+_monitoring.get('_id')+'/edit', navigationTrigger: 'internship_managers:monitoring:edit', options: {monitoringId: _monitoring.get('_id')} },
                            { name: 'monitoring.sheet.edit', url: 'monitoring/'+_monitoring.get('_id')+'/edit/'+_options.sheet, navigationTrigger: 'internship_managers:monitoring:edit:sheet', options: {monitoringId: _monitoring.get('_id'), sheet:_options.sheet} }
                        ];
                        AppManager.trigger('breadcrumb:update', path);

                        var filteredUsers = API.entities.filterCollection(_users);
                        filteredUsers.filter('userCategory', 'teachers');
                        
                        var teach = {};
                        filteredUsers.each(function(_teacher){
                            teach[_teacher.get('firstName')+' '+_teacher.get('lastName')] = _teacher;
                        });
                        
                        var view = new View[_options.sheet]({
                            model: _monitoring,
                            title: polyglot.t('monitoring.edit'),
                            teachers: teach
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