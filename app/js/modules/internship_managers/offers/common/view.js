define([
    'app',
    'utt.stages',
    'tpl!modules/internship_managers/offers/common/templates/form.tpl',
    'backbone.forms',
    'css!vendors/bower/backbone-forms/css/bootstrap3.css',
    'vendors/bower/backbone-forms/js/bootstrap3'
], function(AppManager, UttStages, formTpl){
    
    // OffersModule Common Views (Use by 'edit' & 'new' because same logic and template)
    AppManager.module('OffersModule.Common.Views', function(Views, AppManager, Backbone, Marionette, $, _){
        
        var API = new UttStages.Application(AppManager);
        
        Views.Form = Marionette.ItemView.extend({
            template: formTpl,
            form: '',
            
            onRender: function(){

                var title = this.options.title;
                
                var companies = [];//Get companies
                
                var Offer = Backbone.Model.extend({
                    schema: {
                        type:   { type: 'Select', validators: ['required'], options: ['TN07','TN09','TN10','Alternance'] },
                        department: { type: 'Select', validators: ['required'], options: ['ISI', 'SRT', 'SM', 'MTE', 'SI', 'Master'] },
                        departmentSpec: { type: 'Select', validators: ['required'], options: this.getDepartmentSpec('ISI') },
                        ref:    { type:'Text', validators: ['required'] },
                        address:    { type:'Text', validators: ['required'] },
                        company:    { type: 'Select', validators: ['required'], options: ['test'] },
                        descriptionMission:   { type:'Text', validators: ['required'] },
                        descriptionProfile:   { type:'Text', validators: ['required'] },
                        descriptionRem:   { type:'Number', validators: ['required'] },
                        tags: { type:'Text', validators: ['required'] }
                    }
                });

                var offer = new Offer();
                var self = this;
                setTimeout(function(){

                    form = new Backbone.Form({
                        template: _.template($('#formTemplate').html()),
                        model: offer
                    }).render();

                    $('button.js-submit').before(form.el);
                    
                    $('h6.panel-title').append(title);
                    
                    var blured = '';
                    _.each(offer.schema, function(value, key){
                        blured += key+":blur ";
                    });
                    
                    form.on(blured, function(form, editor) {
                        var error = form.fields[editor.key].validate();
                        API.views.forms.markError(editor.key, error);
                    });
                },300);
            },
            
            getDepartmentSpec: function(_department){
                
                switch(_department){
                    case 'ISI':
                        return ['MPL', 'MSI', 'MRI'];
                        break;
                    
                    case 'SRT':
                        return [];
                        break;
                    
                    default :
                        break;
                }
                
                return [];
            },
            
            events: {
                'click button.js-submit': 'eSubmitClicked'
            },
            
            eSubmitClicked: function(_e){
                _e.preventDefault();

                var errors = form.commit();
                
                if ( !_.isEmpty(errors)) {
                    var self = this;
                    _.each(errors, function(_value, _key){
                        API.views.forms.markError(_key, _value);
                    });
                }
                else{
                    var data = form.getValue();
                    console.log(data);
                }
            }
        });
    });
    
    return AppManager.OffersModule.Common.Views;
});