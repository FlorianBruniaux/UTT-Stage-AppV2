define([
    'app',
    'utt.stages',
    'tpl!modules/common/monitoring/sheets/edit/sheet6/templates/sheet6_form.tpl',
    'backbone.forms',
    'backbone.forms.bootstrap',
    'css!vendors/bower/backbone-forms/css/bootstrap3.css'
], function(AppManager, UttStages, sheet6FormTpl){
    
    AppManager.module('MonitoringModule.Sheets.Edit.View', function(View, AppManager, Backbone, Marionette, $, _){
        
        var API = new UttStages.Application(AppManager);
        
        var sheet6Form;

        View.sheet6 = Marionette.ItemView.extend({
            template: sheet6FormTpl,
            data : '',
            onRender: function(){

                var title = this.options.title;

                data = this.options.model.attributes;
                
                //  New model with just a schema
                var bbformSchema = Backbone.Model.extend({
                    schema: {
                        openingDate:    { type: 'Text', validators: ['required']},
                        deadline:       { type: 'Text', validators: ['required']},
                        adaptability:   { type: 'Select', validators: ['required'], options: [0,1,2,3,4,5,6,7,8,9,10] },
                        initiative:     { type: 'Select', validators: ['required'], options: [0,1,2,3,4,5,6,7,8,9,10] },
                        abilityToInform: { type: 'Select', validators: ['required'], options: [0,1,2,3,4,5,6,7,8,9,10] },
                        efficiency: { type: 'Select', validators: ['required'], options: [0,1,2,3,4,5,6,7,8,9,10] },
                        abilityToWorkInTeam: { type: 'Select', validators: ['required'], options: [0,1,2,3,4,5,6,7,8,9,10] },
                        humanRelations: { type: 'Select', validators: ['required'], options: [0,1,2,3,4,5,6,7,8,9,10] },
                        attendance: { type: 'Select', validators: ['required'], options: [0,1,2,3,4,5,6,7,8,9,10] },
                        skillset: { type: 'Select', validators: ['required'], options: [0,1,2,3,4,5,6,7,8,9,10] },
                        innovation: { type: 'Select', validators: ['required'], options: [0,1,2,3,4,5,6,7,8,9,10] },
                        organization: { type: 'Select', validators: ['required'], options: [0,1,2,3,4,5,6,7,8,9,10] },
                        writtenReportsQuality: { type: 'Select', validators: ['required'], options: [0,1,2,3,4,5,6,7,8,9,10] },
                        oralReportsQuality: { type: 'Select', validators: ['required'], options: [0,1,2,3,4,5,6,7,8,9,10] },
                        achievementsQuality: { type: 'Select', validators: ['required'], options: [0,1,2,3,4,5,6,7,8,9,10] },
                        evolution: { type: 'Select', validators: ['required'], options: [0,1,2,3,4,5,6,7,8,9,10] },
                    }
                });

                //  The schema of the future bbform
                var bbformModel = new bbformSchema(this.formatSpecificData(data));
                
                var self = this;
                setTimeout(function(){

                    //  New bbform with a template
                    sheet6Form = new Backbone.Form({
                        template: _.template($('#sheet6FormTemplate').html()),
                        model: bbformModel
                    }).render();

                    //  Put the form before submit btn
                    $('button.js-submit').before(sheet6Form.el);
                    
                    //  Add title
                    $('h6.panel-title').append(title);

                    //  To set blur event listener
                    API.views.forms.setBlurListener(sheet6Form, bbformModel);
                    
                    //  To init datepicker
                    API.misc.initDatepicker();
                    
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

                if( API.views.forms.isFormValid(sheet6Form) ){
                    var data = sheet6Form.getValue();

                    this.trigger('form:submit',data)
                }
                
            }
        });
    });
    
    return AppManager.MonitoringModule.Sheets.Edit.View;
});