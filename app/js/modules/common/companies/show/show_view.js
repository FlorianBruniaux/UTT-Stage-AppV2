define([
    'app',
    'utt.stages',
    'tpl!modules/common/companies/show/templates/company_details.tpl',
    'bootbox'
], function(AppManager, UttStages, companyDetailsTpl, Bootbox){
    
    // CompaniesModule Show View
    AppManager.module('CompaniesModule.Show.View', function(View, AppManager, Backbone, Marionette, $, _){
        
        var API = new UttStages.Application(AppManager);
        
        View.Company = Marionette.ItemView.extend({
            template: companyDetailsTpl,
            onRender: function(){
                var self = this;
                //  Geocomplete
                require(['async!http://maps.googleapis.com/maps/api/js?libraries=places&sensor=false', 'jquery', 'geocomplete'], function () {
                    
                    $('#geocomplete').geocomplete({
                        map: '#map',
                        location: self.options.model.get('fullAddress')
                    });

                });
            },
            events: {
                //  Internship managers
                'click .js-modify': 'modifyClicked',
                'click .js-delete': 'eDeleteClicked'
            },
            
            //  Internship_managers -> to modify the company
            modifyClicked: function(_e){
                
                _e.preventDefault();
                this.trigger('internship_managers:company:edit');
                
            },
            
            eDeleteClicked: function(_e){
                
                _e.preventDefault();
                _e.stopPropagation();
                
                var self = this;
 
                Bootbox.dialog({
                    message: 'Supprimer cette entrerprise supprimera également les offres (et le suivi de ces offres) qui lui sont liés (dans le cas où il y en a un)',
                    title: 'Justification de la suppression',
                    buttons: {
                        default: {
                            label: 'Annuler',
                            className: 'btn-default',
                            callback: function() {
                                this.close();
                            }
                        },
                        danger: {
                            label: 'Supprimer',
                            className: 'btn-danger',
                            callback: function() {

                                //var resourceLinkedDeleted = self.deleteLinkedResources(self);
                                 
                                //$.when(resourceLinkedDeleted).done(function(_data){
                                    
                                    self.model.destroy();
                                    
                                    setTimeout(function(){
                                        AppManager.trigger('companies:list');
                                    },500)
                                    
                                //});
                                
                            }
                        }
                    }
                });
                
            },
            
            /*
            deleteLinkedResources : function(_self){
                
                var defer = $.Deferred();
                
                var fetchingOffers = AppManager.request('offers:entities'),
                    fetchingMonitoring = AppManager.request('monitoring:entities');
                
                $.when(fetchingOffers, fetchingMonitoring).done(function(_offers, _monitoring){

                    var filteredOffers = API.entities.filterCollection(_offers);
                    filteredOffers.filter('company._id', _self.model.get('_id'));
                    
                    console.log('nb offers = '+filteredOffers.length);
                    
                    for (var i in filteredOffers.models) {

                        console.log('--------------------------------------');
                        
                        var filteredMonitoring = API.entities.filterCollection(_monitoring);
                        filteredMonitoring.filter('offer._id', filteredOffers.models[i].get('_id'));
                        
                        console.log('nb monitoring = '+filteredMonitoring.length);
                        
                        if (filteredMonitoring.length >0) {
                            for (var j in filteredMonitoring.models) {
                                
                                console.log(filteredMonitoring.models[j]);
                                filteredMonitoring.models[j].destroy();
                                
                                
                                if (parseInt(j)+1 == filteredMonitoring.length) {
                                    
                                    setTimeout(function(){
                                        console.log(filteredOffers.models[i]);
                                        filteredOffers.models[i].destroy();
                                        
                                        if (parseInt(i)+1 == filteredOffers.length) {
                                            setTimeout(function(){
                                                defer.resolve('Resources linked deleted'); 
                                            },1000) 
                                        }
                                    },1000);
                                }
                                
                                
                            };
                        }
                        //else{
                            console.log(filteredOffers.models[i]);
                            filteredOffers.models[i].destroy();
                            
                            if (parseInt(i)+1 == filteredOffers.length) {
                                setTimeout(function(){
                                    defer.resolve('Resources linked deleted'); 
                                },1000) 
                            }
                        //}
   
                    };

                });
                
                return defer.promise();
            }
            */
            
        });
        
    });
    
    return AppManager.CompaniesModule.Show.View;
})