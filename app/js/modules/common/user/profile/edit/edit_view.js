define([
    'app',
    'utt.stages',
    'tpl!modules/common/user/profile/edit/templates/form.tpl',
    'backbone.forms',
    'backbone.forms.bootstrap',
    'css!vendors/bower/backbone-forms/css/bootstrap3.css',
    
    'vendors/tags.min'
], function(AppManager, UttStages, formTpl){
    
    // UsersModule Edit View
    AppManager.module('UsersModule.Edit.View', function(View, AppManager, Backbone, Marionette, $, _){
        
        var API = new UttStages.Application(AppManager);
        
        View.User = Marionette.ItemView.extend({
            template: formTpl,
            editUserForm: '',
            data : '',
            onRender: function(){
                
                var title = this.options.title;
                
                data = this.options.model.attributes;
                data.pwdConfirm = data.pwd;
                
                //  New model with just a schema
                var bbformSchema = Backbone.Model.extend({
                    schema: {
                        firstName:   { type: 'Text', validators: ['required'] },
                        lastName:   { type: 'Text', validators: ['required'] },
                        email:   { type: 'Text', validators: ['required', 'email'] },
                        pwd:   { type: 'Password', validators: ['required', { type: 'match', field: 'pwdConfirm', message: 'Passwords must match!' }] },
                        pwdConfirm:   { type: 'Password', validators: ['required', { type: 'match', field: 'pwd', message: 'Passwords must match!' }] }
                    }
                });
                
               
                //  The schema of the future bbform
                var bbformModel = new bbformSchema(this.formatSpecificData(data));
                
                
                var self = this;
                setTimeout(function(){

                    //  New bbform with a template
                    editUserForm = new Backbone.Form({
                        template: _.template($('#editUserTemplate').html()),
                        model: bbformModel
                    }).render();

                    //  Put the form before submit btn
                    $('button.js-submit').before(editUserForm.el);
                    
                    //  Add title
                    $('h6.panel-title').append(title);
                    
                    //  Tags
                    //$('#form-tags input').tagsInput({width:'100%'});
                    
                    //  To set blur event listener
                    API.views.forms.setBlurListener(editUserForm, bbformModel);
                    
                    
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

                if( API.views.forms.isFormValid(editUserForm) ){
                    var data = editUserForm.getValue();
                    
                    this.trigger('form:submit',data)
                }
                
            }

        });
        
    });
    
    return AppManager.UsersModule.Edit.View;
})