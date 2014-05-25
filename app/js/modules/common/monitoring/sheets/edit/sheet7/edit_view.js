define([
    'app',
    'utt.stages',
    'tpl!modules/common/monitoring/sheets/edit/sheet7/templates/sheet7_form.tpl',
    'backbone.forms',
    'backbone.forms.bootstrap',
    'css!vendors/bower/backbone-forms/css/bootstrap3.css'
], function(AppManager, UttStages, sheet7FormTpl){
    
    AppManager.module('MonitoringModule.Sheets.Edit.View', function(View, AppManager, Backbone, Marionette, $, _){
        
        var API = new UttStages.Application(AppManager);
        
        var sheet7Form;

        View.sheet7 = Marionette.ItemView.extend({
            template: sheet7FormTpl,
            data : '',
            onRender: function(){

                var title = this.options.title;

                data = this.options.model.get('sheets').sheet7;
                
                const marks = [0,1,2,3,4,5,6,7,8,9,10];
                
                //  New model with just a schema
                var bbformSchema = Backbone.Model.extend({
                    schema: {
                        openingDate:    { type: 'Text', validators: ['required'] },
                        deadline:       { type: 'Text', validators: ['required'] },
                        adaptability:   { type: 'Select', options: marks },
                        initiative:     { type: 'Select', options: marks },
                        abilityToInform: { type: 'Select', options: marks },
                        efficiency: { type: 'Select', options: marks },
                        abilityToWorkInTeam: { type: 'Select', options: marks },
                        humanRelations: { type: 'Select', options: marks },
                        attendance: { type: 'Select', options: marks },
                        skillset: { type: 'Select', options: marks },
                        innovation: { type: 'Select', options: marks },
                        organization: { type: 'Select', options: marks },
                        writtenReportsQuality: { type: 'Select', options: marks },
                        oralReportsQuality: { type: 'Select', options: marks },
                        achievementsQuality: { type: 'Select', options: marks },
                        evolution: { type: 'Select', options: marks }
                    }
                });

                //  The schema of the future bbform
                var bbformModel = new bbformSchema(this.formatSpecificData(data));
                
                var self = this;
                setTimeout(function(){

                    //  New bbform with a template
                    sheet7Form = new Backbone.Form({
                        template: _.template($('#sheet7FormTemplate').html()),
                        model: bbformModel
                    }).render();

                    //  Put the form before submit btn
                    $('button.js-submit').parent().before(sheet7Form.el);
                    
                    //  Add title
                    $('h6.panel-title').append(title);

                    //  To set blur event listener
                    API.views.forms.setBlurListener(sheet7Form, bbformModel);
                    
                    //  To init datepicker
                    API.misc.initDatepicker();
                
                    //  To set specifications (input disabled etc)
                    self.setUserCategorySpec();
                    
                },300);
                
            },
            
            setUserCategorySpec : function(){
                switch (this.options.userCategory) {
                    case 'teachers':
                        $('input, select, textarea').prop('disabled', true);
                        break;
                    
                    case 'internship_managers':
                        $('button.js-submit').before('<button class="btn btn-success js-validate"><i class="icon-checkmark3"></i>'+polyglot.t('validate')+'</button>');
                        break;

                }

            },
            
            formatSpecificData : function(_data){
                    
                //  To set to format DD/MM/YYYY
                _data.openingDate = _data.openingDate;
                _data.deadline = _data.deadline;
                
                return _data
            
            },
            
            events: {
                'click button.js-validate': API.views.events.validateSheet,
                'click button.js-submit': 'eSubmitClicked'
            },
            
            eSubmitClicked: function(_e){
                
                _e.preventDefault();

                if( API.views.forms.isFormValid(sheet7Form) ){
                    var data = sheet7Form.getValue();

                    this.trigger('form:submit',data)
                }
                
            }
        });
    });
    
    return AppManager.MonitoringModule.Sheets.Edit.View;
});