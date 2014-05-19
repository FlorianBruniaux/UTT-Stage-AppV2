define([
    'app',
    'utt.stages',
    'modules/internship_managers/companies/common/view'
], function(AppManager, UttStages, View){
    
    // CompaniesModule edit Controller
    AppManager.module('CompaniesModule.Edit', function(Edit, AppManager, Backbone, Marionette, $, _){
        
        var API = new UttStages.Application(AppManager);
        
        Edit.Controller = {
            
            // To edit an company
            editCompany: function(_options){
                
                if(DEBUG) console.info("internship_managers.companies.edit.edit_controller.editCompany()");
                
                // Displays loader while data is loading
                API.misc.showLoader();
                
                // Updates breadcrumb
                var path = [
                    { name: 'companies', url: 'companies', navigationTrigger: 'internship_managers:companies:root' },
                    { name: 'company.edit', url: 'companies/edit', navigationTrigger: 'internship_managers:company:edit' }
                ];
                AppManager.trigger('breadcrumb:update', path);

                // Gets the company
                // When the company is fetched (CF use of defer.promise() )
                var fetchingCompany = AppManager.request('company:entity', _options.companyId);
                $.when(fetchingCompany).done(function(_company){
                    
                    if (_company !== undefined) {
                        
                        var view = new View.Form({
                            model: _company,
                            title: polyglot.t('company.edit')
                        });
                        
                        view.on('form:submit', function(data){
                            
                            API.misc.showLoader();
                            
                            if (_company.save(data)) {
                                AppManager.trigger("company:show", _options.companyId);
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
    
    return AppManager.CompaniesModule.Edit.Controller;
})