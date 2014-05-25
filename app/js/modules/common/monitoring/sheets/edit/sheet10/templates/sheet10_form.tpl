<div>
    
    <!-- script tag needed for backbone template -->
    <script id="sheet10FormTemplate" type="text/html">
        
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
                        <label class="col-xs-3 col-sm-2 col-md-2 col-lg-2 control-label">Date :</label>
                        <div class="col-xs-6 col-sm-8 col-md-8 col-lg-20 datepicker" id="form-date" data-editors="date" >
                          
                        </div>
                        <span class="msg"></span>
                    </div>
                    
                    <div class="form-group">
                        <label class="col-xs-3 col-sm-2 col-md-2 col-lg-2 control-label"><%=polyglot.t('time')%> :</label>
                        <div class="col-xs-6 col-sm-8 col-md-8 col-lg-20" id="form-time" data-editors="time">

                        </div>
                        <span class="msg"></span>
                    </div>
                    
                    <div class="form-group">
                        <label class="col-xs-3 col-sm-2 col-md-2 col-lg-2 control-label"><%=polyglot.t('room')%> :</label>
                        <div class="col-xs-6 col-sm-8 col-md-8 col-lg-20" id="form-room" data-editors="room">

                        </div>
                        <span class="msg"></span>
                    </div>
                    
                    <div class="form-group">
                        <label class="col-xs-3 col-sm-2 col-md-2 col-lg-2 control-label"><%=polyglot.t('jury.member')%> n°1 :</label>
                        <div class="col-xs-6 col-sm-8 col-md-8 col-lg-20" id="form-jury1" data-editors="jury1">

                        </div>
                        <span class="msg"></span>
                    </div>
                    
                    <div class="form-group">
                        <label class="col-xs-3 col-sm-2 col-md-2 col-lg-2 control-label"><%=polyglot.t('jury.member')%> n°2 :</label>
                        <div class="col-xs-6 col-sm-8 col-md-8 col-lg-20" id="form-jury2" data-editors="jury2">

                        </div>
                        <span class="msg"></span>
                    </div>
                    
                    <div class="form-group">
                        <label class="col-xs-3 col-sm-2 col-md-2 col-lg-2 control-label"><%=polyglot.t('participants.number')%> :</label>
                        <div class="col-xs-6 col-sm-8 col-md-8 col-lg-20" id="form-nbParticipants" data-editors="nbParticipants">

                        </div>
                        <span class="msg"></span>
                    </div>
                    
                    <div class="form-group">
                        <label class="col-xs-3 col-sm-2 col-md-2 col-lg-2 control-label"><%=polyglot.t('participants')%> :</label>
                        <div class="col-xs-6 col-sm-8 col-md-8 col-lg-20" id="form-participants" data-editors="participants">

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