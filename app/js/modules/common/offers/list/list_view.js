define([
    'app',
    'utt.stages',
    'tpl!modules/common/offers/list/templates/list.tpl',
    'tpl!modules/common/offers/list/templates/list_item.tpl',
    'vendors/tags.min'
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
            
            filters : {
                tags: '',
                types : ['TN07','TN09','TN10','Alternance'],
                departments : ['ISI','SRT','SI','SM','MTE'],
                localization: {
                    lat: '',
                    lng: ''
                },
                perimeter : '200+',
            },
            
            
            initialize: function(){
                
                setTimeout(function(){
                    API.misc.initDataTable();
                    API.views.forms.initUniformPlugin();
                }, 100);
                
            },
            
            onRender: function(){
                
                var self = this;
                setTimeout(function(){
                    $('#keywords').tagsInput({
                        'width'     :'100%',
                        'onChange'  : function(){
                            self.filters.tags = $('#keywords').val();
                            self.filterOffers();
                        }
                    });
                    
                    require(['async!http://maps.googleapis.com/maps/api/js?libraries=places&sensor=false', 'jquery', 'geocomplete'], function () {
                        $("#geocomplete").geocomplete({
                        }).bind("geocode:result", function(event, result){
                            self.filters.localization.lat = result.geometry.location.k;
                            self.filters.localization.lng = result.geometry.location.A;
                            self.filterOffers();
                        });;
                    });
                    
                },200);
                
            },
            
            events: {
                'change input[name="type"]': 'eTypeChanged',
                'change input[name="department"]': 'eDepartmentChanged',
                'change select#perimeter': 'ePerimeterChanged'
            },
            
            eTypeChanged: function(_e){
                _e.preventDefault();
                this.filters.types = [];
                var self = this;
                $('input[name="type"]:checked').each(function() {
                    self.filters.types.push(this.value);
                });
                this.filterOffers()
            },
            
            eDepartmentChanged: function(_e){
                _e.preventDefault();
                this.filters.departments = [];
                var self = this;
                $('input[name="department"]:checked').each(function() {
                    self.filters.departments.push(this.value);
                });
                this.filterOffers()
            },
            
            ePerimeterChanged: function(_e){
                _e.preventDefault();
                this.filters.perimeter = $(_e.currentTarget).val() ;
                var self = this;
                setTimeout(function(){
                    self.filterOffers();
                }, 50);
                
            },
            
            filterOffers: function(){
                var params = "";
                
                if (this.filters.tags.length > 0) {
                    params += 'tags='+this.filters.tags+'&';
                }
                
                if (this.filters.departments.length == 5) {
                    params += 'dept=all&';
                }else {
                    params += 'dept=';
                    for(i in this.filters.departments){
                       params += this.filters.departments[i]+',';
                    }
                    params += '&';
                }
                
                if (this.filters.types.length == 4) {
                    params += 'types=all&';
                }else {
                    params += 'types=';
                    for(i in this.filters.types){
                       params += this.filters.types[i]+',';
                    }
                    params += '&';
                }
                
                if (this.filters.localization.lat.length > 0 && this.filters.localization.lng.length > 0) {
                    params += 'lat='+this.filters.localization.lat+'&'+'lng='+this.filters.localization.lng+'&perimeter='+this.filters.perimeter;
                }
                
                if (params.match("&$")) {
                    params = params.slice(0, -1);
                }
                if (params.match(",$")) {
                    params = params.slice(0, -1);
                }
                
                AppManager.trigger('offers:filter', params);
            }

        });
    });
    
    return AppManager.OffersModule.List.View;
})