define([
    'app',
    'utt.stages',
    'tpl!modules/internship_managers/offers/provide/templates/form.tpl',
    'backbone.forms',
    'backbone.forms.bootstrap',
    'css!vendors/bower/backbone-forms/css/bootstrap3.css'
], function(AppManager, UttStages, formTpl){
    
    // OffersModule Common Views (Use by 'provide' & 'new' because same logic and template)
    AppManager.module('OffersModule.Common.Views', function(Views, AppManager, Backbone, Marionette, $, _){
        
        var API = new UttStages.Application(AppManager);
        
        Views.Form = Marionette.ItemView.extend({
            template: formTpl,
            offerProvideForm: '',
            data : '',
            onRender: function(){

                var title = this.options.title;

                data = this.options.model.attributes;
             
                var students = [];
                _.each(this.options.students, function(_value, _key){
                    students.push(_key); 
                });
                
                console.log(students);
                
                //  New model with just a schema
                var bbformSchema = Backbone.Model.extend({
                    schema: {
                        student:  { type: 'Select', validators: ['required'], options: students }
                    }
                });
                
               
                //  The schema of the future bbform
                var bbformModel = new bbformSchema(this.formatSpecificData(data));
                
                
                var self = this;
                setTimeout(function(){

                    //  New bbform with a template
                    offerProvideForm = new Backbone.Form({
                        template: _.template($('#provideOfferTemplate').html()),
                        model: bbformModel
                    }).render();

                    //  Put the form before submit btn
                    $('button.js-submit').before(offerProvideForm.el);
                    
                    //  Add title
                    $('h6.panel-title').append(title);
                    
                    //  To set blur event listener
                    API.views.forms.setBlurListener(offerProvideForm, bbformModel);
                    
                    
                },300);
                
            },
            
            formatSpecificData : function(_data){
                
                //  Nothing

                return _data
            },
            
            events: {
                'click button.js-submit': 'eSubmitClicked'
            },
            
            eSubmitClicked: function(_e){
                
                _e.preventDefault();

                if( API.views.forms.isFormValid(offerProvideForm) ){
                    var data = offerProvideForm.getValue();
                    
                    this.trigger('form:submit',data)
                }
                
            }
        });
    });
    
    return AppManager.OffersModule.Common.Views;
});