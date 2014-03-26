requirejs([
    'app',
    'utt.stages'
], function(AppManager, UttStages){
    
    var API = new UttStages.Application(AppManager);
    API.i18n.init();
    
    // Start the application manager
    AppManager.start()

});