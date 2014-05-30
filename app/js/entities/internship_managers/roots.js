define([
    'app'
], function(AppManager){
    
    //  "ROOTS" ENTITIES
    AppManager.module('Entities', function(Entities, AppManager, Backbone, Marionette, $, _){
        
        //  Model
        Entities.Roots = Backbone.Model.extend({
        });
        
        //  Collection
        Entities.RootsCollection = Backbone.Collection.extend({
            model : Entities.Roots,
        });
        
        //  Home
        AppManager.reqres.setHandler('internship_managers:homeRoot:entities', function(){
            if (Entities.homeRootListItems === undefined) {
                Entities.homeRootListItems = new Entities.RootsCollection([
                    { name: "home.panel.actions.offers.monitoring", url: "offers", icon: "icon-newspaper", navigationTrigger: "internship_managers:offers:root", bg_class:"bg-info", msg: "<br />" },
                    { name: "home.panel.actions.monitoring.internship_managers", url: "monitoring", icon: "icon-list", navigationTrigger: "internship_managers:monitoring:root", bg_class:"bg-info", msg: "<br />" },
                    { name: "home.panel.actions.messages", url: "messages/list", icon: "icon-bubble4", navigationTrigger: "messages:list", bg_class:"bg-info", msg: "<br />" },
                    { name: "home.panel.actions.contacts", url: "contacts/list", icon: "icon-address-book", navigationTrigger: "contacts:list", bg_class:" bg-info", msg: "<br />" },
                    { name: "home.panel.actions.users", url: "users", icon: "icon-users", navigationTrigger: "users:root", bg_class:" bg-info", msg: "<br />" },
                    { name: "home.panel.actions.companies.root", url: "companies", icon: "icon-office", navigationTrigger: "internship_managers:companies:root", bg_class:" bg-info", msg: "<br />" }
                ]);
            }
            return Entities.homeRootListItems;
        });
        
        
        //  Offers
        AppManager.reqres.setHandler('internship_managers:offersRoot:entities', function(){
            if (Entities.offersRootListItems === undefined) {
                Entities.offersRootListItems = new Entities.RootsCollection([
                    { name: "offers.panel.actions.new", url: "offers/new", icon: "icon-plus-circle", navigationTrigger: "internship_managers:offer:new", bg_class:"bg-info", msg: "<br />" },
                    { name: "offers.panel.actions.validation", url: "offers/validation", icon: "icon-warning", navigationTrigger: "offers:validation", bg_class:"bg-info", msg: "<br />" },
                    { name: "offers.panel.actions.list", url: "offers/list", icon: "icon-newspaper", navigationTrigger: "offers:list", bg_class:"bg-info", msg: "<br />" },
                    { name: "offers.panel.actions.provided", url: "offers/list/provided", icon: "icon-checkbox-checked", navigationTrigger: "internship_managers:offers:list:provided", bg_class:"bg-info", msg: "<br />" }
                    
                ]);
            }
            return Entities.offersRootListItems;
        });
        
        //  Monitoring
        AppManager.reqres.setHandler('internship_managers:monitoringRoot:entities', function(){
            if (Entities.monitoringRootListItems === undefined) {
                Entities.monitoringRootListItems = new Entities.RootsCollection([
                    { name: "monitoring.panel.actions.new", url: "monitoring/new", icon: "icon-plus-circle", navigationTrigger: "internship_managers:monitoring:new", bg_class:"bg-info", msg: "<br />" },
                    { name: "monitoring.panel.actions.list", url: "monitoring/list", icon: "icon-list", navigationTrigger: "internship_managers:monitoring:list", bg_class:"bg-info", msg: "<br />" }
                ]);
            }
            return Entities.monitoringRootListItems;
        });
        
        //  Companies
        AppManager.reqres.setHandler('internship_managers:companiesRoot:entities', function(){
            if (Entities.companiesRootListItems === undefined) {
                Entities.companiesRootListItems = new Entities.RootsCollection([
                    { name: "companies.panel.actions.new", url: "companies/new", icon: "icon-plus-circle", navigationTrigger: "internship_managers:company:new", bg_class:"bg-info", msg: "<br />" },
                    { name: "companies.panel.actions.list", url: "companies/list", icon: "icon-office", navigationTrigger: "companies:list", bg_class:"bg-info", msg: "<br />" }
                ]);
            }
            return Entities.companiesRootListItems;
        });
        
    });

    return ;
})