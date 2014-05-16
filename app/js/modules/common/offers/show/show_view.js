define([
    'app',
    'tpl!modules/common/offers/show/templates/offer_details.tpl',
    'bootbox'
], function(AppManager, offerDetailsTpl, Bootbox){
    
    // OffersModule Show View
    AppManager.module('OffersModule.Show.View', function(View, AppManager, Backbone, Marionette, $, _){
        
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
                'click .js-postulate': 'postulateClicked',
                'click .js-favorites': 'favoritesClicked',
                
                //  Internship managers
                'click .js-modify': 'modifyClicked',
                
                //  Teachers
                'click .js-validate': 'validateClicked',
                'click .js-refuse': 'denyClicked'
            },
            
            //  Students -> to postulate
            postulateClicked: function(_e){
                
                _e.preventDefault();
                this.trigger('students:offer:postulate');
                
            },
            
            //  Students -> to add the offer to the favorites
            favoritesClicked: function(_e){
                
                _e.preventDefault();
                this.trigger('students:offer:favorites');
                
            },
            
            //  Internship_managers -> to modify the offer
            modifyClicked: function(_e){
                
                _e.preventDefault();
                this.trigger('internship_managers:offer:edit');
                
            },
            
            //  Teachers -> to validate the offer
            validateClicked : function(_e){
                
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
            denyClicked : function(_e){
                
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