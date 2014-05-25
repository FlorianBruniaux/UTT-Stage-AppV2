<div>
    
    <!-- script tag needed for backbone template -->
    <script id="sheet5FormTemplate" type="text/html">
        
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
                        <label class="col-xs-3 col-sm-2 col-md-2 col-lg-2 control-label"><%=polyglot.t('subject.opinion')%> ?</label>
                        <div class="col-xs-6 col-sm-8 col-md-8 col-lg-20" id="form-project" data-editors="project" >
                          
                        </div>
                        <span class="msg"></span>
                    </div>
                    
                    <div class="form-group">
                        <label class="col-xs-3 col-sm-2 col-md-2 col-lg-2 control-label"><%=polyglot.t('team.opinion')%> ?</label>
                        <div class="col-xs-6 col-sm-8 col-md-8 col-lg-20" id="form-team" data-editors="team" >
                          
                        </div>
                        <span class="msg"></span>
                    </div>
                    
                    <div class="form-group">
                        <label class="col-xs-3 col-sm-2 col-md-2 col-lg-2 control-label"><%=polyglot.t('company.opinion')%> ?</label>
                        <div class="col-xs-6 col-sm-8 col-md-8 col-lg-20" id="form-company" data-editors="company" >
                          
                        </div>
                        <span class="msg"></span>
                    </div>
                    
                    <div class="form-group">
                        <label class="col-xs-3 col-sm-2 col-md-2 col-lg-2 control-label"><%=polyglot.t('kindOfHelpReceived')%> ?</label>
                        <div class="col-xs-6 col-sm-8 col-md-8 col-lg-20" id="form-help" data-editors="help" >
                          
                        </div>
                        <span class="msg"></span>
                    </div>
                    
                    <div class="form-group">
                        <label class="col-xs-3 col-sm-2 col-md-2 col-lg-2 control-label"><%=polyglot.t('internshipContribution')%> ?</label>
                        <div class="col-xs-6 col-sm-8 col-md-8 col-lg-20" id="form-internshipContribution" data-editors="internshipContribution" >
                          
                        </div>
                        <span class="msg"></span>
                    </div>
                    
                     <div class="form-group">
                        <label class="col-xs-3 col-sm-2 col-md-2 col-lg-2 control-label"><%=polyglot.t('remuneration.monthly.net')%> :</label>
                        <div class="col-xs-6 col-sm-8 col-md-8 col-lg-20" id="form-rem" data-editors="rem" >
                          
                        </div>
                        <span class="msg"></span>
                    </div>
                    
                    <div class="form-group">
                        <label class="col-xs-3 col-sm-2 col-md-2 col-lg-2 control-label"><%=polyglot.t('bonus')%> :</label>
                        <div class="col-xs-6 col-sm-8 col-md-8 col-lg-20" id="form-bonus" data-editors="bonus" >
                          
                        </div>
                        <span class="msg"></span>
                    </div>
                    
                    <div class="form-group">
                        <label class="col-xs-3 col-sm-2 col-md-2 col-lg-2 control-label"><%=polyglot.t('odds')%> :</label>
                        <div class="col-xs-6 col-sm-8 col-md-8 col-lg-20" id="form-odds" data-editors="odds" >
                          
                        </div>
                        <span class="msg"></span>
                    </div>
                    
                    <div class="form-group">
                        <label class="col-xs-3 col-sm-2 col-md-2 col-lg-2 control-label"><%=polyglot.t('helpFromUttResp.enough')%> ?</label>
                        <div class="col-xs-6 col-sm-8 col-md-8 col-lg-20" id="form-helpFromUttResp-enough" data-editors="helpFromUttResp.enough" >
                          
                        </div>
                        <span class="msg"></span>
                    </div>
                    
                    <div class="form-group">
                        <label class="col-xs-3 col-sm-2 col-md-2 col-lg-2 control-label"><%=polyglot.t('helpFromUttResp.explanations')%> ?</label>
                        <div class="col-xs-6 col-sm-8 col-md-8 col-lg-20" id="form-helpFromUttResp-explanations" data-editors="helpFromUttResp.explanations" >
                          
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