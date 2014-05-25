define([
    'app',
    'utt.stages',
    'tpl!modules/common/monitoring/sheets/edit/sheet4/templates/sheet4_form.tpl',
    'backbone.forms',
    'backbone.forms.bootstrap',
    'css!vendors/bower/backbone-forms/css/bootstrap3.css'
], function(AppManager, UttStages, sheet4FormTpl){
    
    AppManager.module('MonitoringModule.Sheets.Edit.View', function(View, AppManager, Backbone, Marionette, $, _){
        
        var API = new UttStages.Application(AppManager);
        
        var sheet4Form;

        View.sheet4 = Marionette.ItemView.extend({
            template: sheet4FormTpl,
            data : '',
            onRender: function(){

                var title = this.options.title;

                data = this.options.model.get('sheets').sheet4
                
                //  New model with just a schema
                var bbformSchema = Backbone.Model.extend({
                    schema: {
                        openingDate:    { type: 'Text', validators: ['required'] },
                        deadline:       { type: 'Text', validators: ['required'] },
                        isConcordantWithWork:       { type: 'TextArea'},
                        satisfaction:   { type: 'TextArea'},
                        globalOpinion:   { type: 'TextArea'},
                        'taxResp.firstName':     { type: 'Text'},
                        'taxResp.lastName':      { type: 'Text'},
                        'taxResp.position':      { type: 'Text'},
                        'taxResp.email':         { type: 'Text', validators: ['email']},
                        'taxResp.phone':         { type: 'Text', validators: [/^(0[1-68])(?:[ _.-]?(\d{2})){4}$/]},
                        'author.firstName':          { type: 'Text'},
                        'author.lastName':           { type: 'Text'},
                        'author.position':           { type: 'Text'},
                        'author.email':              { type: 'Text', validators: ['email']},
                        'author.phone':              { type: 'Text', validators: [/^(0[1-68])(?:[ _.-]?(\d{2})){4}$/]},
                    }
                });

                //  The schema of the future bbform
                var bbformModel = new bbformSchema(this.formatSpecificData(data));
                
                
                var self = this;
                setTimeout(function(){

                    //  New bbform with a template
                    sheet4Form = new Backbone.Form({
                        template: _.template($('#sheet4FormTemplate').html()),
                        model: bbformModel
                    }).render();

                    //  Put the form before submit btn
                    $('button.js-submit').parent().before(sheet4Form.el);
                    
                    //  Add title
                    $('h6.panel-title').append(title);

                    //  To set blur event listener
                    API.views.forms.setBlurListener(sheet4Form, bbformModel);
                    
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

                _data['taxResp.firstName'] = _data.taxResp.firstName;
                _data['taxResp.lastName'] = _data.taxResp.lastName;
                _data['taxResp.position'] = _data.taxResp.position;
                _data['taxResp.email'] = _data.taxResp.email;
                _data['taxResp.phone'] = _data.taxResp.phone;
                
                _data['author.firstName'] = _data.author.firstName;
                _data['author.lastName'] = _data.author.lastName;
                _data['author.position'] = _data.author.position;
                _data['author.email'] = _data.author.email;
                _data['author.phone'] = _data.author.phone;
                
                return _data
            
            },
            
            events: {
                'click button.js-validate': API.views.events.validateSheet,
                'click button.js-submit': 'eSubmitClicked'
            },
            
            eSubmitClicked: function(_e){
                
                _e.preventDefault();

                if( API.views.forms.isFormValid(sheet4Form) ){
                    var data = sheet4Form.getValue();

                    
                    data = {
                        openingDate: data.openingDate,
                        deadline: data.deadline,
                        
                        isConcordantWithWork: data.isConcordantWithWork,
                        satisfaction: data.satisfaction,
                        globalOpinion: data.globalOpinion,
                        taxResp: {
                            firstName: data['taxResp.firstName'],
                            lastName: data['taxResp.lastName'],
                            position: data['taxResp.position'],
                            email: data['taxResp.email'],
                            phone: data['taxResp.phone'],
                        },
                        author:{
                            firstName: data['author.firstName'],
                            lastName: data['author.lastName'],
                            position: data['author.position'],
                            email: data['author.email'],
                            phone: data['author.phone'],
                        }
                           
                    }
                    
                    this.trigger('form:submit',data)
                }
                
            }
        });
    });
    
    return AppManager.MonitoringModule.Sheets.Edit.View;
});