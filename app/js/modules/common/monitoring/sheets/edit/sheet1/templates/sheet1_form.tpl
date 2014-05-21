<div id="offers-form">
    
    <!-- script tag needed for backbone template -->
    <script id="sheet1FormTemplate" type="text/html">
        
        <form role="form" action="#" class="form-horizontal form-bordered">
            
            <div class="panel panel-default">
                
                <div class="panel-heading">
                    <h6 class="panel-title">
                        <i class="icon-file7"></i>
                        
                    </h6>
                </div>
                
                <div class="panel-body">
                    
                    <div class="form-group">
                        <label class="col-xs-3 col-sm-2 col-md-2 col-lg-1 control-label">Opening Date :</label>
                        <div class="col-xs-6 col-sm-8 col-md-8 col-lg-10 datepicker" id="form-openingDate" data-editors="openingDate" >
                          
                        </div>
                        <span class="msg"></span>
                    </div>
                    
                    <div class="form-group">
                        <label class="col-xs-3 col-sm-2 col-md-2 col-lg-1 control-label">Deadline :</label>
                        <div class="col-xs-6 col-sm-8 col-md-8 col-lg-10 datepicker" id="form-deadline" data-editors="deadline" >
                          
                        </div>
                        <span class="msg"></span>
                    </div>
                    
                    <div class="form-group">
                        <label class="col-xs-3 col-sm-2 col-md-2 col-lg-1 control-label">NAF Code :</label>
                        <div class="col-xs-6 col-sm-8 col-md-8 col-lg-10" id="form-naf" data-editors="naf" >
                          
                        </div>
                        <span class="msg"></span>
                    </div>
                    
                    <div class="form-group">
                        <label class="col-xs-3 col-sm-2 col-md-2 col-lg-1 control-label">Workforce :</label>
                        <div class="col-xs-6 col-sm-8 col-md-8 col-lg-10" id="form-workforce" data-editors="workforce" >
                          
                        </div>
                        <span class="msg"></span>
                    </div>

                    <div class="form-group">

                        <label style="text-align: left; margin-bottom: 20px;" class="col-xs-12 col-sm-12 col-md-12 col-lg-12">Administrative responsible</label>

                        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                            <label class="col-xs-3 col-sm-2 col-md-2 col-lg-1 control-label">First name :</label>
                            <div class="col-xs-6 col-sm-8 col-md-8 col-lg-10" id="form-administrativeResp-firstName" data-editors="administrativeResp.firstName" >
                              
                            </div>
                            <span class="msg"></span>
                        </div>
                        
                        <div style="margin-top: 10px;"  class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                            <label class="col-xs-3 col-sm-2 col-md-2 col-lg-1 control-label">Last name :</label>
                            <div class="col-xs-6 col-sm-8 col-md-8 col-lg-10" id="form-administrativeResp-lastName" data-editors="administrativeResp.lastName" >
                              
                            </div>
                            <span class="msg"></span>
                        </div>
                        
                        <div style="margin-top: 10px;"  class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                            <label class="col-xs-3 col-sm-2 col-md-2 col-lg-1 control-label">Position :</label>
                            <div class="col-xs-6 col-sm-8 col-md-8 col-lg-10" id="form-administrativeResp-position" data-editors="administrativeResp.position" >
                              
                            </div>
                            <span class="msg"></span>
                        </div>
                        
                        <div style="margin-top: 10px;"  class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                            <label class="col-xs-3 col-sm-2 col-md-2 col-lg-1 control-label">Email :</label>
                            <div class="col-xs-6 col-sm-8 col-md-8 col-lg-10" id="form-administrativeResp-email" data-editors="administrativeResp.email" >
                              
                            </div>
                            <span class="msg"></span>
                        </div>
                        
                        <div style="margin-top: 10px;"  class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                            <label class="col-xs-3 col-sm-2 col-md-2 col-lg-1 control-label">Tel :</label>
                            <div class="col-xs-6 col-sm-8 col-md-8 col-lg-10" id="form-administrativeResp-phone" data-editors="administrativeResp.phone" >
                              
                            </div>
                            <span class="msg"></span>
                        </div>
                    </div>
                    
                    <div class="form-group">

                        <label style="text-align: left; margin-bottom: 20px;" class="col-xs-12 col-sm-12 col-md-12 col-lg-12">Technical responsible</label>

                        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                            <label class="col-xs-3 col-sm-2 col-md-2 col-lg-1 control-label">First name :</label>
                            <div class="col-xs-6 col-sm-8 col-md-8 col-lg-10" id="form-technicalResp-firstName" data-editors="technicalResp.firstName" >
                              
                            </div>
                            <span class="msg"></span>
                        </div>
                        
                        <div style="margin-top: 10px;"  class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                            <label class="col-xs-3 col-sm-2 col-md-2 col-lg-1 control-label">Last name :</label>
                            <div class="col-xs-6 col-sm-8 col-md-8 col-lg-10" id="form-technicalResp-lastName" data-editors="technicalResp.lastName" >
                              
                            </div>
                            <span class="msg"></span>
                        </div>
                        
                        <div style="margin-top: 10px;"  class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                            <label class="col-xs-3 col-sm-2 col-md-2 col-lg-1 control-label">Position :</label>
                            <div class="col-xs-6 col-sm-8 col-md-8 col-lg-10" id="form-technicalResp-position" data-editors="technicalResp.position" >
                              
                            </div>
                            <span class="msg"></span>
                        </div>
                        
                        <div style="margin-top: 10px;"  class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                            <label class="col-xs-3 col-sm-2 col-md-2 col-lg-1 control-label">Email :</label>
                            <div class="col-xs-6 col-sm-8 col-md-8 col-lg-10" id="form-technicalResp-email" data-editors="technicalResp.email" >
                              
                            </div>
                            <span class="msg"></span>
                        </div>
                        
                        <div style="margin-top: 10px;"  class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                            <label class="col-xs-3 col-sm-2 col-md-2 col-lg-1 control-label">Tel :</label>
                            <div class="col-xs-6 col-sm-8 col-md-8 col-lg-10" id="form-technicalResp-phone" data-editors="technicalResp.phone" >
                              
                            </div>
                            <span class="msg"></span>
                        </div>
                    </div>
                    
                </div>
                
            </div>
          
        </form>

    </script>

    
    <div class="form-actions text-right">
        <button class="btn btn-primary js-submit" >Submit</button>
    </div>
    
</div>