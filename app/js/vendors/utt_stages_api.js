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

        initDataTable: function (){
        
            require([
                'datatables'
            ],function() {
                
                $('.datatable table').dataTable().fnDestroy();

                oTable = $('.datatable table').dataTable({
                    "bJQueryUI": false,
                    "bAutoWidth": true,
                    "sPaginationType": "full_numbers",
                    "sDom": '<"datatable-header"fl><"datatable-scroll"t><"datatable-footer"ip>',
                    "oLanguage": {
                        "sSearch": "<span>Filtre rapide:</span> _INPUT_",
                        "sLengthMenu": "_MENU_",
                        "oPaginate": { "sFirst": "<<", "sLast": ">>", "sNext": ">", "sPrevious": "<" }
                    },
                    "bDestroy": true
                });
                
            });
        },
        
        initDatepicker: function(){
            
            require([
                'bootstrapDatePicker',
                'bootstrapDatePicker.locales.fr',
                'css!vendors/bower/bootstrap-datepicker/css/datepicker3.css'
            ], function(){
                
                var dp_now = new Date();
                var five_year_ago = new Date(dp_now.getFullYear()-5, dp_now.getMonth(), dp_now.getDate());

                setTimeout(function(){
                    return $('.datepicker input').datepicker({
                        startDate: five_year_ago,
                        format: "dd/mm/yyyy",
                        weekStart: 1,
                        //language: "fr",
                        autoclose: true,
                        todayHighlight: true,
                        todayBtn: true,
                        calendarWeeks: true
                    })
                }, 500);
                
            })
          
        },
        /*
        initTimePicker: function(){
            
            require([
                'bootstrap',
                'bootstrapTimePicker',
                'css!vendors/bower/bootstrap-timepicker/css/bootstrap-timepicker.css'
            ], function(){
                
                setTimeout(function(){
                    return  $('#timepicker').timepicker({
                        minuteStep: 1,
                        template: 'modal',
                        appendWidgetTo: 'body',
                        showSeconds: true,
                        showMeridian: false,
                        defaultTime: false
                    })
                }, 500);
                
            });
          
        },
        */
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
            
        },
        
        //  To get url parameters (get)
        getParmsFromURL: function(_url) {
            var parms = {},
                pieces,
                parts,
                i;
                
            var hash = _url.lastIndexOf("#");
            
            if (hash !== -1) {
                // isolate just the hash value
                _url = _url.slice(hash + 1);
            }
            
            var question = _url.indexOf("?");
            
            if (question !== -1) {
                _url = _url.slice(question + 1);
                pieces = _url.split("&");
                for (i = 0; i < pieces.length; i++) {
                    parts = pieces[i].split("=");
                    if (parts.length < 2) {
                        parts.push("");
                    }
                    parms[decodeURIComponent(parts[0])] = decodeURIComponent(parts[1]);
                }
            }
            
            return parms;
        },
        
        getDistanceFromLatLonInKm: function (lat1,lon1,lat2,lon2) {
            var R = 6371; // Radius of the earth in km
            var dLat = MISC.deg2rad(lat2-lat1);  // MISC.deg2rad below
            var dLon = MISC.deg2rad(lon2-lon1); 
            var a = 
                Math.sin(dLat/2) * Math.sin(dLat/2) +
                Math.cos(MISC.deg2rad(lat1)) * Math.cos(MISC.deg2rad(lat2)) * 
                Math.sin(dLon/2) * Math.sin(dLon/2); 
            var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
            var d = R * c; // Distance in km
            return d;
        },
          
        deg2rad: function (deg) {
            return deg * (Math.PI/180)
        }
    };
    
    var I18N = API.Application.prototype.i18n = {
        
        init : function(){
            require([
                'polyglot'
            ],function(Polyglot){
                var userLang = I18N.getPreferedLanguage();

                $.getJSON('js/i18n/' + userLang + '.json', function(data) {
                    window.polyglot = new Polyglot({phrases: data});
                }); 
            });
        },
        
        getPreferedLanguage: function(){
            var languagePrefCookie = COOKIES.read('UttStagesLanguagePref');
            
            if (languagePrefCookie) {
                //console.log('Cookie exists !');
                return languagePrefCookie;
            }
            else{
                userLang = navigator.language || navigator.userLanguage;   
                return (userLang.indexOf('fr') > -1) ? 'fr': 'en';
            }
        }
    };
    
    var DATES = API.Application.prototype.dates = {
        
        convertToDDMMYYYY : function(_date) {
            
            var d = new Date(_date);
            
            function pad(s) {
                return (s < 10) ? '0' + s : s;
            }
            
            return [pad(d.getDate()), pad(d.getMonth()+1), d.getFullYear()].join('/');
        }
        
    };
    
    var COOKIES = API.Application.prototype.cookies = {
        
        create: function (name,value,days) {
            if (days) {
                    var date = new Date();
                    date.setTime(date.getTime()+(days*24*60*60*1000));
                    var expires = '; expires='+date.toGMTString();
            }
            else var expires = '';
            document.cookie = name+'='+value+expires+'; path=/';
        },
        
        read: function (name) {
            var nameEQ = name + '=';
            var ca = document.cookie.split(';');
            for(var i=0;i < ca.length;i++) {
                var c = ca[i];
                while (c.charAt(0)==' ') c = c.substring(1,c.length);
                if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
            }
            return null;
        },
        
        delete: function (name) {
            COOKIES.create(name,'',-1);
        }

    }
    
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
        },
        
        e500: function(){
            if (ERROR.view) {
                APPMANAGER.mainlayoutRegion.show(new ERROR.view.e500());
            }else{
                ERROR.init();
                setTimeout(function(){
                    ERRORS.e500();
                }, 40)
            }   
        }
        
    };
    
    var AJAX = API.Application.prototype.ajax = {
        
        auth: {

            isAuth: function(){

                $.ajax({
                    url: '/auth/isauth',
                    type: 'GET',
                    success: function(_res) {
                        
                        //  If _res exists and is an object
                        //  => User is logged
                        if (_res && _.isObject(_res) ) {
                            
                            //  Modules to load for each category of user
                            var common = [
                                
                                'common/main_page/view',
                                'modules/common/user/right_corner/view',
                                'modules/common/user/user_module',
                                
                                //Entities
                                'entities/common/companies',
                                'entities/common/monitoring',
                                'entities/common/offers',
                                'entities/common/users'
                            ];
                            
                            //  User category specific modules 
                            $.getJSON('js/modules/'+_res.userCategory+'/modules_to_load.json', function(_data) {
                            
                                require(_.union(common, _data.modules), function(mainPageView, rightCornerView){
                                    
                                    require([
                                        'common/menu/list/list_controller'
                                    ],function(MenuController){
                                        MenuController.init(_res.userCategory);
                                    })
                                    
                                    APPMANAGER.mainlayoutRegion.show(
                                        new mainPageView.mainPage({
                                            userCategory : _res.userCategory
                                        })
                                    );
                                        
    
                                    //  Create and Get Backbone user model (from the object sent by server)
                                    var user = APPMANAGER.request('user:entity:new', _res);
                                    user.set('penultimateConnexion', user.get('lastConnexion'));
                                    user.set('lastConnexion', new Date());
                                    user.save();
                                    
                                    //  Show user infos in top right corner
                                    APPMANAGER.profileRegion.show(new rightCornerView.rightCorner({model: user}));

                                    Backbone.history.start({pushState: false});

                                    if (APPMANAGER.getCurrentRoute() === "") {
                                        APPMANAGER.trigger(_res.userCategory+':home:root');
                                    }
                                    
                                });
                            
                            }).fail(function(){
                                ERRORS.e500();
                                setTimeout(function(){
                                    window.location.reload();
                                },2000);
                            });

                            
                           
                        }
                        else{
                            
                            require([
                                'common/login/login_controller',
                            ],function(loginController){
                                loginController.showLogin();
                            });
                            
                        }
                    }
                });
                
            },
            
            post: function(_form){
                
                require([
                    'backbone.syphon'
                ],function(){
                    
                    var jsonData = Backbone.Syphon.serialize(_form);

                    $.ajax({
                        url: _form.action,
                        type: 'POST',
                        data: jsonData,
                        dataType: 'json',
                        success: function(_res) {
                            $(_form).prepend(
                                '<label class="error valid"><i class="icon-checkmark"></i> '+_res.message+'</label><br />'
                            );
                            
                            _form.reset();
                            
                            setTimeout(function(){
                                window.location.reload();
                            },3000);
                            
                        },
                        error: function(_err){
                            $(_form).prepend(
                                '<label class="error">'+_err.responseText+'</label><br />'
                            );
                        }
                    });
                })
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
                        value = _searchedValue,
                        valueArr = value.split(',');
                    
                    return function(_model){
  
                        function getModel(_arr, _obj) {

                            var crit = _arr[0];
                            
                            // Delete first item of the array
                            // (already used with _model.get(arr[0]))
                            _arr.splice(0, 1)

                            var obj = _obj;

                             
                            if(_arr.length > 0){

                                if (obj[_arr[0]] != undefined) {
                                    obj = obj[_arr[0]];

                                    // Recursive call
                                    getModel(_arr, obj);
                                }
                            }

                            if (crit == "loc") {
                            
                                var lat = valueArr[0],
                                    lng = valueArr[1],
                                    perimeter = valueArr[2];
                                
                                if(perimeter.match('^>')){
                                    return _model;
                                }
                                else{
                                    var dist = MISC.getDistanceFromLatLonInKm(valueArr[0], valueArr[1], _model.get('lat'), _model.get('lng'));
                                    
                                    
                                    if (parseInt(dist) < parseInt(perimeter)) {
                                        return _model;
                                    }
                                    
                                }   
                            }
                            else{
                                for(var i in valueArr){
                                
                                    if (valueArr[i].trim()) {
                                        
                                        if (crit == "tags") {
                                            if (_model.get('_objectType') == 'offer') {
                                                var fieldsWhereToSearchForTags = ['company', 'title', 'mission', 'profile', 'tags'];
                                                for(var j in fieldsWhereToSearchForTags){
                                                    
                                                    var field = fieldsWhereToSearchForTags[j];
                                                    
                                                    if (field == 'company') {
                                                        if (_model.get(field).cname.toLowerCase().indexOf(valueArr[i].trim().toLowerCase()) > -1) {
                                                            return _model;
                                                        }
                                                    }
                                                    else{
                                                        if (_model.get(field).toLowerCase().indexOf(valueArr[i].trim().toLowerCase()) > -1) {
                                                            return _model;
                                                        }
                                                    }
                                                    
                                                }
                                            }
                                        }
                                        else if (crit == "department") {
                                            if (obj.toLowerCase() == valueArr[i].trim().toLowerCase()) {
                                                return _model;
                                            }
                                        }
                                        else {

                                            //  Returns everything but NOT if obj == value
                                            if (value.indexOf('[NOT]') > -1 ) {
                                                if (obj.toLowerCase().indexOf(valueArr[i].replace('[NOT]','').trim().toLowerCase()) <= -1) {
                                                    return _model;
                                                }
                                            }
                                            //  Returns everything but NOT if obj == empty
                                            else if (value.indexOf('[NOTempty]') > -1 ) {
                                                if ( !_.isEmpty(obj)) {
                                                    return _model;
                                                }
                                            }
                                            //  Returns only if obj == empty
                                            else if (value.indexOf('[isEmpty]') > -1 ) {
                                                if ( _.isEmpty(obj)) {
                                                    return _model;
                                                }
                                            }
                                            //  Returns only if date after 
                                            else if (valueArr[i].indexOf('[Created:after]') > -1 ) {
                                                
                                                console.log(valueArr[i]);
                                                console.log(obj);
                                                
                                                if (new Date(obj) > new Date(valueArr[i].replace('[Created:after]',''))) {
                                                    return _model;
                                                }

                                            }
                                            //  Returns _model if obj == value
                                            else{
                                                if (obj.toLowerCase().indexOf(valueArr[i].trim().toLowerCase()) > -1) {
                                                    return _model;
                                                }
                                            }
                                        }
                                    }
                                    
                                }
                            }
                            
                            
                            return null;  
                        }
                        
                        // Split criterion to have each arg of the path in an array
                        var arr = criterion.split('.'),
                            // Get the attribute
                            obj = _model.get(arr[0]);
                            
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
                    }
                    else{
                        items = collection.where(criterion, value);
                    }
                }
                else{
                    items = collection.models;
                }
                
                //To store current criterion
                filtered.currentCriterion = criterion;
                filtered.currentValue = value;
                
                return items;
            };
            
            filtered.filter = function(_filterCriterion, _searchedValue){
                filtered.currentFilter = 'filter';
                
                var items = [];

                //  If there are several criterions (research page)
                if ($.isArray(_filterCriterion) && $.isArray(_searchedValue)) {
                    if (_filterCriterion.length == _searchedValue.length) {
                        var temp = [];
                        
                        //  We put the models returned for each criterion
                        for (var i in _filterCriterion) {
                            
                            //console.log(_filterCriterion[i]+":"+_searchedValue[i]);
                            var models = applyFilter(_filterCriterion[i], _searchedValue[i], 'filter');
                            //  As the result sended by applyFilter is an array, we need to merge the arrays
                            temp = $.merge(temp, models);
                            
                            //console.log(temp);
                        }
                        
                        var obj = {};
                        //  To count the nb of occurences of the items in the array
                        for (var i = 0, j = temp.length; i < j; i++) {
                            
                            if (obj[temp[i].cid]) {
                                obj[temp[i].cid]++;
                            }
                            else {
                                obj[temp[i].cid] = 1;
                            }
                            
                            //console.log(obj);
                            
                            //  If the number of occurences is equal to the number of criterions,
                            //  it means that the model has been matched for each criterion
                            //  so we'll return it !
                            if (obj[temp[i].cid] == _filterCriterion.length) {
                                items.push(temp[i]);
                            }
                        }
                    }
                }
                //  If there is just one criterion
                else if(!$.isArray(_filterCriterion) && !$.isArray(_searchedValue)){
                    items = applyFilter(_filterCriterion, _searchedValue, 'filter');
                }
                
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
        
            initUniformPlugin : function(){
                require([
                    'vendors/uniform.min'
                ],function(){
                    $(".checkbox-inline li input").uniform({ radioClass: 'choice', selectAutoWidth: false });
                });
            },
            
            checkBeforeSubmit: function(_target){
                
                require([
                    'jquery.validate'
                ],function(){
                    
                    var userLang = I18N.getPreferedLanguage();
                    if (userLang != 'en') {
                        $('head').append(
                            '<script type="text/javascript" src="js/vendors/bower/jquery-validation/js/messages_'+userLang+'.js" />'
                        );
                    }
                    
                    return function(){
                        
                        $(_target).validate({
                            submitHandler: function(form) {
                                switch (form.id) {
                                    case 'login-form':
                                        form.submit();
                                        break;
                                    
                                    default:
                                        AJAX.auth.post(form);
                                        break;
                                }
                                
                            },
                            errorPlacement: function(error, element) {
                                if (element.parent().parent().attr('class') == 'checker' || element.parent().parent().attr('class') == 'choice' ) {
                                    error.appendTo( element.parent().parent().parent().parent().parent() );
                                } 
                                else if (element.parent().parent().attr('class') == 'checkbox' || element.parent().parent().attr('class') == 'radio' ) {
                                    error.appendTo( element.parent().parent().parent() );
                                } 
                                else {
                                    error.insertAfter(	element);
                                }
                            },
                            rules: {
                                firstName:{
                                    required:   true
                                },
                                lastName:{
                                    required:   true
                                },
                                email: {
                                    required: true,
                                    email: true
                                },
                                
                                password: {
                                    required: true,
                                    minlength: 8
                                },
                                
                                confirmPassword: {
                                    required: true,
                                    minlength: 8,
                                    equalTo: '#password'
                                }
                            
                            },
                            messages: {
                            },
                            success: function(label) {
                                label.html(
                                    '<i class="icon-checkmark"></i>'
                                ).addClass('valid');
                            }
                        });
                        
                    }();
                });
                
            },
            
            markError : function(_key, _error){
                
                var label = "";
                
                if ( ! _.isEmpty(_error) ) {
                    label = '<label class="error">'+_error.message+'</label>'
                }
                else{
                    label = '<label class="error valid"><i class="icon-checkmark"></i></label>'
                }
                
                $('#form-'+_key.replace('.', '-')).parent().find('span.msg').html(label);
                
            },
            
            setBlurListener : function(_form, _model){
                
                var blured = "";
                
                _.each(_model.schema, function(value, key){
                    blured += key+":blur ";
                });
                
                _form.on(blured, function(form, editor) {
                    var error = form.fields[editor.key].validate();
                    VIEWS.forms.markError(editor.key, error);
                });
                
            },
            
            isFormValid : function(_form){
                
                var errors = _form.commit();
                
                if ( !_.isEmpty(errors)) {
                    var self = this;
                    _.each(errors, function(_value, _key){
                        VIEWS.forms.markError(_key, _value);
                    });
                    
                    return false;
                }
                
                return true;
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
                    message: 'Supprimer cette annonce supprimera également le suivi qui lui est lié (dans le cas où il y en a un)',
                    title: 'Justification de la suppression',
                    buttons: {
                        default: {
                            label: 'Annuler',
                            className: 'btn-default',
                            callback: function() {
                                this.close();
                            }
                        },
                        danger: {
                            label: 'Supprimer',
                            className: 'btn-danger',
                            callback: function() {
                                
                                switch ( self.model.get('_objectType') ) {
                                    
                                    case 'offer':
                                        
                                        var fetchingMonitoring = APPMANAGER.request('monitoring:entities');
                                        $.when(fetchingMonitoring).done(function(_monitoring){
                    
                                            var filteredMonitoring = ENTITIES.filterCollection(_monitoring);
                                            filteredMonitoring.filter('offer._id', self.model.get('_id'));
                                            
                                            filteredMonitoring.each(function(_monitoring){
                                                _monitoring.destroy();
                                            });
                                        });
                                        
                                        self.model.destroy();
                                
                                        setTimeout(function(){
                                            APPMANAGER.trigger('offers:list')
                                        },50);
                                        break;
                                    
                                    default:
                                        //self.model.destroy();
                                
                                        setTimeout(function(){
                                            
                                        },50);
                                        break;
                                } 
                               
                            }
                        }
                    }
                });
                
            }
        }
    
        
    };
    
    var UTT = API.Application.prototype.utt = {
        
        getInternshipTypes : function(){
            return ['TN07','TN09','TN10','Alternance'];
        },
        
        getDepartments : function(){
            return ['ISI', 'MTE', 'SI', 'SM', 'SRT'];
        },
        
        getDepartmentSpec: function(_department){
                
                switch(_department){
                    
                    case 'ISI':
                        return ['MPL', 'MSI', 'MRI'];
                        break;
                    
                    case 'MTE':
                        return ['EME','TCMC', 'TQM'];
                        break;
                    
                    case 'SI':
                        return ['LIP','SFeRE','LET'];
                        break;
                    
                    case 'SM':
                        return ['CMI','CSP','TIM','SNM'];
                        break;
                    
                    case 'SRT':
                        return ['IR','TMSE','SSC'];
                        break;
                    
                    default :
                        return ['Aucune'];
                        break;
                    
                }
                
                return [];
            },
        
    }
    
    return API;
});