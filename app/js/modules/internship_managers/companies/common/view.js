define([
    'app',
    'utt.stages',
    'tpl!modules/internship_managers/companies/common/templates/form.tpl',
    'backbone.forms',
    'backbone.forms.bootstrap',
    'css!vendors/bower/backbone-forms/css/bootstrap3.css',
    
    'vendors/tags.min'
], function(AppManager, UttStages, formTpl){
    
    // CompaniesModule Common Views (Use by 'edit' & 'new' because same logic and template)
    AppManager.module('CompaniesModule.Common.Views', function(Views, AppManager, Backbone, Marionette, $, _){
        
        var API = new UttStages.Application(AppManager);
        
        Views.Form = Marionette.ItemView.extend({
            template: formTpl,
            newCompanyForm: '',
            data : '',
            onRender: function(){

                var title = this.options.title;

                data = this.options.model.attributes;
                
                //  TO DO : LOAD Companies model                
                var companies = ['EDF'];   
                
                //  New model with just a schema
                var bbformSchema = Backbone.Model.extend({
                    schema: {
                        cname:    { type:'Text', validators: ['required'] },
                        description:    { type:'TextArea', validators: ['required'] },
                        fullAddress:    { type:'Text', validators: ['required'] },
                        lat:    { type:'Number', validators: ['required'], editorAttrs: { disabled: true }  },
                        lng:    { type:'Number', validators: ['required'], editorAttrs: { disabled: true }  },
                        website:    { type:'Text', validators: ['required', 'url'] }
                    }
                });
                
               
                //  The schema of the future bbform
                var bbformModel = new bbformSchema(this.formatSpecificData(data));
                
                
                var self = this;
                setTimeout(function(){

                    //  New bbform with a template
                    newCompanyForm = new Backbone.Form({
                        template: _.template($('#newCompanyFormTemplate').html()),
                        model: bbformModel
                    }).render();

                    //  Put the form before submit btn
                    $('button.js-submit').before(newCompanyForm.el);
                    
                    //  Add title
                    $('h6.panel-title').append(title);
                    
                    //  Geocomplete
                    require(['async!http://maps.googleapis.com/maps/api/js?libraries=places&sensor=false', 'jquery', 'geocomplete'], function () {
                        $("#form-fullAddress input").geocomplete({
                            details: "form"
                        });
                    });

                    //  To set blur event listener
                    API.views.forms.setBlurListener(newCompanyForm, bbformModel);
                    
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

                if( API.views.forms.isFormValid(newCompanyForm) ){
                    var data = newCompanyForm.getValue();

                    this.trigger('form:submit',data)
                }
                
            }
        });
    });
    
    return AppManager.CompaniesModule.Common.Views;
});