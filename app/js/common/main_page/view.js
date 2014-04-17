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
                setTimeout(function(){
                    AppManager.trigger('menu:start');

                    API.misc.initCollapsibleMenu();
                },50)
            }
        });
        
    });

    return AppManager.Common.MainPage.View;
})