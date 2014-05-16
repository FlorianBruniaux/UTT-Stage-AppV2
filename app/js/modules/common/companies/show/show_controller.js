define([
    'app',
    'utt.stages',
    'modules/common/companies/show/show_view'
], function(AppManager, UttStages, View){
  
    // CompaniesModule Show Controller
    AppManager.module('CompaniesModule.Show', function(Show, AppManager, Backbone, Marionette, $, _){
    
        var API = new UttStages.Application(AppManager);
        
        Show.Controller = {
            
            // To show a specific company
            showCompany: function(_options){

                // Displays loader while data is loading
                API.misc.showLoader();
                
                // Gets the company
                // When the company is fetched (CF use of defer.promise() )
                var fetchingCompany = AppManager.request('company:entity', _options.companyId);
                $.when(fetchingCompany).done(function(_company){

                    if (_company !== undefined) {
                        
                        _company.set('userCategory', _options.userCategory);
                        
                        // Updates breadcrumb
                        var path = [
                            { name: 'companies', url: 'companies', navigationTrigger: 'companies:root' },
                            { name: 'companies.list', url: 'companies/list', navigationTrigger: 'companies:list' },
                            { name: _company.get('ref'), url: 'companies/'+_company.get('_id'), navigationTrigger: 'company:show', id:_company.get('_id') }
                        ];
                        AppManager.trigger('breadcrumb:update', path);

                        var view = new View.Company({
                            model: _company
                        });
                        
                        //  Internship_managers events
                        view.on('internship_managers:company:edit', function(){
                            AppManager.trigger('internship_managers:company:edit', _company.get('_id'))
                        });
                        
                        AppManager.contentRegion.show(view);
                        
                    }
                    else{
                        API.errors.e404();
                    }
                }); 
            } 
        }
    });
    
    return AppManager.CompaniesModule.Show.Controller;
});
