define([
    'app',
    'utt.stages',
    'tpl!modules/internship_managers/monitoring/common/templates/form.tpl',
    'tpl!modules/internship_managers/monitoring/common/templates/empty.tpl',
    'backbone.forms',
    'backbone.forms.bootstrap',
    'css!vendors/bower/backbone-forms/css/bootstrap3.css'
], function(AppManager, UttStages, formTpl, emptyTpl){
    
    // MonitoringModule Common Views (Use by 'edit' & 'new' because same logic and template)
    AppManager.module('MonitoringModule.Common.Views', function(Views, AppManager, Backbone, Marionette, $, _){
        
        var API = new UttStages.Application(AppManager);
        
        Views.Empty = Marionette.ItemView.extend({
            template : emptyTpl,
            onRender: function(){
                setTimeout(function(){
                    AppManager.trigger('internship_managers:monitoring:list');
                },2000);
            }
        });
        
        Views.Form = Marionette.ItemView.extend({
            template : formTpl,
            newMonitoringForm: '',
            data : '',
            onRender: function(){

                var title = this.options.title;

                data = this.options.model.attributes;

                var offers = [];
                _.each(this.options.offers, function(_value, _key){
                    offers.push(_key); 
                });
                
                //  New model with just a schema
                var bbformSchema = Backbone.Model.extend({
                    schema: {
                        offer:   { type: 'Select', validators: ['required'], options: offers }
                    }
                });

                //  The schema of the future bbform
                var bbformModel = new bbformSchema(this.formatSpecificData(data));
                
                
                var self = this;
                setTimeout(function(){

                    //  New bbform with a template
                    newMonitoringForm = new Backbone.Form({
                        template: _.template($('#newMonitoringFormTemplate').html()),
                        model: bbformModel
                    }).render();

                    //  Put the form before submit btn
                    $('button.js-submit').before(newMonitoringForm.el);
                    
                    //  Add title
                    $('h6.panel-title').append(title);

                    //  To set blur event listener
                    API.views.forms.setBlurListener(newMonitoringForm, bbformModel);
                    
                },300);
            },
            
            formatSpecificData : function(_data){
                //nothing to format
                return _data
            },
            
            events: {
                'click button.js-submit': 'eSubmitClicked'
            },
            
            eSubmitClicked: function(_e){
                
                _e.preventDefault();

                if( API.views.forms.isFormValid(newMonitoringForm) ){
                    var data = newMonitoringForm.getValue();

                    this.trigger('form:submit',data)
                }
                
            }
        });
    });
    
    return AppManager.MonitoringModule.Common.Views;
});