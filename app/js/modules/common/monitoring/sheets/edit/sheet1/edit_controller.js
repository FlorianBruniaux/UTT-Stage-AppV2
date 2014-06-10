define([
    'app',
    'utt.stages',
    'modules/common/monitoring/sheets/edit/sheet1/edit_view'
], function(AppManager, UttStages, View){
    
    // MonitoringModule edit Controller
    AppManager.module('MonitoringModule.Sheets.Edit', function(Edit, AppManager, Backbone, Marionette, $, _){
        
        var API = new UttStages.Application(AppManager);
        
        Edit.Controller = {
            
            // To edit an monitoring
            editSheet: function(_options){
                
                if(DEBUG) console.info('modules/common/monitoring/sheets/edit/sheet1/edit_controller.js -> editSheet()');
                
                // Displays loader while data is loading
                API.misc.showLoader();
                
                // Gets the monitoring
                // When the monitoring is fetched (CF use of defer.promise() )
                var fetchingMonitoring = AppManager.request('monitoring:entity', _options.monitoringId);
                    
                $.when(fetchingMonitoring).done(function(_monitoring){
                    
                    if (_monitoring !== undefined) {
                        
                        var path = [];
                        switch (_options.userCategory) {
                            
                            
                            case 'teachers':
                                path.push(
                                    { name: 'monitoring.list', url: 'monitoring/list', navigationTrigger: 'teachers:monitoring:list'},
                                    { name: _monitoring.get('offer').provided.by.firstName +' '+ _monitoring.get('offer').provided.by.lastName, url: 'monitoring/'+_monitoring.get('_id'), navigationTrigger: 'teachers:monitoring:show', options: {monitoringId: _monitoring.get('_id')} },
                                    { name: 'monitoring.sheets.sheet1.name', url: 'monitoring/'+_monitoring.get('_id')+'/edit/sheet1', navigationTrigger: 'teachers:monitoring:edit:sheet', options: {monitoringId: _monitoring.get('_id'), sheet:'sheet1'} }
                                )
                                break;
                            
                            case 'internship_managers':
                                path.push(
                                    { name: 'monitoring', url: 'monitoring', navigationTrigger: 'internship_managers:monitoring:root' },
                                    { name: 'monitoring.list', url: 'monitoring/list', navigationTrigger: 'internship_managers:monitoring:list'},
                                    { name: _monitoring.get('offer').provided.by.firstName +' '+ _monitoring.get('offer').provided.by.lastName, url: 'monitoring/'+_monitoring.get('_id'), navigationTrigger: 'internship_managers:monitoring:show', options: {monitoringId: _monitoring.get('_id')} },
                                    { name: 'monitoring.sheets.sheet1.name', url: 'monitoring/'+_monitoring.get('_id')+'/edit/sheet1', navigationTrigger: 'internship_managers:monitoring:edit:sheet', options: {monitoringId: _monitoring.get('_id'), sheet:'sheet1'} }
                                )
                                break;
                            
                            case 'students':
                                console.log(_monitoring);
                                path.push(
                                    { name: _monitoring.get('offer').provided.by.firstName +' '+ _monitoring.get('offer').provided.by.lastName, url: 'monitoring', navigationTrigger: 'students:monitoring:show'},
                                    { name: 'monitoring.sheets.sheet1.name', url: 'monitoring/sheet1/edit', navigationTrigger: 'students:monitoring:edit:sheet', options: {sheet:'sheet1'} }
                                )
                                break;
                        }
                        AppManager.trigger('breadcrumb:update', path);

                      
                        $.getJSON('js/modules/common/monitoring/sheets/edit/sheet1/naf.json')
                        .done(function(data){
                            
                            var nafArr = [];
                            _.each(data, function(_value, _key){
                                nafArr.push(_value.code+' : '+_value.lbl)
                            })

                            var view = new View.sheet1({
                                model: _monitoring,
                                title: polyglot.t('monitoring.edit.sheet')+' - '+ polyglot.t('monitoring.sheets.sheet1.name'),
                                nafCodes: nafArr,
                                userCategory: _options.userCategory
                            });
                            
                            
                            view.on('internship_managers:sheet:validate', function(_msg){

                                var fetchingUser = AppManager.request('user:entity', $('#user-id').html());
                                $.when(fetchingUser).done(function(_user){
                                    
                                    API.misc.showLoader();
    
                                    var temp = _monitoring.get('sheets').sheet1;
    
                                    _monitoring.get('sheets').sheet1 = {

                                        openingDate: temp.openingDate,
                                        deadline: temp.deadline,
                
                                        naf: temp.naf,//52 - Commerce de détail..
                                        workforce: temp.workforce,// <5, 5-10, 10-20, 20-50, 50-100, 100-500, >500
                                        administrativeResp: {
                                            firstName: temp['administrativeResp.firstName'],
                                            lastName: temp['administrativeResp.lastName'],
                                            position: temp['administrativeResp.position'],
                                            email: temp['administrativeResp.email'],
                                            phone: temp['administrativeResp.phone'],
                                        },
                                        technicalResp: {
                                            firstName: temp['technicalResp.firstName'],
                                            lastName: temp['technicalResp.lastName'],
                                            position: temp['technicalResp.position'],
                                            email: temp['technicalResp.email'],
                                            phone: temp['technicalResp.phone'],
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
                                
                                _monitoring.get('sheets').sheet1 = _data;

                                if(_monitoring.save()){
                                    AppManager.trigger(_options.userCategory+':monitoring:show', {monitoringId : _monitoring.get('_id')});
                                }
                                
                                
                            });
                            
                            AppManager.contentRegion.show(view);
                                
                        });
                        
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