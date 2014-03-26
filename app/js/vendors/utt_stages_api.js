define([
    'bootbox'
],function(Bootbox) {

    // Save a reference to the global object (`window` in the browser, `exports` on the server).
    var root = this;
    
    // Save the previous value of the `API` variable, so that it can be
    // restored later on, if `noConflict` is used.
    var previousAPI = root.API;
    
    // The top-level namespace. All public API classes and modules will
    // be attached to this. Exported for both the browser and the server.
    var API;
    if (typeof API !== 'undefined') {
        API = exports;
    }else{
        API = root.API = {};
    }
    
    // Current version of the library. Keep in sync with `package.json`.
    API.VERSION = '0.1.0';
    
    // Require Underscore, if we're on the server, and it's not already present.
    var _ = root._;
    if (!_ && (typeof require !== 'undefined')) _ = require('underscore');
    
    // jQuery
    API.$ = root.jQuery || root.$;
    
    // Runs API.js in *noConflict* mode, returning the `API` variable
    // to its previous owner. Returns a reference to this API object.
    API.noConflict = function() {
        root.API = previousAPI;
        return this;
    };
    
    var APPMANAGER = API.AppManager = {},
    
        LOADER = API.loader = {
            init:function(){
                require([
                    'common/loader/loader_view',
                ],function(loaderView){
                    LOADER.view = loaderView;
                });
            }
        },
        
        ERROR = API.error = {
            init:function(){
                require([
                    'common/errors/view'
                ],function(errorsView){
                    ERROR.view = errorsView;
                });
            }
        };
    
    API.Application = function(_app){
        APPMANAGER = _app;
        LOADER.init();
        ERROR.init();
    };
    
    var MISC = API.Application.prototype.misc = {
        
        initDataTable: function (_id, _nbColumns){
        
            require([
                'bootstrapDataTables',
                'css!/styles/datatables/datatables.css',
                'css!/styles/datatables/bootstrap.datatables.css'
            ],function(DataTable, BootstrapDataTable) {
                
                //Inits the dataTable
                $('#'+_id).dataTable({
                    aoColumnDefs: [{
                        bSortable: false,
                        aTargets: [_nbColumns-1]
                    }],
                    "bDestroy": true
                });
                
                //DataTable css modifications
                return  $('#'+_id).each(function() {
                    var datatable, length_sel, search_input;
                    datatable = $(this);
                    search_input = datatable.closest(".dataTables_wrapper").find("div[id$=_filter] input");
                    search_input.attr("placeholder", "Recherche");
                    search_input.addClass("form-control input-sm");
                    length_sel = datatable.closest(".dataTables_wrapper").find("div[id$=_length] select");
                    length_sel.addClass("form-control input-sm");
                    length_sel = datatable.closest(".dataTables_wrapper").find("div[id$=_info]");
                    return length_sel.css("margin-top", "18px");
                });
                
            });
        },
          
        showLoader : function(){
            if (LOADER.view) {
                APPMANAGER.contentRegion.show(new LOADER.view.Loading());
            }else{
                LOADER.init();
                setTimeout(function(){
                    MISC.showLoader();
                }, 40)
            }   
        },
        
        initDropDown : function(){
            return function(){
                // To add fadeIn animation to dropdown
                $('.dropdown, .btn-group').on('show.bs.dropdown', function(e){
                    $(this).find('.dropdown-menu').first().stop(true, true).fadeIn(100);
                });
        
                // To add fadeOut animation to dropdown
                $('.dropdown, .btn-group').on('hide.bs.dropdown', function(e){
                    $(this).find('.dropdown-menu').first().stop(true, true).fadeOut(100);
                });

                // To prevent dropdown from closing on click
                $('.popup').click(function (e) {
                    e.stopPropagation();
                });
            }();
        },
        
        initCollapsibleMenu : function(){
            
            require([
                'collapsible'
            ],function(){
                return function(){
                    $('.sidebar-toggle').click(function () {
                        $('.page-container').toggleClass('sidebar-hidden');
                    });
            
                    $('.navigation li.disabled a, .navbar-nav > .disabled > a').click(function(e){
                        e.preventDefault();
                    });
                    
                    $('.sidebar-wide li:not(.disabled) .expand, .sidebar-narrow .navigation > li ul .expand').collapsible({
                        defaultOpen: 'second-level,third-level',
                        cssOpen: 'level-opened',
                        cssClose: 'level-closed',
                        speed: 150
                    });
                }();
            });
            
        }
    };
    
    var ERRORS = API.Application.prototype.errors = {
        
        e404: function(){
            if (ERROR.view) {
                APPMANAGER.contentRegion.show(new ERROR.view.e404());
            }else{
                ERROR.init();
                setTimeout(function(){
                    ERRORS.e404();
                }, 40)
            }   
        }
        
    };
    
    var AJAX = API.Application.prototype.ajax = {
        
        auth: {
            
            linkedin: {
                
                isAuth: function(_event){
    
                    $.ajax({
                        url: "/auth/linkedin/isauth",
                        type: "GET",
                        success: function(_res) {
                            
                            //  If _res == true, user is logged
                            if (_res) {
                                require([
                                    'modules/common/main_page/view'
                                ],function(mainPageView){
                                    APPMANAGER.mainlayoutRegion.show(new mainPageView.mainPage());
                                    
                                    setTimeout(function(){
                                        var userCategory = "students";
                                        APPMANAGER.trigger(userCategory+":"+_event);
                                    },500)
                                })
                               
                            }
                            else{
                                require([
                                    'modules/common/login/view',
                                ],function(loginView){
                                    APPMANAGER.mainlayoutRegion.show(new loginView.login());
                                })
                            }
                        }
                    });
                    
                }
            }
        }
        
        
        
        
    };
      
    var ENTITIES = API.Application.prototype.entities = {
        
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
        },
        
        filterCollection: function(_collection){
            
            return this.filteredCollection({
                collection: _collection,
                filterFunction: function(_filterCriterion, _searchedValue){
                    
                    var criterion = _filterCriterion,
                        value = _searchedValue;
    
                    return function(_model){
                        
                        // Split criterio to have each arg of the path in an array
                        var arr = criterion.split('.'),
                            // Get the attribute
                            obj = _model.get(arr[0]);
                        
                        function getModel(_arr, _obj) {;
                            
                            // Delete first item of the array
                            // (already used with _model.get(arr[0]))
                            _arr.splice(0, 1);
                            
                            var obj = _obj;
    
                            if(_arr.length > 0){
                                if (obj[_arr[0]]) {
                                    obj = obj[_arr[0]];
                                    // Recursive call
                                    getModel(_arr, obj)
                                }
                            }
    
                            // If the values are equals
                            if (obj.indexOf(value) !== -1) {
                                return _model;
                            }
    
                            return null;
                        }
                        
                        return getModel(arr, obj);
    
                    }
                }
            });
        },
        
        filteredCollection : function(_options){
            
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
        }
    };
    
    
    var VIEWS = API.Application.prototype.views =  {
    
        forms: {
        
            onFormDataInvalid: function(_el, _objectType,_errors){
                var $view = _el;
                
                var clearFormErrors = function(){
                    var $form = $view.find('form');
                    $form.find('.help-inline.error').each(function(){
                        $(this).remove(); 
                    });
                    $form.find('.control-group.error').each(function(){
                        $(this).removeClass('error');
                    })
                }
                
                var markErrors = function(_value, _key){
                    var $controlGroup = $view.find('#'+_objectType+'-'+_key).parent().parent();
                    var $errorEl = $('<span>', {class:'help-inline error', text: _value});
                    $controlGroup.append($errorEl).addClass('error');
                }
                
                clearFormErrors();
                _.each(_errors, markErrors);
            }
            
        },
        
        events: {
            
            navigate: function(_e){
                _e.preventDefault();
                _e.stopPropagation();
                
                this.trigger('navigate', this.model);
            },
            
            showClicked: function(_e){
                _e.preventDefault();
                _e.stopPropagation();
                
                this.trigger(this.model.get('_objectType')+':show', this.model);
            },
            
            editClicked: function(_e){
                _e.preventDefault();
                _e.stopPropagation();
                
                this.trigger(this.model.get('_objectType')+':edit', this.model);
            },
            
            deleteClicked: function(_e){
                
                _e.preventDefault();
                _e.stopPropagation();
                
                var self = this;
                
                Bootbox.dialog({
                    message: "Confirmation de la suppression ?",
                    buttons: {
                        default: {
                            label: "Annuler",
                            className: "btn-default",
                            callback: function() {
                                this.close();
                            }
                        },
                        danger: {
                            label: "Supprimer",
                            className: "btn-danger",
                            callback: function() {
                                
                                switch ( self.model.get('_objectType') ) {
                                    
                                    default:
                                        self.model.destroy();
                                
                                        setTimeout(function(){
                                             location.reload();
                                        },50);
                                        break;
                                } 
                               
                            }
                        }
                    }
                });
                
            }
        },
        
        collection: {
            
            onCompositeCollectionRendered: function(){
                
                this.appendHtml = function(collectionView, itemView, index){
                    collectionView.$el.prepend(itemView.el);
                }
            }
            
        }
    
        
    }
    
    return API;
});