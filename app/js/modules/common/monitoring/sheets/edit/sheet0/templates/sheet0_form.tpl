<div>
    
    <!-- script tag needed for backbone template -->
    <script id="sheet0FormTemplate" type="text/html">
        
        <form role="form" action="#" class="form-horizontal form-bordered">
            
            <div class="panel panel-default">
                
                <div class="panel-heading">
                    <h6 class="panel-title">
                        <i class="icon-file7"></i>
                        
                    </h6>
                </div>
                
                <div id="info-div" class="bg-danger with-padding block-inner" style="display: none;">
                    
                </div>
                
                <div class="panel-body">
                    
                    <div class="form-group">
                        <label class="col-xs-3 col-sm-2 col-md-2 col-lg-2 control-label"><%=polyglot.t('opening.date')%> :</label>
                        <div class="col-xs-6 col-sm-8 col-md-8 col-lg-20 datepicker" id="form-openingDate" data-editors="openingDate" >
                          
                        </div>
                        <span class="msg"></span>
                    </div>
                    
                    <div class="form-group">
                        <label class="col-xs-3 col-sm-2 col-md-2 col-lg-2 control-label"><%=polyglot.t('deadline')%> :</label>
                        <div class="col-xs-6 col-sm-8 col-md-8 col-lg-20 datepicker" id="form-deadline" data-editors="deadline" >
                          
                        </div>
                        <span class="msg"></span>
                    </div>

                    <div class="form-group">

                        <label style="text-align: left; margin-bottom: 20px;" class="col-xs-12 col-sm-12 col-md-12 col-lg-22"><%=polyglot.t('internship.dates')%> : </label>

                        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-22">
                            <label class="col-xs-3 col-sm-2 col-md-2 col-lg-2 control-label"><%=polyglot.t('date.from')%> :</label>
                            <div class="col-xs-6 col-sm-8 col-md-8 col-lg-20 datepicker" id="form-dates-from" data-editors="dates.from" >
                              
                            </div>
                            <span class="msg"></span>
                        </div>
                        
                        <div style="margin-top: 10px;" class="col-xs-12 col-sm-12 col-md-12 col-lg-22">
                            <label class="col-xs-3 col-sm-2 col-md-2 col-lg-2 control-label"><%=polyglot.t('date.to')%> :</label>
                            <div class="col-xs-6 col-sm-8 col-md-8 col-lg-20 datepicker" id="form-dates-to" data-editors="dates.to" >
                              
                            </div>
                            <span class="msg"></span>
                        </div>
                        
                    </div>
                    
                    <div class="form-group">
                        <label class="col-xs-3 col-sm-2 col-md-2 col-lg-2 control-label"><%=polyglot.t('semester')%> :</label>
                        <div class="col-xs-6 col-sm-8 col-md-8 col-lg-20" id="form-semester" data-editors="semester" >
                          
                        </div>
                        <span class="msg"></span>
                    </div>
                    
                    <div class="form-group">
                        <label class="col-xs-3 col-sm-2 col-md-2 col-lg-2 control-label"><%=polyglot.t('utt.tutor')%> :</label>
                        <div class="col-xs-6 col-sm-8 col-md-8 col-lg-20" id="form-uttResp" data-editors="uttResp" >
                          
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