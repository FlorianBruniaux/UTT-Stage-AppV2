define([
    'app',
    'utt.stages',
    'tpl!modules/common/user/profile/edit/templates/form.tpl',
    'backbone.forms',
    'backbone.forms.bootstrap',
    'css!vendors/bower/backbone-forms/css/bootstrap3.css',    
    'vendors/tags.min',
    'jasnybootstrap',
    'css!vendors/bower/jasny-bootstrap/css/jasny-bootstrap.css'
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
                        mobile:   { type: 'Text', validators: ['required'] },
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
                    $('.form-actions').before(editUserForm.el);
                    
                    //  Add title
                    $('h6.panel-title').append(title);

                    //  To set blur event listener
                    API.views.forms.setBlurListener(editUserForm, bbformModel);
   
                },300);
                
            },
            
            checkBase64Image: function(_view, _nom){
                
                if ($('#image-encoded').children().length > 0) {
                    imageContent = $('#image-encoded img').attr('src');
                
                    if (imageContent.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/)) {
                        _view.trigger('image:upload',  _nom, imageContent);
                        return true;
                    }
                }
                return false;
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
                    
                    var photoTitle = data.firstName+'-'+data.lastName;
                    if (this.checkBase64Image(this, photoTitle)) {
                        data.photoUrl = 'images/photos/users/'+photoTitle+'.png';
                    }
                    
                    this.trigger('form:submit',data)
                }
                
            }

        });
        
    });
    
    return AppManager.UsersModule.Edit.View;
})