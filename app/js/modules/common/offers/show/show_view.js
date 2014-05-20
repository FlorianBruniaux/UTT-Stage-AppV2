define([
    'app',
    'utt.stages',
    'tpl!modules/common/offers/show/templates/offer_details.tpl',
    'bootbox'
], function(AppManager, UttStages, offerDetailsTpl, Bootbox){
    
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
                
                //  Internship managers
                'click .js-modify': 'eModifyClicked',
                'click .js-provide': 'eProvideClicked',
                'click .js-delete': API.views.events.deleteClicked,
                
                //  Teachers
                'click .js-validate': 'eValidateClicked',
                'click .js-refuse': 'eDenyClicked'
            },
            
            //  Students -> to postulate
            ePostulateClicked: function(_e){
                
                _e.preventDefault();
                this.trigger('students:offer:postulate');
                
            },
            
            //  Students -> to add the offer to the favorites
            eFavoritesClicked: function(_e){
                
                _e.preventDefault();
                this.trigger('students:offer:favorites');
                
            },
            
            //  Internship_managers -> to modify the offer
            eModifyClicked: function(_e){
                
                _e.preventDefault();
                this.trigger('internship_managers:offer:edit');
                
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
                    message:'<input class="form-control" type="text" id="prompt-message" placeholder="Votre message"></input>',
                    title: 'Justification de la validation',
                    buttons: {
                        cancel: {
                            label: 'Cancel',
                            className: 'btn-default'
                        },
                        main: {
                            label: 'Valider l\'offre',
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
                    message:'<input class="form-control" type="text" id="prompt-message" placeholder="Votre message"></input>',
                    title: 'Justification du refus',
                    buttons: {
                        cancel: {
                            label: 'Cancel',
                            className: 'btn-default'
                        },
                        main: {
                            label: 'Refuser l\'offre',
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