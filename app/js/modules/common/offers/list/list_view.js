define([
    'app',
    'utt.stages',
    'tpl!modules/common/offers/list/templates/list.tpl',
    'tpl!modules/common/offers/list/templates/list_item.tpl',
    'tpl!modules/common/offers/list/templates/provided_list.tpl',
    'tpl!modules/common/offers/list/templates/provided_list_item.tpl',
    'socket.io',
    'vendors/tags.min',
    'backbone.forms',
    'backbone.forms.bootstrap',
    'css!vendors/bower/backbone-forms/css/bootstrap3.css',
    'async!http://maps.googleapis.com/maps/api/js?libraries=places&sensor=false',
    'geocomplete'
], function(AppManager, UttStages, listTpl, listItemTpl, providedListTpl, providedListItemTpl, io){
    
    // OffersModule List View
    AppManager.module('OffersModule.List.View', function(View, AppManager, Backbone, Marionette, $, _){
    
        var API = new UttStages.Application(AppManager);
        
        var isProvidedMode;
        
        View.Offer = Marionette.ItemView.extend({
            tagName: 'tr',
            
            initialize: function(){
                this.template = ((isProvidedMode == true) ? providedListItemTpl: listItemTpl);
            },
            events: {
                'click td a.js-show': API.views.events.showClicked
            }
        })
        
        View.Offers = Marionette.CompositeView.extend({
            
            itemView: View.Offer,
            itemViewContainer: 'tbody',
            searchForm: '',
            data: {},
            defaultFilters : {
                tags: '',
                fullAddress: '',
                lat:'',
                lng:'',
                type : API.utt.getInternshipTypes(),
                department: API.utt.getDepartments(),
                perimeter : '> 200 km'
            },
            
            initialize: function(){

                //  To update view when a new offer is created
                socket = io.connect("http://127.0.0.1:8080");
                socket.on('update:offers:list:view', function () {
                    $('#new-offer-msg').fadeIn(800).fadeOut(800);
                    setTimeout(function(){
                        AppManager.trigger('offers:list')
                    }, 1600);
                });
                
                isProvidedMode = this.options.isProvidedMode;
                this.template = ((isProvidedMode == true) ? providedListTpl: listTpl),
                
                setTimeout(function(){
                    API.misc.initDataTable();
                }, 100);
                
            },
            
            onRender: function(){
                
                //  New model with just a schema
                var bbformSchema = Backbone.Model.extend({
                    schema: {
                        tags:   { type:'Text' },
                        fullAddress:   { type: 'Text', editorAttrs: { style: "height: 40px;", placeholder : "Localization" }},
                        perimeter:   { type: 'Select',  editorAttrs: { style: "height: 40px;" }, options: ['2 km', '5 km', '10 km', '20 km', '50 km', '100 km', '200 km', '> 200 km'] },
                        department:   { type: 'Checkboxes', editorAttrs: {class :"checkbox-inline checkbox-info" }, options: API.utt.getDepartments() },
                        type:   { type: 'Checkboxes', editorAttrs: {class :"checkbox-inline checkbox-info" }, options: API.utt.getInternshipTypes() }
                    }
                });
                
                var params = this.options.params;
                
                if ( _.isEmpty(params)) {
                    this.data = this.defaultFilters;
                }
                else{
                    params.department = (params.department && params.department != 'all') ? params.department.split(',') : this.defaultFilters.department;
                    params.type = (params.type && params.type != 'all') ? params.type.split(',') : this.defaultFilters.type;
                    params.tags = (params.tags) ? params.tags : this.defaultFilters.tags;
                    params.fullAddress = (params.fullAddress) ? params.fullAddress : this.defaultFilters.fullAddress;
                    params.perimeter = ((params.loc) ? params.loc.split(',')[2]+' km' : this.defaultFilters.perimeter);
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
                    
                    setTimeout(function(){
                        $('#form-tags input').tagsInput({
                            'width'     :'100%',
                            'onAddTag'  : function(){
                                
                                self.data.tags = $('#form-tags input').val();
                                setTimeout(function(){
                                    self.filterOffers();    
                                },500)  
                                
                            },
                            'onRemoveTag'  : function(){
                                
                                self.data.tags = $('#form-tags input').val();
                                setTimeout(function(){
                                    self.filterOffers();    
                                },500)  
                                
                            }
                            
                        });
                          
                        $("#form-fullAddress input").geocomplete({
                            
                        }).bind("geocode:result", function(event, result){
                            
                            self.data.fullAddress = $("#form-fullAddress input").val();
                            self.data.lat = result.geometry.location.k;
                            self.data.lng = result.geometry.location.A;
                            
                            setTimeout(function(){
                                self.filterOffers();
                            },500) 

                        });

                    }, 500);
                    

                    //  If department value change -> change department spec options
                    searchForm.on('perimeter:change', function(form, editor) {
                        self.data.perimeter = editor.getValue() ;
                        $("#form-fullAddress input").geocomplete("find",  $("#form-fullAddress input").val());
                    });
                    
                    //  If department value change -> change department spec options
                    searchForm.on('department:change', function(form, editor) {
                        self.data.department = editor.getValue();
                        self.filterOffers()
                    });
                    
                    //  If department value change -> change department spec options
                    searchForm.on('type:change', function(form, editor) {
                        self.data.type = editor.getValue();
                        self.filterOffers();
                    });
                    
                },200);
                
            },
            
            filterOffers: function(){
                
                var params = "";

                if (this.data.tags && this.data.tags != '') {
                    params += 'tags='+this.data.tags+'&';
                }
                
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
                
                
                if ( (this.data.lat && this.data.lat != "") && (this.data.lng && this.data.lng != "")) {
                    params += 'fullAddress='+this.data.fullAddress.replace(' ','')+'&loc='+this.data.lat+','+this.data.lng+','+(this.data.perimeter).slice(0,-2);
                }
                else if (this.data.loc){
                    
                    var arr = this.data.loc.split(','),
                        lat = arr[0],
                        lng = arr[1],
                        perimeter = arr[2]
                        
                    params += 'fullAddress='+this.data.fullAddress.replace(' ','')+'&loc='+lat+','+lng+','+perimeter;
                }
                
                params = this.cleanParams(params, ['&',',']);

                //  To filter the offers with new params
                AppManager.trigger('offers:filter', params);
                
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
    
    return AppManager.OffersModule.List.View;
})