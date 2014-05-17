<div id="user-form">
    
    <!-- script tag needed for backbone template -->
    <script id="editUserTemplate" type="text/html">
        
        <form role="form" action="#" class="form-horizontal form-bordered">
            
            <div class="panel panel-default">
                
                <div class="panel-heading">
                    <h6 class="panel-title">
                        <i class="icon-user"></i>
                        
                    </h6>
                </div>
                
                <div class="panel-body">
                    
                    <div class="form-group">
                        <label class="col-xs-3 col-sm-2 col-md-2 col-lg-1 control-label">First Name:</label>
                        <div class="col-xs-6 col-sm-8 col-md-8 col-lg-10" id="form-firstName" data-editors="firstName" >
                          
                        </div>
                        <span class="msg"></span>
                    </div>
                    
                    <div class="form-group">
                        <label class="col-xs-3 col-sm-2 col-md-2 col-lg-1 control-label">Last Name:</label>
                        <div class="col-xs-6 col-sm-8 col-md-8 col-lg-10" id="form-lastName" data-editors="lastName" >
                          
                        </div>
                        <span class="msg"></span>
                    </div>
                    
                    <div class="form-group">
                        <label class="col-xs-3 col-sm-2 col-md-2 col-lg-1 control-label">Email:</label>
                        <div class="col-xs-6 col-sm-8 col-md-8 col-lg-10" id="form-email" data-editors="email" >
                          
                        </div>
                        <span class="msg"></span>
                    </div>
                    
                    <div class="form-group">
                        <label class="col-xs-3 col-sm-2 col-md-2 col-lg-1 control-label">Password:</label>
                        <div class="col-xs-6 col-sm-8 col-md-8 col-lg-10" id="form-pwd" data-editors="pwd" >
                          
                        </div>
                        <span class="msg"></span>
                    </div>
                    
                    <div class="form-group">
                        <label class="col-xs-3 col-sm-2 col-md-2 col-lg-1 control-label">Password Confirm:</label>
                        <div class="col-xs-6 col-sm-8 col-md-8 col-lg-10" id="form-pwdConfirm" data-editors="pwdConfirm" >
                          
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