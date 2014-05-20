define([
    'app',
    'utt.stages',
    'modules/common/companies/list/list_view'
], function(AppManager, UttStages, View){
    
    // CompaniesModule List Controller
    AppManager.module('CompaniesModule.List', function(List, AppManager, Backbone, Marionette, $, _){
        
        var API = new UttStages.Application(AppManager);
        
        List.Controller = {
            
            // To list all the companies
            listCompanies: function(_options){
                
                if(DEBUG) console.info('companies.list.list_controller.listCompanies()');
                
                // Displays loader while data is loading
                API.misc.showLoader();
                 
                // Updates breadcrumb
                var path = [
                    { name: 'companies.list', url: 'companies/list', navigationTrigger: 'companies:list' }
                ];
                
                if (_options.userCategory == 'internship_managers') {
                    path.unshift(
                        { name: 'companies', url: 'companies', navigationTrigger: 'internship_managers:companies:root' }
                    )
                }
                
                AppManager.trigger('breadcrumb:update', path);
 
                // Gets all the companies (CF entities folder)
                // When all the companies are fetched (CF use of defer.promise() )
                var fetchingCompanies = AppManager.request('companies:entities');
                $.when(fetchingCompanies).done(function(_companies){
                    
                    var filteredCompanies = API.entities.filterCollection(_companies);
                    
                    console.log(_companies);
                    
                    //  Get the params in the URL
                    //  RQ: They are not directly passed to the function but taken in the url
                    //      because the app has to be restful! (If you send the url to a friend he should see the same thing)
                    var prms = API.misc.getParmsFromURL(window.location.href),
                        //  We only display companies that have already been validated
                        criterions = [],
                        values = [];
                    
                    _.each(prms, function(_value, _key){
                        if (_value != 'all' && _value != '' && _key != 'fullAddress') {
                            criterions.push(_key);
                            values.push(_value);
                        }
                    });
                    
                    if (criterions.length > 0 && values.length > 0) {
                        filteredCompanies.filter(criterions, values);
                    }

                    var companiesListView = new View.Companies({
                        collection: filteredCompanies
                    });
                    
                    companiesListView.on('itemview:company:show', function(childView, model){
                        AppManager.trigger('company:show', model.get('_id'));
                    });
 
                    AppManager.contentRegion.show(companiesListView);
                });   
 
            }
        }
    });

    return AppManager.CompaniesModule.List.Controller;
})