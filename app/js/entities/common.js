define([
    'app'
], function(AppManager){
    
    // COMMON ENTITIES
    AppManager.module('Entities', function(Entities, AppManager, Backbone, Marionette, $, _){
        
        Entities.FilteredCollection = function(_options){
            
            var original = _options.collection,
                filtered = new original.constructor();
            
            filtered.add(original.models);
            filtered.filterFunction = _options.filterFunction;
            
            var applyFilter = function(_filterCriterion, _searchedValue, _filterStrategy, _collection){
                var collection = _collection || original,
                    criterion,
                    value;
                
                if (_filterStrategy === 'filter') {
                    criterion = _filterCriterion.trim();
                    value = _searchedValue.trim();
                }else{
                    criterion = _filterCriterion;
                    value = _searchedValue;
                }
                
                var items = [];
                if (criterion && value) {
                    if (_filterStrategy === 'filter') {
                        if (!filtered.filterFunction) {
                            throw("You're trying to use a filter function but none is defined...")
                        }
                    
                        var filterFunction = filtered.filterFunction(criterion, value);
                        items = collection.filter(filterFunction);
                    }else{
                        items = collection.where(criterion, value);
                    }
                }else{
                    items = collection.models;
                }
                
                //To store current criterion
                filtered.currentCriterion = criterion;
                filtered.currentValue = value;
                
                return items;
            };
            
            filtered.filter = function(_filterCriterion, _searchedValue){
                filtered.currentFilter = 'filter';
                var items = applyFilter(_filterCriterion, _searchedValue, 'filter');
                
                //To reset the filtered collection with the new items
                filtered.reset(items);
                return filtered;
            };
            
            filtered.where = function(_filterCriterion, _searchedValue){
                filtered.currentFilter = 'where';
                var items = applyFilter(_filterCriterion, _searchedValue, 'where');
                
                //To reset the filtered collection with the new items
                filtered.reset(items);
                return filtered;
            };
            
            //To re-filter the filtered collection when the orignal one is reset.
            original.on('reset', function(){
                var items = applyFilter(filtered.currentCriterion, filtered.currentValue, filtered.currentFilter);
                
                //To reset the filtered collection with the new items
                filtered.reset(items);
            });
            
            // If the original collection gets models added to it:
            // 1. create a new collection
            // 2. filter it
            // 3. add the filtered models (the one which were added *and* match the filtering criterion)
            //    to the 'filtered' collection
            original.on('add', function(_models){
               var coll = new original.constructor();
               coll.add(_models);
               
               var items = applyFilter(filtered.currentCriterion, filtered.currentValue, filtered.currentFilter, coll);
               filtered.add(items);
            });
        
            return filtered;
        };
    });
    
    return AppManager.Entities.FilteredCollection;
});