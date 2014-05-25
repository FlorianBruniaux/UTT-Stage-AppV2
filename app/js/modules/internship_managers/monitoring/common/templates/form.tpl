<div id="monitoring-form">
    
    <!-- script tag needed for backbone template -->
    <script id="newMonitoringFormTemplate" type="text/html">
        
        <form role="form" action="#" class="form-horizontal form-bordered">
            
            <div class="panel panel-default">
                
                <div class="panel-heading">
                    <h6 class="panel-title">
                        <i class="icon-list"></i>
                        
                    </h6>
                </div>
                
                <div class="panel-body">
                    
                    <div class="form-group">
                        <label class="col-xs-3 col-sm-2 col-md-2 col-lg-2 control-label">Offer:</label>
                        <div class="col-xs-6 col-sm-8 col-md-8 col-lg-20" id="form-offer" data-editors="offer" >
                          
                        </div>
                        <span class="msg"></span>
                    </div>
                    
                    

                </div>
                
            </div>
          
        </form>
        
    </script>
    
    <div class="form-actions text-right">
        <button class="btn btn-primary js-submit" ><%=polyglot.t('form.submit')%></button>
    </div>
    
</div>