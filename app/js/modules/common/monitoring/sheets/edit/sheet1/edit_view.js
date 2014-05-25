define([
    'app',
    'utt.stages',
    'tpl!modules/common/monitoring/sheets/edit/sheet1/templates/sheet1_form.tpl',
    'backbone.forms',
    'backbone.forms.bootstrap',
    'css!vendors/bower/backbone-forms/css/bootstrap3.css'
], function(AppManager, UttStages, sheet1FormTpl){
    
    AppManager.module('MonitoringModule.Sheets.Edit.View', function(View, AppManager, Backbone, Marionette, $, _){
        
        var API = new UttStages.Application(AppManager);
        
        var sheet1Form;

        View.sheet1 = Marionette.ItemView.extend({
            template: sheet1FormTpl,
            data : '',
            onRender: function(){

                var title = this.options.title;

                data = this.options.model.get('sheets').sheet1;
                
                //  New model with just a schema
                var bbformSchema = Backbone.Model.extend({
                    schema: {
                        openingDate:    { type: 'Text', validators: ['required'] },
                        deadline:       { type: 'Text', validators: ['required'] },
                        naf:            { type: 'Select', options: this.options.nafCodes },
                        workforce:      { type: 'Select', options: ['<5', '5-10', '10-20', '20-50', '50-100', '100-500', '>500'] },
                        'administrativeResp.firstName':     { type: 'Text'},
                        'administrativeResp.lastName':      { type: 'Text'},
                        'administrativeResp.position':      { type: 'Text'},
                        'administrativeResp.email':         { type: 'Text', validators: ['email']},
                        'administrativeResp.phone':         { type: 'Text', validators: [/^(0[1-68])(?:[ _.-]?(\d{2})){4}$/]},
                        'technicalResp.firstName':          { type: 'Text'},
                        'technicalResp.lastName':           { type: 'Text'},
                        'technicalResp.position':           { type: 'Text'},
                        'technicalResp.email':              { type: 'Text', validators: ['email']},
                        'technicalResp.phone':              { type: 'Text', validators: [/^(0[1-68])(?:[ _.-]?(\d{2})){4}$/]}
                    }
                });

                //  The schema of the future bbform
                var bbformModel = new bbformSchema(this.formatSpecificData(data));
                
                
                var self = this;
                setTimeout(function(){

                    //  New bbform with a template
                    sheet1Form = new Backbone.Form({
                        template: _.template($('#sheet1FormTemplate').html()),
                        model: bbformModel
                    }).render();

                    //  Put the form before submit btn
                    $('button.js-submit').parent().before(sheet1Form.el);
                    
                    //  Add title
                    $('h6.panel-title').append(title);

                    //  To set blur event listener
                    API.views.forms.setBlurListener(sheet1Form, bbformModel);
                    
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
                        $('button.js-submit').remove();
                        break;
                    
                    case 'internship_managers':
                        $('button.js-submit').before('<button class="btn btn-success js-validate"><i class="icon-checkmark3"></i>'+polyglot.t('validate')+'</button>');
                        break;
                    
                    case 'students':
                        $('input[name="openingDate"], input[name="deadline"]').prop('disabled', true);
                        
                        var openingDate = this.options.model.get('sheets').sheet1.openingDate;
                        API.views.sheets.checkOpeningDate(openingDate);
                        
                        var deadline = this.options.model.get('sheets').sheet1.deadline;
                        API.views.sheets.checkDeadline(deadline);
                        
                        var sheetValidation = this.options.model.get('sheets').sheet1.validation;
                        API.views.sheets.checkValidation(sheetValidation);

                        break;
                }

            },
            
            formatSpecificData : function(_data){
                
                //  To set to format DD/MM/YYYY
                _data.openingDate = _data.openingDate;
                _data.deadline = _data.deadline;
                
                _data['administrativeResp.firstName'] = _data.administrativeResp.firstName;
                _data['administrativeResp.lastName'] = _data.administrativeResp.lastName;
                _data['administrativeResp.position'] = _data.administrativeResp.position;
                _data['administrativeResp.email'] = _data.administrativeResp.email;
                _data['administrativeResp.phone'] = _data.administrativeResp.phone;
                
                _data['technicalResp.firstName'] = _data.technicalResp.firstName;
                _data['technicalResp.lastName'] = _data.technicalResp.lastName;
                _data['technicalResp.position'] = _data.technicalResp.position;
                _data['technicalResp.email'] = _data.technicalResp.email;
                _data['technicalResp.phone'] = _data.technicalResp.phone;

                return _data
            
            },
            
            events: {
                'click button.js-validate': API.views.events.validateSheet,
                'click button.js-submit': 'eSubmitClicked'
            },
            
            eSubmitClicked: function(_e){
                
                _e.preventDefault();

                if( API.views.forms.isFormValid(sheet1Form) ){
                    var data = sheet1Form.getValue();

                    data = {
                        openingDate: data.openingDate,
                        deadline: data.deadline,

                        naf: (data.naf != null) ? data.naf : '',//52 - Commerce de détail..
                        workforce: (data.workforce != null) ? data.workforce : '',// <5, 5-10, 10-20, 20-50, 50-100, 100-500, >500
                        administrativeResp: {
                            firstName: data['administrativeResp.firstName'],
                            lastName: data['administrativeResp.lastName'],
                            position: data['administrativeResp.position'],
                            email: data['administrativeResp.email'],
                            phone: data['administrativeResp.phone'],
                        },
                        technicalResp: {
                            firstName: data['technicalResp.firstName'],
                            lastName: data['technicalResp.lastName'],
                            position: data['technicalResp.position'],
                            email: data['technicalResp.email'],
                            phone: data['technicalResp.phone'],
                        }     
                    }

                    this.trigger('form:submit', data)
                }
                
            }
        });
    });
    
    return AppManager.MonitoringModule.Sheets.Edit.View;
});