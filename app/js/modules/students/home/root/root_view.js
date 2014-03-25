define([
    'app',
    'tpl!modules/students/home/root/templates/root.tpl',
    'tpl!modules/students/home/root/templates/root_list_items.tpl'
], function(AppManager, ListTpl, ListItemTpl){
    
    // HomeModule Root OptionsList View
    AppManager.module('HomeModule.Root.OptionsList.View', function(View, AppManager, Backbone, Marionette, $, _){
        
        View.optionsListItem = Marionette.ItemView.extend({
            template: ListItemTpl,
            tagName: "li",
            className: "bg-info",
            
            events: {
                'click a': 'navigate'
            },
            
            navigate: function(e){
                
                if(DEBUG) console.info("home.root.list_view.navigate()")
                
                e.preventDefault();
                this.trigger('navigate', this.model);
            }
        });
        
        View.optionsList = Marionette.CompositeView.extend({
            template: ListTpl,
            itemView: View.optionsListItem,
            itemViewContainer: '.info-blocks'
        });
        
    });

    return AppManager.HomeModule.Root.OptionsList.View;
})