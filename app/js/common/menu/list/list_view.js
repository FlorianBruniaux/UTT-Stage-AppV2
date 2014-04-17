define([
    'app',
    'tpl!common/menu/list/templates/list.tpl',
    'tpl!common/menu/list/templates/list_item.tpl'
], function(AppManager, ListTpl, ListItemTpl){
    
    AppManager.module('MenuModule.List.View', function(View, AppManager, Backbone, Marionette, $, _){
        
        View.MenuItems = Marionette.ItemView.extend({
            
            template: ListItemTpl,
            tagName: 'li',
            
            events: {
                'click a': 'navigate'
            },
            
            navigate: function(e){
                e.preventDefault();
                this.trigger('navigate', this.model);
            },
            
            onRender: function(){
                if (this.model.selected) {
                    //To add class to highlight the active entry in the menu
                    this.$el.addClass('active');
                };
            }
            
        });
        
        View.Menu = Marionette.CompositeView.extend({
            template: ListTpl,
            itemView: View.MenuItems,
            itemViewContainer: 'ul.navigation'
        });
        
    });

    return AppManager.MenuModule.List.View;
})