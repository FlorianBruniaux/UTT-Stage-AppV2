define([
    'app',
    'utt.stages',
    'tpl!modules/students/monitoring/show/templates/monitoring_details.tpl'
], function(AppManager, UttStages, monitoringDetailsTpl){
    
    // MonitoringModule Show View
    AppManager.module('MonitoringModule.Show.View', function(View, AppManager, Backbone, Marionette, $, _){
        
        var API = new UttStages.Application(AppManager);
        
        View.Monitoring = Marionette.ItemView.extend({
            template: monitoringDetailsTpl,
            onRender: function(){

                
            },
            events: {
              
            }
            
            
        });
        
    });
    
    return AppManager.MonitoringModule.Show.View;
})