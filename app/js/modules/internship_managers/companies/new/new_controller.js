define([
    'app',
    'utt.stages',
    'modules/internship_managers/companies/common/view'
], function(AppManager, UttStages, View){
    
    // CompaniesModule new Controller
    AppManager.module('CompaniesModule.New', function(New, AppManager, Backbone, Marionette, $, _){
        
       var API = new UttStages.Application(AppManager);
        
        New.Controller = {
            
            // To add a new user
            addNewCompany: function(){
                
                if(DEBUG) console.info("internship_managers.companies.new.new_controller.addNewCompany()");
                
                // Displays loader while data is loading
                API.misc.showLoader();
                
                // Updates breadcrumb
                var path = [
                    { name: 'companies', url: 'companies', navigationTrigger: 'internship_managers:companies:root' },
                    { name: 'company.new', url: 'companies/new', navigationTrigger: 'internship_managers:company:new' }
                ];
                AppManager.trigger('breadcrumb:update', path);

                // Gets a new user model (CF entities folder)
                var newCompany = AppManager.request('company:entity:new');
                
                var view = new View.Form({
                    model: newCompany,
                    title: polyglot.t('company.new')
                });
                
                view.on('form:submit', function(_data){
                    
                    API.misc.showLoader();
                    
                    if (newCompany.save(_data)) {
                        
                        AppManager.trigger("companies:list");
                    }
                    
                });
                
                AppManager.contentRegion.show(view);
            }
        }; 
    });
    
    return AppManager.CompaniesModule.New.Controller;
})