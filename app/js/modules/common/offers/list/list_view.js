define([
    'app',
    'utt.stages',
    'tpl!modules/common/offers/list/templates/list.tpl',
    'tpl!modules/common/offers/list/templates/list_item.tpl',
    'vendors/tags.min',
    'backbone.forms',
    'backbone.forms.bootstrap',
    'css!vendors/bower/backbone-forms/css/bootstrap3.css',
], function(AppManager, UttStages, listTpl, listItemTpl){
    
    // OffersModule List View
    AppManager.module('OffersModule.List.View', function(View, AppManager, Backbone, Marionette, $, _){
    
        var API = new UttStages.Application(AppManager);
        
        View.Offer = Marionette.ItemView.extend({
            tagName: 'tr',
            template: listItemTpl,
            events: {
                'click td a.js-show': API.views.events.showClicked
            }
        })
        
        View.Offers = Marionette.CompositeView.extend({
            template: listTpl,
            itemView: View.Offer,
            itemViewContainer: 'tbody',
            form: '',
            data: {},
            defaultFilters : {
                tags: '',
                fullAddress: '',
                type : API.utt.getInternshipTypes(),
                department: API.utt.getDepartments(),
                perimeter : '> 200 km'
            },
            
            initialize: function(){
                
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
                    //params.fullAddress = (params.fullAddress) ? params.fullAddress : this.defaultFilters.fullAddress;
                    params.perimeter = (params.localization) ? params.perimeter : this.defaultFilters.perimeter;
                    this.data = params;
                }
                
                
                //  The schema of the future bbform
                var bbformModel = new bbformSchema(this.data);
                
                var self = this;
                setTimeout(function(){

                    //  New bbform with a template
                    form = new Backbone.Form({
                        template: _.template($('#formTemplate').html()),
                        model: bbformModel
                    }).render();
                    
                    $('.panel-body').html(form.el);
                    
                    API.views.forms.initUniformPlugin();
                    
                    setTimeout(function(){
                        $('#form-tags input').tagsInput({
                            'width'     :'100%',
                            'onAddTag'  : function(){
                                //if ($('#form-tags input').val() != self.data.tags) {
                                    self.data.tags = $('#form-tags input').val();
                                    setTimeout(function(){
                                        self.filterOffers();    
                                    },500)  
                                //} 
                            },
                            'onRemoveTag'  : function(){
                                //if ($('#form-tags input').val() != self.data.tags) {
                                    self.data.tags = $('#form-tags input').val();
                                    setTimeout(function(){
                                        self.filterOffers();    
                                    },500)  
                                //} 
                            }
                            
                        });
                        
                        require(['async!http://maps.googleapis.com/maps/api/js?libraries=places&sensor=false', 'jquery', 'geocomplete'], function () {
                            $("#form-fullAddress input").geocomplete({
                                location: ((params.fullAddress) ? params.fullAddress : '')
                            }).bind("geocode:result", function(event, result){
                                
                                if (result.formatted_address != self.data.fullAddress) {
                                    console.log('!=');
                                    self.data.lat = result.geometry.location.k;
                                    self.data.lng = result.geometry.location.A;
                                    self.filterOffers();
                                }
                                
                            });;
                        });
                    }, 500);
                    
                    
                    
                    
                   
                    
                    //  If department value change -> change department spec options
                    form.on('perimeter:change', function(form, editor) {
                        
                        self.data.perimeter = editor.getValue() ;

                        //self.filterOffers();
                        
                    });
                    
                    //  If department value change -> change department spec options
                    form.on('department:change', function(form, editor) {
                        
                        self.data.department = [];
                         
                        $('input[name="department"]:checked').each(function() {
                            self.data.department.push(this.value);
                        });
                        
                        self.filterOffers()
                    });
                    
                    //  If department value change -> change department spec options
                    form.on('type:change', function(form, editor) {
                        
                        self.data.type = [];
                        
                        $('input[name="type"]:checked').each(function() {
                            self.data.type.push(this.value);
                        });
                        
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
                    //params += 'lat='+this.data.lat+'&'+'lng='+this.data.lng+'&perimeter='+(this.data.perimeter).slice(0,-2);
                    params += 'fullAddress='+$("#form-fullAddress input").val()+'&loc='+this.data.lat+','+this.data.lng+','+(this.data.perimeter).slice(0,-2);
                }
                
                params = this.cleanParams(params, ['&',',']);

                //console.log(params);
                
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