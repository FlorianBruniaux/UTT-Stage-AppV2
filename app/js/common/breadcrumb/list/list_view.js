define([
    'app',
    'tpl!common/breadcrumb/list/templates/list.tpl',
    'tpl!common/breadcrumb/list/templates/list_item.tpl'
], function(AppManager, ListTpl, ListItemTpl){
    
    AppManager.module('BreadcrumbModule.List.View', function(View, AppManager, Backbone, Marionette, $, _){

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
            itemViewContainer: 'ol'
        });

    });

    return AppManager.BreadcrumbModule.List.View;
})