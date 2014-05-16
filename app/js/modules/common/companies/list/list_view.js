define([
    'app',
    'utt.stages',
    'tpl!modules/common/companies/list/templates/list.tpl',
    'tpl!modules/common/companies/list/templates/list_item.tpl'
], function(AppManager, UttStages, listTpl, listItemTpl){
    
    // CompaniesModule List View
    AppManager.module('CompaniesModule.List.View', function(View, AppManager, Backbone, Marionette, $, _){
    
        var API = new UttStages.Application(AppManager);
        
        View.Company = Marionette.ItemView.extend({
            tagName: 'tr',
            template: listItemTpl,
            events: {
                'click td a.js-show': API.views.events.showClicked
            }
        })
        
        View.Companies = Marionette.CompositeView.extend({
            template: listTpl,
            itemView: View.Company,
            itemViewContainer: 'tbody',

            initialize: function(){
                
                setTimeout(function(){
                    API.misc.initDataTable();
                }, 100);
                
            }

        });
    });
    
    return AppManager.CompaniesModule.List.View;
})