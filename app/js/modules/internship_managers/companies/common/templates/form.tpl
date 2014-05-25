<div id="companies-form">
    
    <!-- script tag needed for backbone template -->
    <script id="newCompanyFormTemplate" type="text/html">
        
        <form role="form" action="#" class="form-horizontal form-bordered">
            
            <div class="panel panel-default">
                
                <div class="panel-heading">
                    <h6 class="panel-title">
                        <i class="icon-office"></i>
                        
                    </h6>
                </div>
                
                <div class="panel-body">
                    
                    <div class="form-group">
                        <label class="col-xs-3 col-sm-2 col-md-2 col-lg-2 control-label"><%=polyglot.t('name')%> :</label>
                        <div class="col-xs-6 col-sm-8 col-md-8 col-lg-20" id="form-cname" data-editors="cname" >
                          
                        </div>
                        <span class="msg"></span>
                    </div>
                    
                    <div class="form-group">
                        <label class="col-xs-3 col-sm-2 col-md-2 col-lg-2 control-label">Description :</label>
                        <div class="col-xs-6 col-sm-8 col-md-8 col-lg-20" id="form-description" data-editors="description" >
                          
                        </div>
                        <span class="msg"></span>
                    </div>

                    <div class="form-group">
                        <label class="col-xs-3 col-sm-2 col-md-2 col-lg-2 control-label"><%=polyglot.t('localization')%> :</label>
                        <div class="col-xs-6 col-sm-8 col-md-8 col-lg-20" id="form-fullAddress" data-editors="fullAddress" >
                          
                            
                        </div>
                        <span class="msg"></span>
                    </div>
                    
                    <div class="form-group">
                        <label class="col-xs-3 col-sm-2 col-md-2 col-lg-2 control-label">Latitude :</label>
                        <div class="col-xs-6 col-sm-8 col-md-8 col-lg-20" id="form-lat" data-editors="lat" >
                          
                            
                        </div>
                        <span class="msg"></span>
                    </div>
                    
                    <div class="form-group">
                        <label class="col-xs-3 col-sm-2 col-md-2 col-lg-2 control-label">Longitude :</label>
                        <div class="col-xs-6 col-sm-8 col-md-8 col-lg-20" id="form-lng" data-editors="lng" >
                          
                            
                        </div>
                        <span class="msg"></span>
                    </div>
                    
                    <div class="form-group">
                        
                        <div id="map"></div>
                        
                    </div>
                     
                    <div class="form-group">
                        <label class="col-xs-3 col-sm-2 col-md-2 col-lg-2 control-label"><%=polyglot.t('website')%> :</label>
                        <div class="col-xs-6 col-sm-8 col-md-8 col-lg-20" id="form-website" data-editors="website" >
                          
                        </div>
                        <span class="msg"></span>
                    </div>

                </div>
                
            </div>
          
        </form>
        
    </script>
    
    <div class="form-actions text-right">
        <button class="btn btn-primary js-submit"><%=polyglot.t('submit')%></button>
    </div>
    
</div>