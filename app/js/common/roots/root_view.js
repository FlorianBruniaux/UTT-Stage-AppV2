define([
    'app',
    'utt.stages',
    'tpl!common/roots/templates/root.tpl',
    'tpl!common/roots/templates/root_item.tpl'
], function(AppManager, UttStages, rootTpl, ItemTpl){
    
    AppManager.module('Common.Root.View', function(View, AppManager, Backbone, Marionette, $, _){
        
        var API = new UttStages.Application(AppManager);
        
        View.optionsListItem = Marionette.ItemView.extend({
            template: ItemTpl,
            tagName: 'li',
            className: 'bg-info',
            events: {
                'click a':  API.views.events.navigate
            }
        });
        
        View.optionsList = Marionette.CompositeView.extend({
            template: rootTpl,
            itemView: View.optionsListItem,
            itemViewContainer: '.info-blocks',
            onRender: function(){
                this.$('h6.panel-title').append(polyglot.t('actions.available'));
                this.trigger('rendered');
            }
        });
        
    });

    return AppManager.Common.Root.View;
})