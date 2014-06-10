requirejs([
    'app',
    'utt.stages'
], function(AppManager, UttStages){
    
    var API = new UttStages.Application(AppManager);
    
    //  To init internasionalization plugin
    API.i18n.init();
    
    //  Starts the application manager
    AppManager.start()
    
});