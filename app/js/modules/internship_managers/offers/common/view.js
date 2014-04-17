define([
    'app',
    'utt.stages',
    'tpl!modules/users/common/templates/form.tpl',
    'backbone.syphon'
], function(AppManager, UttStages, formTpl){
    
    // OffersModule Common Views (Use by 'edit' & 'new' because same logic and template)
    AppManager.module('OffersModule.Common.Views', function(Views, AppManager, Backbone, Marionette, $, _){
        
        var API = new UttStages.Application(AppManager);
        
        Views.Form = Marionette.ItemView.extend({
            template: formTpl,
            
            events: {
                'click button.js-submit': 'eSubmitClicked'
            },
            
            eSubmitClicked: function(_e){
                _e.preventDefault();
                
                var data = Backbone.Syphon.serialize(this);

                
            }
            

        });
    });
    
    return AppManager.OffersModule.Common.Views;
});