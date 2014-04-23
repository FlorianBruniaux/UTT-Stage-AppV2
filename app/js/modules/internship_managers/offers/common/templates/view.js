define([
    'app',
    'utt.stages',
    'tpl!modules/internship_managers/offers/common/templates/form.tpl',
    'backbone.forms',
    'backbone.forms.bootstrap',
    'css!vendors/bower/backbone-forms/css/bootstrap3.css',
    
    'vendors/tags.min'
], function(AppManager, UttStages, formTpl){
    
    // OffersModule Common Views (Use by 'edit' & 'new' because same logic and template)
    AppManager.module('OffersModule.Common.Views', function(Views, AppManager, Backbone, Marionette, $, _){
        
        var API = new UttStages.Application(AppManager);
        
        Views.Form = Marionette.ItemView.extend({
            template: formTpl,
            form: '',
            onRender: function(){

                var title = this.options.title;

                //  TO DO : LOAD Companies model                
                var companies = ['EDF'];
                
                //  New model with just a schema
                var bbformSchema = Backbone.Model.extend({
                    schema: {
                        type:   { type: 'Select', validators: ['required'], options: API.utt.getInternshipTypes() },
                        department: { type: 'Select', validators: ['required'], options: API.utt.getDepartments() },
                        departmentSpec: { type: 'Select', validators: ['required'], options: [] },
                        ref:    { type:'Text', validators: ['required'] },
                        fullAddress:    { type:'Text', validators: ['required'] },
                        lat:    { type:'Number', validators: ['required'], editorAttrs: { disabled: true }  },
                        lng:    { type:'Number', validators: ['required'], editorAttrs: { disabled: true }  },
                        company:    { type: 'Select', validators: ['required'], options: companies},
                        title:   { type:'Text', validators: ['required'] },
                        mission:   { type:'TextArea', validators: ['required'] },
                        profile:   { type:'TextArea', validators: ['required'] },
                        rem:   { type:'Number', validators: ['required'] },
                        tags: { type:'Text', validators: ['required'] }
                    }
                });
                
                
                data = this.options.model.attributes;
                
                //  The schema of the future bbform
                var bbformModel = new bbformSchema(this.formatSpecificData(data));
                
                var self = this;
                setTimeout(function(){

                    //  New bbform with a template
                    form = new Backbone.Form({
                        template: _.template($('#formTemplate').html()),
                        model: bbformModel
                    }).render();

                    //  Put the form before submit btn
                    $('button.js-submit').before(form.el);
                    
                    //  Add title
                    $('h6.panel-title').append(title);
                    
                    //  Tags
                    $('#form-tags input').tagsInput({width:'100%'});
                    
                    //  Geocomplete
                    require(['async!http://maps.googleapis.com/maps/api/js?libraries=places&sensor=false', 'jquery', 'geocomplete'], function () {
                        $("#form-fullAddress input").geocomplete({
                            details: "form"
                        });
                    });

                    //  To set blur event listener
                    API.views.forms.setBlurListener(form, bbformModel);
                    
                    //  If department value change -> change department spec options
                    form.on('department:change', function(form, editor) {
                        var dpt = editor.getValue(),
                            newOptions = API.utt.getDepartmentSpec(dpt);
                        
                        form.fields.departmentSpec.editor.setOptions(newOptions);
                    });
                    
                },300);
            },
            
            formatSpecificData : function(_data){
                
                //  Company
                _data.company = ((data.company.name) ? data.company.name : '');

                return _data
            },
            
            events: {
                'click button.js-submit': 'eSubmitClicked'
            },
            
            eSubmitClicked: function(_e){
                
                _e.preventDefault();

                if( API.views.forms.isFormValid(form) ){
                    var data = form.getValue();

                    this.trigger('form:submit',data)
                }
                
            }
        });
    });
    
    return AppManager.OffersModule.Common.Views;
});