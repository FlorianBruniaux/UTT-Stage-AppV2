define([
    'app',
    'utt.stages',
    'tpl!common/breadcrumb/list/templates/list.tpl',
    'tpl!common/breadcrumb/list/templates/list_item.tpl'
], function(AppManager, UttStages, ListTpl, ListItemTpl){
    
    AppManager.module('BreadcrumbModule.List.View', function(View, AppManager, Backbone, Marionette, $, _){

        var API = new UttStages.Application(AppManager);
     
        View.BreadcrumbItems = Marionette.ItemView.extend({
            template: ListItemTpl,
            tagName: 'li',
            events: {
                'click a': 'navigate'
            },
            navigate: function(_e){
                _e.preventDefault();
                this.trigger('navigate', this.model);
            }
        });
        
        View.Breadcrumb = Marionette.CompositeView.extend({
            template: ListTpl,
            itemView: View.BreadcrumbItems,
            itemViewContainer: 'ol',
            onRender: function(){
                var languageSelected = API.i18n.getPreferedLanguage();
                
                setTimeout(function(){
                    console.log(languageSelected);
                
                    languageNotSelected = (languageSelected == 'fr') ? 'en' : 'fr';
                    
                    console.log(languageNotSelected);
                    
                    $("li.language a span#selected-language").html('<img src="images/flags/'+languageSelected+'.png" height="18" alt="'+ polyglot.t(languageSelected)+'"> : '+ polyglot.t(languageSelected));
                    $("li.language ul li").html('<a href="" class="'+languageNotSelected+'"><img src="images/flags/'+languageNotSelected+'.png" height="18" alt="'+ polyglot.t(languageNotSelected)+'"> : '+ polyglot.t(languageNotSelected)+'</a>')
                    
                },500)
                
                
            },
            events: {
                'click li.language ul li a': 'changeLanguageClicked'
            },
            
            changeLanguageClicked: function(_e){
                _e.preventDefault();
                
                API.cookies.delete('UttStagesLanguagePref');
                API.cookies.create('UttStagesLanguagePref', $(_e.currentTarget).attr('class'), 7);

                window.location.reload();
            } 
        });

    });

    return AppManager.BreadcrumbModule.List.View;
})