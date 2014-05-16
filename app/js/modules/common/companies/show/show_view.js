define([
    'app',
    'tpl!modules/common/companies/show/templates/company_details.tpl',
    'bootbox'
], function(AppManager, companyDetailsTpl, Bootbox){
    
    // CompaniesModule Show View
    AppManager.module('CompaniesModule.Show.View', function(View, AppManager, Backbone, Marionette, $, _){
        
        View.Company = Marionette.ItemView.extend({
            template: companyDetailsTpl,
            onRender: function(){

            },
            events: {
                //  Internship managers
                'click .js-modify': 'modifyClicked',
            },
            
            //  Internship_managers -> to modify the company
            modifyClicked: function(_e){
                
                _e.preventDefault();
                this.trigger('internship_managers:company:edit');
                
            }
            
        });
        
    });
    
    return AppManager.CompaniesModule.Show.View;
})