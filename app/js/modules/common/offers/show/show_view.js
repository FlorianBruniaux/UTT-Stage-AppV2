define([
    'app',
    'utt.stages',
    'tpl!modules/common/offers/show/templates/offer_details.tpl',
    'bootbox',
    'socket.io'
], function(AppManager, UttStages, offerDetailsTpl, Bootbox, io){
    
    // OffersModule Show View
    AppManager.module('OffersModule.Show.View', function(View, AppManager, Backbone, Marionette, $, _){
        
        var API = new UttStages.Application(AppManager);
        
        View.Offer = Marionette.ItemView.extend({
            template: offerDetailsTpl,
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
                //  Students
                'click .js-postulate': 'ePostulateClicked',
                'click .js-favorites': 'eFavoritesClicked',
                'click .js-delete-from-favorites' : 'eRemoveFromFavoritesClicked',
                
                //  Internship managers
                'click .js-modify': 'eModifyClicked',
                'click .js-provide': 'eProvideClicked',
                'click .js-delete': 'eDeleteClicked',
                
                //  Teachers
                'click .js-validate': 'eValidateClicked',
                'click .js-refuse': 'eDenyClicked'
            },
            
            //  Students -> to postulate
            ePostulateClicked: function(_e){
                
                _e.preventDefault();
                
                var self = this;
                
                Bootbox.dialog({
                    message: '<br/>',
                    title: 'Confirmation',
                    buttons: {
                        cancel: {
                            label: polyglot.t('cancel'),
                            className: 'btn-default'
                        },
                        main: {
                            label: polyglot.t('postulate'),
                            className: 'btn-success',
                            callback: function() {
                                self.trigger('students:offer:postulate');
                            }
                        }
                    }
                });
                
            },
            
            //  Students -> to add the offer to the favorites
            eFavoritesClicked: function(_e){
                
                _e.preventDefault();
                
                var self = this;
                
                Bootbox.dialog({
                    message: '<br/>',
                    title: 'Confirmation',
                    buttons: {
                        cancel: {
                            label: polyglot.t('cancel'),
                            className: 'btn-default'
                        },
                        main: {
                            label: polyglot.t('offer.addToFavorites'),
                            className: 'btn-success',
                            callback: function() {
                                self.trigger('students:offer:favorites');
                            }
                        }
                    }
                });
                
            },
            
            //  Students -> to remove the offer from favorites
            eRemoveFromFavoritesClicked: function(_e){
                
                _e.preventDefault();
                
                var self = this;
                
                Bootbox.dialog({
                    message: '<br/>',
                    title: 'Confirmation',
                    buttons: {
                        cancel: {
                            label: polyglot.t('cancel'),
                            className: 'btn-default'
                        },
                        main: {
                            label: polyglot.t('offer.removeFromFavorites'),
                            className: 'btn-danger',
                            callback: function() {
                                self.trigger('students:offer:favorites:delete');
                            }
                        }
                    }
                });
                
            },
            
            //  Internship_managers -> to modify the offer
            eModifyClicked: function(_e){
                
                _e.preventDefault();
                this.trigger('internship_managers:offer:edit');
                
            },
            
            eDeleteClicked: function(_e){
                
                _e.preventDefault();
                _e.stopPropagation();
                
                var self = this;
 
                Bootbox.dialog({
                    message: polyglot.t('delete.offer.warning'),
                    title: 'Confirmation',
                    buttons: {
                        default: {
                            label: polyglot.t('cancel'),
                            className: 'btn-default',
                            callback: function() {
                                this.close();
                            }
                        },
                        danger: {
                            label: polyglot.t('delete'),
                            className: 'btn-danger',
                            callback: function() {

                                var resourceLinkedDeleted = self.deleteLinkedResources(self);
                                
                                $.when(resourceLinkedDeleted).done(function(_data){
                                    self.model.destroy();
                                    
                                    setTimeout(function(){
                                        //  To inform listeners
                                        var socket = io.connect("http://127.0.0.1:8080");
                                        socket.emit('offer:deleted');
                                    
                                        AppManager.trigger('offers:list');
                                    },200)
                                });
 
                            }
                        }
                    }
                });
                
            },
            
            deleteLinkedResources : function(_self){
                
                var defer = $.Deferred();
                
                var fetchingMonitoring = AppManager.request('monitoring:entities');
                $.when(fetchingMonitoring).done(function(_monitoring){

                    var filteredMonitoring = API.entities.filterCollection(_monitoring);
                    filteredMonitoring.filter('offer._id', _self.model.get('_id'));
                    
                    if (filteredMonitoring.length > 0) {
                        
                         
                        for (var i in filteredMonitoring.models) {

                            filteredMonitoring.models[i].destroy();

                            if (parseInt(i+1) == filteredMonitoring.length || filteredMonitoring.length == 0) {
                                
                                setTimeout(function(){
                                    defer.resolve('Resources linked deleted'); 
                                },500) 
                            }
                        };
                    }
                    else{
                        defer.resolve('Resources linked deleted'); 
                    }
                    
                });
                
                return defer.promise();
                
            },
            
            //  Internship_managers -> to link the offer to the student who has been selected
            eProvideClicked: function(_e){
                
                _e.preventDefault();
                this.trigger('internship_managers:offer:provide');
                
            },
            
            //  Teachers -> to validate the offer
            eValidateClicked : function(_e){
                
                _e.preventDefault();
                
                var self = this;
                
                Bootbox.dialog({
                    message:'<input class="form-control" type="text" id="prompt-message" placeholder="'+polyglot.t('yourMessage')+'"></input>',
                    title: 'Justification',
                    buttons: {
                        cancel: {
                            label: polyglot.t('cancel'),
                            className: 'btn-default'
                        },
                        main: {
                            label: polyglot.t('offer.validate'),
                            className: 'btn-success',
                            callback: function() {
                                self.trigger('teachers:offer:validate', $('#prompt-message').val())
                            }
                        }
                    }
                });
            },
            
            //  Teachers -> to deny the offer
            eDenyClicked : function(_e){
                
                _e.preventDefault();
                
                var self = this;
                
                Bootbox.dialog({
                    message:'<input class="form-control" type="text" id="prompt-message" placeholder="'+polyglot.t('yourMessage')+'"></input>',
                    title: 'Justification',
                    buttons: {
                        cancel: {
                            label: polyglot.t('cancel'),
                            className: 'btn-default'
                        },
                        main: {
                            label: polyglot.t('offer.deny'),
                            className: 'btn-danger',
                            callback: function() {
                                self.trigger('teachers:offer:deny', $('#prompt-message').val())
                            }
                        }
                    }
                });
            }
        });
        
    });
    
    return AppManager.OffersModule.Show.View;
})