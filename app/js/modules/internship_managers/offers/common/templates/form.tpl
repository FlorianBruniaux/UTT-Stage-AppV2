<div id="offers-form">
    
    <!-- script tag needed for backbone template -->
    <script id="offerFormTemplate" type="text/html">
        
        <form role="form" action="#" class="form-horizontal form-bordered">
            
            <div class="panel panel-default">
                
                <div class="panel-heading">
                    <h6 class="panel-title">
                        <i class="icon-newspaper"></i>
                        
                    </h6>
                </div>
                
                <div class="panel-body">
                    
                    <div class="form-group">
                        <label class="col-xs-3 col-sm-2 col-md-2 col-lg-2 control-label"><%=polyglot.t('internship.type')%> :</label>
                        <div class="col-xs-6 col-sm-8 col-md-8 col-lg-20" id="form-type" data-editors="type" >
                          
                        </div>
                        <span class="msg"></span>
                    </div>
                    
                    <div class="form-group">
                        <label class="col-xs-3 col-sm-2 col-md-2 col-lg-2 control-label"><%=polyglot.t('department')%> :</label>
                        <div class="col-xs-6 col-sm-8 col-md-8 col-lg-20" id="form-department" data-editors="department" >
                          
                        </div>
                        <span class="msg"></span>
                    </div>
                    
                    <div class="form-group">
                        <label class="col-xs-3 col-sm-2 col-md-2 col-lg-2 control-label"><%=polyglot.t('departmentSpec')%> :</label>
                        <div class="col-xs-6 col-sm-8 col-md-8 col-lg-20" id="form-departmentSpec" data-editors="departmentSpec" >
                          
                        </div>
                        <span class="msg"></span>
                    </div>
                    
                    <div class="form-group">
                        <label class="col-xs-3 col-sm-2 col-md-2 col-lg-2 control-label"><%=polyglot.t('company')%> :</label>
                        <div class="col-xs-6 col-sm-8 col-md-8 col-lg-20" id="form-company" data-editors="company" >
                          
                        </div>
                        <span class="msg"></span>
                    </div>
                    
                    <div class="form-group">
                        <label class="col-xs-3 col-sm-2 col-md-2 col-lg-2 control-label"><%=polyglot.t('offer.title')%> :</label>
                        <div class="col-xs-6 col-sm-8 col-md-8 col-lg-20" id="form-title" data-editors="title" >
                          
                        </div>
                        <span class="msg"></span>
                    </div>
                    
                    <div class="form-group">
                        <label class="col-xs-3 col-sm-2 col-md-2 col-lg-2 control-label">Mission:</label>
                        <div class="col-xs-6 col-sm-8 col-md-8 col-lg-20" id="form-mission" data-editors="mission" >
                          
                        </div>
                        <span class="msg"></span>
                    </div>
                     
                    <div class="form-group">
                        <label class="col-xs-3 col-sm-2 col-md-2 col-lg-2 control-label"><%=polyglot.t('profile.searched')%> :</label>
                        <div class="col-xs-6 col-sm-8 col-md-8 col-lg-20" id="form-profile" data-editors="profile" >
                          
                        </div>
                        <span class="msg"></span>
                    </div>
                    
                    <div class="form-group">
                        <label class="col-xs-3 col-sm-2 col-md-2 col-lg-2 control-label"><%=polyglot.t('remuneration.monthly.gross')%> :</label>
                        <div class="col-xs-6 col-sm-8 col-md-8 col-lg-20" id="form-rem" data-editors="rem" >
                          
                        </div>
                        <span class="msg"></span>
                    </div>
                    
                    <div class="form-group">
                        <label class="col-xs-3 col-sm-2 col-md-2 col-lg-2 control-label">Ref :</label>
                        <div class="col-xs-6 col-sm-8 col-md-8 col-lg-20" id="form-ref" data-editors="ref" >
                          
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
                        <label class="col-xs-3 col-sm-2 col-md-2 col-lg-2 control-label">Latitude:</label>
                        <div class="col-xs-6 col-sm-8 col-md-8 col-lg-20" id="form-lat" data-editors="lat" >
                          
                            
                        </div>
                        <span class="msg"></span>
                    </div>
                    
                    <div class="form-group">
                        <label class="col-xs-3 col-sm-2 col-md-2 col-lg-2 control-label">Longitude:</label>
                        <div class="col-xs-6 col-sm-8 col-md-8 col-lg-20" id="form-lng" data-editors="lng" >
                          
                            
                        </div>
                        <span class="msg"></span>
                    </div>
                
                    <div class="form-group">
                        
                        <div id="map"></div>
                        
                    </div>
                    
                    <div class="form-group">
                        <label class="col-xs-3 col-sm-2 col-md-2 col-lg-2 control-label"><%=polyglot.t('tags')%> :</label>
                        <div class="col-xs-6 col-sm-8 col-md-8 col-lg-20" id="form-tags" data-editors="tags">
                          
                        </div>
                        <span class="msg"></span>
                    </div>

                </div>
                
            </div>
          
        </form>
        
        

    </script>
    
    
    
    <div class="form-actions text-right">
        <button class="btn btn-primary js-submit"><%=polyglot.t('form.submit')%></button>
    </div>
    
</div>