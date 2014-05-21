<div id="offers-form">
    
    <!-- script tag needed for backbone template -->
    <script id="sheet2FormTemplate" type="text/html">
        
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

                        <label style="text-align: left; margin-bottom: 20px;" class="col-xs-12 col-sm-12 col-md-12 col-lg-12">Your subject : </label>

                        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                            <label class="col-xs-3 col-sm-2 col-md-2 col-lg-1 control-label">Description :</label>
                            <div class="col-xs-6 col-sm-8 col-md-8 col-lg-10" id="form-subject-description" data-editors="subject.description" >
                              
                            </div>
                            <span class="msg"></span>
                        </div>
                        
                        <div style="margin-top: 10px;"  class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                            <label class="col-xs-3 col-sm-2 col-md-2 col-lg-1 control-label">Objectives :</label>
                            <div class="col-xs-6 col-sm-8 col-md-8 col-lg-10" id="form-subject-objectives" data-editors="subject.objectives" >
                              
                            </div>
                            <span class="msg"></span>
                        </div>
                        
                        <div style="margin-top: 10px;"  class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                            <label class="col-xs-3 col-sm-2 col-md-2 col-lg-1 control-label">Conditions :</label>
                            <div class="col-xs-6 col-sm-8 col-md-8 col-lg-10" id="form-subject-conditions" data-editors="subject.conditions" >
                              
                            </div>
                            <span class="msg"></span>
                        </div>
                        
                        <div style="margin-top: 10px;"  class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                            <label class="col-xs-3 col-sm-2 col-md-2 col-lg-1 control-label">Do you like this subject ? </label>
                            <div class="col-xs-6 col-sm-8 col-md-8 col-lg-10" id="form-subject-isIntersting" data-editors="subject.isIntersting" >
                              
                            </div>
                            <span class="msg"></span>
                        </div>
                        
                        <div style="margin-top: 10px;"  class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                            <label class="col-xs-3 col-sm-2 col-md-2 col-lg-1 control-label">Is it concordant with your professional project ? </label>
                            <div class="col-xs-6 col-sm-8 col-md-8 col-lg-10" id="form-subject-isConcordantWithProfessionalProject" data-editors="subject.isConcordantWithProfessionalProject" >
                              
                            </div>
                            <span class="msg"></span>
                        </div>
                    </div>
                    
                    <div class="form-group">
                        <label class="col-xs-3 col-sm-2 col-md-2 col-lg-1 control-label">Contact with your UTT tutor :</label>
                        <div class="col-xs-6 col-sm-8 col-md-8 col-lg-10" id="form-contactWithRespUtt" data-editors="contactWithRespUtt" >
                          
                        </div>
                        <span class="msg"></span>
                    </div>
                    
                    <div class="form-group">
                        <label class="col-xs-3 col-sm-2 col-md-2 col-lg-1 control-label">Whose initiative ? </label>
                        <div class="col-xs-6 col-sm-8 col-md-8 col-lg-10" id="form-whoseInitiative" data-editors="whoseInitiative" >
                          
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