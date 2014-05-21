<div class="panel panel-default">
    
    <div class="panel-heading">
        <h6 class="panel-title">
            <i class="icon-newspaper"></i>
            <%= polyglot.t("monitoring.list") %>
        </h6>
    </div>
    
    <div class="panel-body">
        
        
        <!-- script tag needed for backbone template -->
        <script id="searchFormTemplate" type="text/html">
        
            <form role="form" action="#" class="form-horizontal form-bordered">

                <div class="row" style="margin-top: 20px;">
                    <label class="col-lg-1 col-md-2 col-sm-3 control-label">Departments :</label>
                    <div class="col-md-9">
                        <div class="block-inner" id="form-department" data-editors="department">
                        </div>
                    </div>
                </div>
                
                <div class="row">
                    <label class="col-lg-1 col-md-2 col-sm-3 control-label">Types : </label>
                    <div class="col-md-9">
                        <div class="block-inner" id="form-type" data-editors="type">
        
                        </div>
                    </div>
                </div>
                
            </form>
            
        </script>
        
    </div>
    
    <hr >
    
    <div class="datatable">
        <table width="100%" class="table table-striped table-bordered">
            
            <thead>
                <tr>
                    <th class="center">Student</th>
                    <th class="center">Offer</th>
                    <th class="center">Type</th>
                    <th class="center">0</th>
                    <th class="center">1</th>
                    <th class="center">2</th>
                    <th class="center">3</th>
                    <th class="center">4</th>
                    <th class="center">5</th>
                    <th class="center">6</th>
                    <th class="center">7</th>
                    <th class="center">8</th>
                    <th class="center">9</th>
                    <th class="center">10</th>
                </tr>
            </thead>
            
            <tbody>
                
            </tbody>
        </table>
    </div>
</div>