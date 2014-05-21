<div id="offers-form">
    
    <!-- script tag needed for backbone template -->
    <script id="sheet4FormTemplate" type="text/html">
        
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
                        <label class="col-xs-3 col-sm-2 col-md-2 col-lg-1 control-label">Does the student formation is concordant with the project ?</label>
                        <div class="col-xs-6 col-sm-8 col-md-8 col-lg-10 datepicker" id="form-isConcordantWithWork" data-editors="isConcordantWithWork" >
                          
                        </div>
                        <span class="msg"></span>
                    </div>
                    
                    <div class="form-group">
                        <label class="col-xs-3 col-sm-2 col-md-2 col-lg-1 control-label">Are you satisfied by the studend ? :</label>
                        <div class="col-xs-6 col-sm-8 col-md-8 col-lg-10 datepicker" id="form-satisfaction" data-editors="satisfaction" >
                          
                        </div>
                        <span class="msg"></span>
                    </div>
                    
                    <div class="form-group">
                        <label class="col-xs-3 col-sm-2 col-md-2 col-lg-1 control-label">Global opinion : </label>
                        <div class="col-xs-6 col-sm-8 col-md-8 col-lg-10" id="form-globalOpinion" data-editors="globalOpinion" >
                          
                        </div>
                        <span class="msg"></span>
                    </div>
                    
                    <div class="form-group">

                        <label style="text-align: left; margin-bottom: 20px;" class="col-xs-12 col-sm-12 col-md-12 col-lg-12">Tax responsible</label>

                        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                            <label class="col-xs-3 col-sm-2 col-md-2 col-lg-1 control-label">First name :</label>
                            <div class="col-xs-6 col-sm-8 col-md-8 col-lg-10" id="form-taxResp-firstName" data-editors="taxResp.firstName" >
                              
                            </div>
                            <span class="msg"></span>
                        </div>
                        
                        <div style="margin-top: 10px;"  class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                            <label class="col-xs-3 col-sm-2 col-md-2 col-lg-1 control-label">Last name :</label>
                            <div class="col-xs-6 col-sm-8 col-md-8 col-lg-10" id="form-taxResp-lastName" data-editors="taxResp.lastName" >
                              
                            </div>
                            <span class="msg"></span>
                        </div>
                        
                        <div style="margin-top: 10px;"  class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                            <label class="col-xs-3 col-sm-2 col-md-2 col-lg-1 control-label">Position :</label>
                            <div class="col-xs-6 col-sm-8 col-md-8 col-lg-10" id="form-taxResp-position" data-editors="taxResp.position" >
                              
                            </div>
                            <span class="msg"></span>
                        </div>
                        
                        <div style="margin-top: 10px;"  class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                            <label class="col-xs-3 col-sm-2 col-md-2 col-lg-1 control-label">Email :</label>
                            <div class="col-xs-6 col-sm-8 col-md-8 col-lg-10" id="form-taxResp-email" data-editors="taxResp.email" >
                              
                            </div>
                            <span class="msg"></span>
                        </div>
                        
                        <div style="margin-top: 10px;"  class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                            <label class="col-xs-3 col-sm-2 col-md-2 col-lg-1 control-label">Tel :</label>
                            <div class="col-xs-6 col-sm-8 col-md-8 col-lg-10" id="form-taxResp-phone" data-editors="taxResp.phone" >
                              
                            </div>
                            <span class="msg"></span>
                        </div>
                    </div>
                    
                    <div class="form-group">

                        <label style="text-align: left; margin-bottom: 20px;" class="col-xs-12 col-sm-12 col-md-12 col-lg-12">Author</label>

                        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                            <label class="col-xs-3 col-sm-2 col-md-2 col-lg-1 control-label">First name :</label>
                            <div class="col-xs-6 col-sm-8 col-md-8 col-lg-10" id="form-author-firstName" data-editors="author.firstName" >
                              
                            </div>
                            <span class="msg"></span>
                        </div>
                        
                        <div style="margin-top: 10px;"  class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                            <label class="col-xs-3 col-sm-2 col-md-2 col-lg-1 control-label">Last name :</label>
                            <div class="col-xs-6 col-sm-8 col-md-8 col-lg-10" id="form-author-lastName" data-editors="author.lastName" >
                              
                            </div>
                            <span class="msg"></span>
                        </div>
                        
                        <div style="margin-top: 10px;"  class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                            <label class="col-xs-3 col-sm-2 col-md-2 col-lg-1 control-label">Position :</label>
                            <div class="col-xs-6 col-sm-8 col-md-8 col-lg-10" id="form-author-position" data-editors="author.position" >
                              
                            </div>
                            <span class="msg"></span>
                        </div>
                        
                        <div style="margin-top: 10px;"  class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                            <label class="col-xs-3 col-sm-2 col-md-2 col-lg-1 control-label">Email :</label>
                            <div class="col-xs-6 col-sm-8 col-md-8 col-lg-10" id="form-author-email" data-editors="author.email" >
                              
                            </div>
                            <span class="msg"></span>
                        </div>
                        
                        <div style="margin-top: 10px;"  class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                            <label class="col-xs-3 col-sm-2 col-md-2 col-lg-1 control-label">Tel :</label>
                            <div class="col-xs-6 col-sm-8 col-md-8 col-lg-10" id="form-author-phone" data-editors="author.phone" >
                              
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