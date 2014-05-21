<div id="offers-form">
    
    <!-- script tag needed for backbone template -->
    <script id="sheet3FormTemplate" type="text/html">
        
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
                        <label class="col-xs-3 col-sm-2 col-md-2 col-lg-1 control-label">If the subject has changed, please describe it :</label>
                        <div class="col-xs-6 col-sm-8 col-md-8 col-lg-10" id="form-subjectHasBeenModified" data-editors="subjectHasBeenModified" >
                          
                        </div>
                        <span class="msg"></span>
                    </div>
                    
                    <div class="form-group">
                        <label class="col-xs-3 col-sm-2 col-md-2 col-lg-1 control-label">Describe your planning : </label>
                        <div class="col-xs-6 col-sm-8 col-md-8 col-lg-10" id="form-planningDesc" data-editors="planningDesc" >
                          
                        </div>
                        <span class="msg"></span>
                    </div>
                    
                    <div class="form-group">
                        <label class="col-xs-3 col-sm-2 col-md-2 col-lg-1 control-label">Describe your difficulties : </label>
                        <div class="col-xs-6 col-sm-8 col-md-8 col-lg-10" id="form-difficulties" data-editors="difficulties" >
                          
                        </div>
                        <span class="msg"></span>
                    </div>
                    
                    <div class="form-group">
                        <label class="col-xs-3 col-sm-2 col-md-2 col-lg-1 control-label">Specific observations ? </label>
                        <div class="col-xs-6 col-sm-8 col-md-8 col-lg-10" id="form-observations" data-editors="observations" >
                          
                        </div>
                        <span class="msg"></span>
                    </div>
                    
                </div>
                
            </div>
          
        </form>

    </script>

    
    <div class="form-actions text-right">
        <button class="btn btn-primary js-submit" >Submit</button>
    </div>
    
</div>