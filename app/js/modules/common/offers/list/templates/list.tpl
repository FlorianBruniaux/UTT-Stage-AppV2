<div class="panel panel-default">
    
    <div class="panel-heading">
        <h6 class="panel-title">
            <i class="icon-newspaper"></i>
            <%= polyglot.t("offers.list") %>
        </h6>
    </div>
    
    <div class="panel-body">
        
        
        <!-- script tag needed for backbone template -->
        <script id="formTemplate" type="text/html">
        
            <form role="form" action="#" class="form-horizontal form-bordered">
                
                <div class="row">
                    
                    <div class="col-sm-6" id="form-tags" data-editors="tags">
                       
                    </div>
                    
                    <div class="col-sm-5 has-feedback has-feedback-left"  id="form-fullAddress" data-editors="fullAddress">
                        <i style="top:0px;" class="icon-location form-control-feedback"></i>
                    </div>
                    
                    <div class="col-sm-2 col-md-1" id="form-perimeter" data-editors="perimeter">

                    </div>

                </div>

                <div class="row" style="margin-top: 20px;">
                    <label class="col-sm-2 col-md-1 control-label">Departments :</label>
                    <div class="col-sm-10">
                        <div class="block-inner" id="form-department" data-editors="department">
                        </div>
                    </div>
                </div>
                
                <div class="row">
                    <label class="col-sm-2 col-md-1  control-label">Types : </label>
                    <div class="col-sm-10">
                        <div class="block-inner" id="form-type" data-editors="type">
        
                        </div>
                    </div>
                </div>
                
            </form>
            
        </script>
        
    </div>
    
    <hr >
    
    <div class="datatable">
        <table class="table table-striped table-bordered">
            
            <thead>
                <tr>
                    <th style="width:100px;">Type</th>
                    <th style="width:100px;">Department</th>
                    <th style="width:100px;">Specialization</th>
                    <th style="width:150px;">Company</th>
                    <th>Title</th>
                </tr>
            </thead>
            
            <tbody>
                
            </tbody>
        </table>
    </div>
</div>