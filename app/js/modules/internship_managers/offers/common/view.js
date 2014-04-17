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
                
                var User = Backbone.Model.extend({
                    schema: {
                        title:      { type: 'Select', validators: ['required'], options: ['Mr', 'Mrs', 'Ms'] },
                        name:       { type:'Text', validators: ['required'] },
                        email:      { validators: ['required', 'email'] },
                        password:   { type:'Password', validators: ['required'] }
                    }
                });
                
                var newUser = new User();

                
                var self = this;
                
                setTimeout(function(){

                    form = new Backbone.Form({
                        template: _.template($('#formTemplate').html()),
                        model: newUser
                    }).render();

                    $('button.js-submit').before(form.el);
                    
                    $('h6.panel-title').append(title);
                    
                    form.on('title:blur name:blur email:blur password:blur', function(form, editor) {
                        var error = form.fields[editor.key].validate();
                        self.markError(editor.key, error);
                    });
                },200)
               
               
                
            },
            
            markError : function(_key, _error){
                
                var label = "";
                
                if ( ! _.isEmpty(_error) ) {
                    label = '<label class="error">'+_error.message+'</label>'
                }
                else{
                    label = '<label class="error valid"><i class="icon-checkmark"></i></label>'
                }
                
                $('#form-'+_key).parent().find('span.msg').html(label);
                
            },
            
            events: {
                'click button.js-submit': 'eSubmitClicked'
            },
            
            eSubmitClicked: function(_e){
                _e.preventDefault();

                var errors = form.commit();
                
                if ( ! _.isEmpty(errors)) {
                    var self = this;
                    _.each(errors, function(_value, _key){
                        self.markError(_key, _value);
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