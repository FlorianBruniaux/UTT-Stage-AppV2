define([
    'app',
    'utt.stages',
    'modules/common/monitoring/sheets/edit/sheet4/edit_view'
], function(AppManager, UttStages, View){
    
    // MonitoringModule edit Controller
    AppManager.module('MonitoringModule.Sheets.Edit', function(Edit, AppManager, Backbone, Marionette, $, _){
        
        var API = new UttStages.Application(AppManager);
        
        Edit.Controller = {
            
            // To edit an monitoring
            editSheet: function(_options){
                
                if(DEBUG) console.info('modules/common/monitoring/sheets/edit/sheet4/edit_controller.js -> editSheet()');
                
                // Displays loader while data is loading
                API.misc.showLoader();
                
                // Gets the monitoring
                // When the monitoring is fetched (CF use of defer.promise() )
                var fetchingMonitoring = AppManager.request('monitoring:entity', _options.monitoringId);
                    
                $.when(fetchingMonitoring).done(function(_monitoring){
                    
                    if (_monitoring !== undefined && _options.userCategory != 'students') {
                        
                        var path = [];
                        switch (_options.userCategory) {
                            case 'teachers':
                                path.push(
                                    { name: 'monitoring.list', url: 'monitoring/list', navigationTrigger: 'teachers:monitoring:list'},
                                    { name: _monitoring.get('offer').provided.by.firstName +' '+ _monitoring.get('offer').provided.by.lastName, url: 'monitoring/'+_monitoring.get('_id'), navigationTrigger: 'teachers:monitoring:show', options: {monitoringId: _monitoring.get('_id')} },
                                    { name: 'monitoring.sheets.sheet4.name', url: 'monitoring/'+_monitoring.get('_id')+'/edit/sheet4', navigationTrigger: 'teachers:monitoring:edit:sheet', options: {monitoringId: _monitoring.get('_id'), sheet:'sheet4'} }
                                )
                                break;
                            
                            case 'internship_managers':
                                path.push(
                                    { name: 'monitoring', url: 'monitoring', navigationTrigger: 'internship_managers:monitoring:root' },
                                    { name: 'monitoring.list', url: 'monitoring/list', navigationTrigger: 'internship_managers:monitoring:list'},
                                    { name: _monitoring.get('offer').provided.by.firstName +' '+ _monitoring.get('offer').provided.by.lastName, url: 'monitoring/'+_monitoring.get('_id'), navigationTrigger: 'internship_managers:monitoring:show', options: {monitoringId: _monitoring.get('_id')} },
                                    { name: 'monitoring.sheets.sheet4.name', url: 'monitoring/'+_monitoring.get('_id')+'/edit/sheet4', navigationTrigger: 'internship_managers:monitoring:edit:sheet', options: {monitoringId: _monitoring.get('_id'), sheet:'sheet4'} }
                                )
                                break;
                        }
                        AppManager.trigger('breadcrumb:update', path);

                        var view = new View.sheet4({
                            model: _monitoring,
                            title: polyglot.t('monitoring.edit.sheet')+' - '+ polyglot.t('monitoring.sheets.sheet4.name'),
                            userCategory: _options.userCategory
                        });
                        
                        view.on('internship_managers:sheet:validate', function(_msg){

                            var fetchingUser = AppManager.request('user:entity', $('#user-id').html());
                            $.when(fetchingUser).done(function(_user){
                                
                                API.misc.showLoader();

                                var temp = _monitoring.get('sheets').sheet4;

                                _monitoring.get('sheets').sheet4 = {
                                    //  Old value
                                    //  Fix because there is a bug when _monitoring.get('sheets').sheet0.validation = {}
                                    //  --> Invalid JSON ?!
                                    
                                    openingDate: temp.openingDate,
                                    deadline: temp.deadline,  
                                    
                                    isConcordantWithWork: temp.isConcordantWithWork,
                                    satisfaction: temp.satisfaction,
                                    globalOpinion: temp.globalOpinion,
                                    taxResp: {
                                        firstName: temp['taxResp.firstName'],
                                        lastName: temp['taxResp.lastName'],
                                        position: temp['taxResp.position'],
                                        email: temp['taxResp.email'],
                                        phone: temp['taxResp.phone'],
                                    },
                                    author:{
                                        firstName: temp['author.firstName'],
                                        lastName: temp['author.lastName'],
                                        position: temp['author.position'],
                                        email: temp['author.email'],
                                        phone: temp['author.phone'],
                                    },
                        
                                    //  Update
                                    validation : {
                                        state : 'validated',
                                        by : _user.attributes,
                                        msg : _msg,
                                        date : API.dates.convertToDDMMYYYY(new Date())
                                    }
                                    
                                }

                                if(_monitoring.save()){
                                    AppManager.trigger('internship_managers:monitoring:show', {monitoringId : _monitoring.get('_id')});
                                }

                            });

                        });
                        
                        view.on('form:submit', function(_data){
                            
                            API.misc.showLoader();

                            _monitoring.get('sheets').sheet4 = _data;
                            
                            if(_monitoring.save()){
                                AppManager.trigger(_options.userCategory+':monitoring:show', {monitoringId : _monitoring.get('_id')});
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