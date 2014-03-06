define([

],function() {

    var API = {
        
        getEntities : function(_collection){
            
            if(DEBUG) console.info('common.entities_helpers.API.getEntities()');
            
            var defer = $.Deferred();  
            _collection.fetch({
                success: function(data){
                    defer.resolve(data);
                }
            });
            return defer.promise();
        },
        
        getEntity : function(_entity){
            
            if(DEBUG) console.info('common.entities_helpers.API.getEntity()');
            
            var defer = $.Deferred();  
            setTimeout(function(){
                _entity.fetch({
                    success: function(data){
                        defer.resolve(data);
                    },
                    error: function(data){
                        defer.resolve(undefined);
                    }
                });
            }, 2000);
            return defer.promise();
        }
    }
    
    return API;
    
});

