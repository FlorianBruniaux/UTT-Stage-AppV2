define([
    'app',
    'utt.stages',
    'modules/common/monitoring/list/list_view'
], function(AppManager, UttStages, View){
    
    //  MonitoringModule List Controller
    AppManager.module('MonitoringModule.List', function(List, AppManager, Backbone, Marionette, $, _){
        
        var API = new UttStages.Application(AppManager);
        
        List.Controller = {
            
            //  To list all the monitoring
            listMonitoring: function(_options){
                
                if(DEBUG) console.info('modules/common/monitoring/list/list_controller.js -> listMonitoring()');
                
                //  Displays loader while data is loading
                API.misc.showLoader();
                 
                var path = [];
                switch (_options.userCategory) {
                    case 'teachers':
                        path.push(
                            { name: 'monitoring.list', url: 'monitoring/list', navigationTrigger: 'teachers:monitoring:list'}
                        )
                        break;
                    
                    case 'internship_managers':
                        path.push(
                            { name: 'monitoring', url: 'monitoring', navigationTrigger: 'internship_managers:monitoring:root' },
                            { name: 'monitoring.list', url: 'monitoring/list', navigationTrigger: 'internship_managers:monitoring:list'}
                        )
                        break;
                }
                AppManager.trigger('breadcrumb:update', path);
 
                //  Gets all the monitoring (CF entities folder)
                //  When all the monitoring are fetched (CF use of defer.promise() )
                var fetchingMonitoring = AppManager.request('monitoring:entities');
                $.when(fetchingMonitoring).done(function(_monitoring){
                    
                    var filteredMonitoring = API.entities.filterCollection(_monitoring);
                    
                    //  Get the params in the URL
                    //  RQ: They are not directly passed to the function but taken in the url
                    //      because the app has to be restful! (If you send the url to a friend he should see the same thing)
                    var prms = API.misc.getParmsFromURL(window.location.href),
                        //  We only display monitoring that have already been validated
                        criterions = [],
                        values = [];
                    
                    _.each(prms, function(_value, _key){
                        if (_value != 'all' && _value != '') {
                            switch(_key){
                                case 'department':
                                    criterions.push('offer.department');
                                    values.push(_value);
                                    break;
                                
                                case 'type':
                                    criterions.push('offer.type');
                                    values.push(_value);
                                    break;
                            }
                        }
                    });
                    
                    if (criterions.length > 0 && values.length > 0) {
                        filteredMonitoring.filter(criterions, values);
                    }

                    var monitoringListView = new View.Monitoring({
                        collection: filteredMonitoring,
                        params: prms,
                        userCategory : _options.userCategory
                    });
                    
                    monitoringListView.on('itemview:monitoring:show', function(childView, model){
                        AppManager.trigger('monitoring:show', model.get('_id'));
                    });
 
                    AppManager.contentRegion.show(monitoringListView);
                });   
 
            }
        }
    });

    return AppManager.MonitoringModule.List.Controller;
})