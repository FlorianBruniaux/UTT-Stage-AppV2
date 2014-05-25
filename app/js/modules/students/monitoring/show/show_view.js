define([
    'app',
    'utt.stages',
    'tpl!modules/students/monitoring/show/templates/monitoring_details.tpl',
    'tpl!modules/students/monitoring/show/templates/no_monitoring.tpl'
], function(AppManager, UttStages, monitoringDetailsTpl, noMonitoringTpl){
    
    // MonitoringModule Show View
    AppManager.module('MonitoringModule.Show.View', function(View, AppManager, Backbone, Marionette, $, _){
        
        var API = new UttStages.Application(AppManager);
        
        View.Monitoring = Marionette.ItemView.extend({
            template: monitoringDetailsTpl 
        });
        
        View.noMonitoring = Marionette.ItemView.extend({
            template: noMonitoringTpl,
            onRender: function(){
                setTimeout(function(){
                    AppManager.trigger('students:home:root');
                },2000);
            }
        });
        
    });
    
    return AppManager.MonitoringModule.Show.View;
})