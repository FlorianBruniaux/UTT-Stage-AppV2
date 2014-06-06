define([
    'app',
    'utt.stages',
    'tpl!modules/common/monitoring/list/templates/list.tpl',
    'tpl!modules/common/monitoring/list/templates/list_item.tpl',
    'backbone.forms',
    'backbone.forms.bootstrap',
    'css!vendors/bower/backbone-forms/css/bootstrap3.css'
], function(AppManager, UttStages, listTpl, listItemTpl){
    
    // MonitoringModule List View
    AppManager.module('MonitoringModule.List.View', function(View, AppManager, Backbone, Marionette, $, _){
    
        var API = new UttStages.Application(AppManager);
        
        View.Monitoring = Marionette.ItemView.extend({
            tagName: 'tr',
            template: listItemTpl,
            events: {
                'click td a.js-show': API.views.events.showClicked
            }
        })
        
        View.Monitoring = Marionette.CompositeView.extend({
            template: listTpl,
            itemView: View.Monitoring,
            itemViewContainer: 'tbody',
            searchForm: '',
            data: {},
            defaultFilters : {
                type : API.utt.getInternshipTypes(),
                department: API.utt.getDepartments()
            },
            
            initialize: function(){
                
                $('#form-tags input').val('');
                
                setTimeout(function(){
                    API.misc.initDataTable();
                }, 100);
                
            },
            
            onRender: function(){
                
                //  New model with just a schema
                var bbformSchema = Backbone.Model.extend({
                    schema: {
                        department:   { type: 'Checkboxes', editorAttrs: {class :"checkbox-inline checkbox-info" }, options: API.utt.getDepartments() },
                        type:   { type: 'Checkboxes', editorAttrs: {class :"checkbox-inline checkbox-info" }, options: API.utt.getInternshipTypes() }
                    }
                });
                
                var params = this.options.params;
                
                if ( _.isEmpty(params)) {
                    this.data = this.defaultFilters;
                }
                else{
                    params.department = (params.department && params.department != 'all') ? params.department.split(',') : API.utt.getDepartments();
                    params.type = (params.type && params.type != 'all') ? params.type.split(',') : API.utt.getInternshipTypes();
                    this.data = params;
                }
                
                
                //  The schema of the future bbform
                var bbformModel = new bbformSchema(this.data);
                
                var self = this;
                setTimeout(function(){

                    //  New bbform with a template
                    searchForm = new Backbone.Form({
                        template: _.template($('#searchFormTemplate').html()),
                        model: bbformModel
                    }).render();
                    
                    $('.panel-body').html(searchForm.el);
                    
                    API.views.forms.initUniformPlugin();
                    
                    //  If department value change -> 
                    searchForm.on('department:change', function(form, editor) {
                        self.data.department = editor.getValue();
                        self.filterMonitoring()
                    });
                    
                    //  If type value change -> 
                    searchForm.on('type:change', function(form, editor) {
                        self.data.type = editor.getValue();
                        self.filterMonitoring();
                    });
                    
                },200);
                
            },
            
            filterMonitoring: function(){
                
                var params = "";

                if (this.data.department.length == 5) {
                    params += 'department=all&';
                }
                else {
                    params += 'department=';
                    for(i in this.data.department){
                       params += this.data.department[i]+',';
                    }
                    
                    params = this.cleanParams(params, [',']);
                    
                    params += '&';
                }
                
                 
                if (this.data.type.length == 4) {
                    params += 'type=all&';
                }
                else {
                    params += 'type=';
                    for(i in this.data.type){
                       params += this.data.type[i]+',';
                    }
                    params = this.cleanParams(params, [',']);
                    params += '&';
                }
                
                params = this.cleanParams(params, ['&',',']);

                //  To filter the monitoring with new params
                AppManager.trigger(this.options.userCategory+':monitoring:filter', params);
                
            },
            
            cleanParams : function(_prms, _toClean){
                
                for (i in _toClean) {
                    if (_prms.match(_toClean[i]+"$")) {
                        _prms = _prms.slice(0, -1);
                    }
                }
                
                return _prms;
            }
                

        });
    });
    
    return AppManager.MonitoringModule.List.View;
})