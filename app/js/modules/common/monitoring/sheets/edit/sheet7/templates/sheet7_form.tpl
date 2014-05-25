<div>
    
    <!-- script tag needed for backbone template -->
    <script id="sheet7FormTemplate" type="text/html">
        
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
                        <label class="col-xs-3 col-sm-2 col-md-2 col-lg-2 control-label">Initiative :</label>
                        <div class="col-xs-6 col-sm-2 col-md-2 col-lg-2" id="form-initiative" data-editors="initiative" >
                          
                        </div>
                        <span class="msg"></span>
                    </div>
                    
                    <div class="form-group">
                        <label class="col-xs-3 col-sm-2 col-md-2 col-lg-2 control-label"><%=polyglot.t('evaluation.adaptability')%> :</label>
                        <div class="col-xs-6 col-sm-2 col-md-2 col-lg-2" id="form-adaptability" data-editors="adaptability" >
                          
                        </div>
                        <span class="msg"></span>
                    </div>
                    
                    <div class="form-group">
                        <label class="col-xs-3 col-sm-2 col-md-2 col-lg-2 control-label"><%=polyglot.t('evaluation.abilityToInform')%> :</label>
                        <div class="col-xs-6 col-sm-2 col-md-2 col-lg-2" id="form-abilityToInform" data-editors="abilityToInform" >
                          
                        </div>
                        <span class="msg"></span>
                    </div>
                    
                    <div class="form-group">
                        <label class="col-xs-3 col-sm-2 col-md-2 col-lg-2 control-label"><%=polyglot.t('evaluation.efficiency')%> :</label>
                        <div class="col-xs-6 col-sm-2 col-md-2 col-lg-2" id="form-efficiency" data-editors="efficiency" >
                          
                        </div>
                        <span class="msg"></span>
                    </div>
                    
                    <div class="form-group">
                        <label class="col-xs-3 col-sm-2 col-md-2 col-lg-2 control-label"><%=polyglot.t('evaluation.abilityToWorkInTeam')%> :</label>
                        <div class="col-xs-6 col-sm-2 col-md-2 col-lg-2" id="form-abilityToWorkInTeam" data-editors="abilityToWorkInTeam" >
                          
                        </div>
                        <span class="msg"></span>
                    </div>
                    
                    <div class="form-group">
                        <label class="col-xs-3 col-sm-2 col-md-2 col-lg-2 control-label"><%=polyglot.t('evaluation.humanRelations')%> :</label>
                        <div class="col-xs-6 col-sm-2 col-md-2 col-lg-2" id="form-humanRelations" data-editors="humanRelations" >
                          
                        </div>
                        <span class="msg"></span>
                    </div>
                    
                    <div class="form-group">
                        <label class="col-xs-3 col-sm-2 col-md-2 col-lg-2 control-label"><%=polyglot.t('evaluation.attendance')%> :</label>
                        <div class="col-xs-6 col-sm-2 col-md-2 col-lg-2" id="form-attendance" data-editors="attendance" >
                          
                        </div>
                        <span class="msg"></span>
                    </div>
                    
                    <div class="form-group">
                        <label class="col-xs-3 col-sm-2 col-md-2 col-lg-2 control-label"><%=polyglot.t('evaluation.skillset')%> :</label>
                        <div class="col-xs-6 col-sm-2 col-md-2 col-lg-2" id="form-skillset" data-editors="skillset" >
                          
                        </div>
                        <span class="msg"></span>
                    </div>
                    
                    <div class="form-group">
                        <label class="col-xs-3 col-sm-2 col-md-2 col-lg-2 control-label"><%=polyglot.t('evaluation.innovation')%> :</label>
                        <div class="col-xs-6 col-sm-2 col-md-2 col-lg-2" id="form-innovation" data-editors="innovation" >
                          
                        </div>
                        <span class="msg"></span>
                    </div>
                    
                    <div class="form-group">
                        <label class="col-xs-3 col-sm-2 col-md-2 col-lg-2 control-label"><%=polyglot.t('evaluation.organization')%> :</label>
                        <div class="col-xs-6 col-sm-2 col-md-2 col-lg-2" id="form-organization" data-editors="organization" >
                          
                        </div>
                        <span class="msg"></span>
                    </div>
                    
                    <div class="form-group">
                        <label class="col-xs-3 col-sm-2 col-md-2 col-lg-2 control-label"><%=polyglot.t('evaluation.writtenReportsQuality')%> :</label>
                        <div class="col-xs-6 col-sm-2 col-md-2 col-lg-2" id="form-writtenReportsQuality" data-editors="writtenReportsQuality" >
                          
                        </div>
                        <span class="msg"></span>
                    </div>
                    
                    <div class="form-group">
                        <label class="col-xs-3 col-sm-2 col-md-2 col-lg-2 control-label"><%=polyglot.t('evaluation.oralReportsQuality')%> :</label>
                        <div class="col-xs-6 col-sm-2 col-md-2 col-lg-2" id="form-oralReportsQuality" data-editors="oralReportsQuality" >
                          
                        </div>
                        <span class="msg"></span>
                    </div>
                
                    <div class="form-group">
                        <label class="col-xs-3 col-sm-2 col-md-2 col-lg-2 control-label"><%=polyglot.t('evaluation.achievementsQuality')%> :</label>
                        <div class="col-xs-6 col-sm-2 col-md-2 col-lg-2" id="form-achievementsQuality" data-editors="achievementsQuality" >
                          
                        </div>
                        <span class="msg"></span>
                    </div>
                    
                    <div class="form-group">
                        <label class="col-xs-3 col-sm-2 col-md-2 col-lg-2 control-label"><%=polyglot.t('evaluation.evolution')%> :</label>
                        <div class="col-xs-3 col-sm-2 col-md-2 col-lg-2" id="form-evolution" data-editors="evolution" >
                          
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