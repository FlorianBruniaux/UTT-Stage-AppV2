<div id="offers-form">
    
    <!-- script tag needed for backbone template -->
    <script id="formTemplate" type="text/html">
        
        <form role="form" action="#" class="form-horizontal form-bordered">
            
            <div class="panel panel-default">
                
                <div class="panel-heading">
                    <h6 class="panel-title">
                        <i class="icon-newspaper"></i>
                        
                    </h6>
                </div>
                
                <div class="panel-body">
                    
                    <div class="form-group">
                        <label class="col-sm-2 control-label">Title:</label>
                        <div class="col-sm-6" id="form-title" data-editors="title" >
                          
                        </div>
                        <span class="msg"></span>
                    </div>
                    
                    <div class="form-group">
                        <label class="col-sm-2 control-label">Name:</label>
                        <div class="col-sm-6" id="form-name" data-editors="name" >
                          
                        </div>
                        <span class="msg"></span>
                    </div>
                    
                    <div class="form-group">
                        <label class="col-sm-2 control-label">Email:</label>
                        <div class="col-sm-6" id="form-email" data-editors="email" >
                          
                        </div>
                        <span class="msg"></span>
                    </div>
                    
                    <div class="form-group">
                        <label class="col-sm-2 control-label">Password:</label>
                        <div class="col-sm-6" id="form-password" data-editors="password" >
                          
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