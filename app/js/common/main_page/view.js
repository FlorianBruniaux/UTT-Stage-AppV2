define([
    'app',
    'utt.stages',
    'tpl!common/main_page/templates/main_page.tpl',
], function(AppManager, UttStages, mainPageTpl){
    
    // MainPage
    AppManager.module('Common.MainPage.View', function(View, AppManager, Backbone, Marionette, $, _){
        
        var API = new UttStages.Application(AppManager);
        
        View.mainPage = Marionette.ItemView.extend({
            template: mainPageTpl,
            onRender: function(){
                
                var self = this;
                
                setTimeout(function(){
                    
                    AppManager.trigger('menu:start');

                    API.misc.initCollapsibleMenu();
                    
                    $('#app-version').html("<b>Version</b> : "+polyglot.t(self.options.userCategory));
                    
                },50)
            }
        });
        
    });

    return AppManager.Common.MainPage.View;
})