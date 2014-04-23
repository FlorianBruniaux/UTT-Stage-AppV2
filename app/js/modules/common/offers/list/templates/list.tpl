<div class="panel panel-default">
    
    <div class="panel-heading">
        <h6 class="panel-title">
            <i class="icon-newspaper"></i>
            <%= polyglot.t("offers.list") %>
        </h6>
    </div>
    
    <div class="panel-body">
        <form action="#" role="form">
            
            <div class="form-group">
                <div class="row">
                    
                    <div class="col-sm-6">
                        <input id="keywords" type="text" class="form-control">
                    </div>
                    
                    <div class="col-sm-5 has-feedback has-feedback-left">
                        <input style="height: 40px;" id="geocomplete" type="text" placeholder="Localization" class="form-control">
                        <i style="top:0px;" class="icon-location form-control-feedback"></i>
                        
                    </div>
                    <div class="col-sm-2 col-md-1">
                        <select id="perimeter" class="form-control">
                            <option>2 km</option>
                            <option>5 km</option>
                            <option>10 km</option>
                            <option>20 km</option>
                            <option>50 km</option>
                            <option>100 km</option>
                            <option>200 km</option>
                            <option selected>200+</option>
                        </select>
                    </div>

                    
                </div>
            </div>
            
            <div class="form-group">
                <label class="col-sm-2 col-md-1 control-label">Departments :</label>
                <div class="col-sm-10">
                  <div class="block-inner">
                    <label class="checkbox-inline checkbox-info">
                        <input name="department" type="checkbox" class="styled" checked="checked" value="ISI">
                        ISI
                    </label>
                    <label class="checkbox-inline checkbox-info">
                        <input name="department" type="checkbox" class="styled" checked="checked" value="SRT">
                        SRT
                    </label>
                    <label class="checkbox-inline checkbox-info">
                        <input name="department" type="checkbox" class="styled" checked="checked" value="SI">
                        SI
                    </label>
                    <label class="checkbox-inline checkbox-info">
                        <input name="department" type="checkbox" class="styled" checked="checked" value="SM">
                        SM
                    </label>
                    <label class="checkbox-inline checkbox-info">
                        <input name="department" type="checkbox" class="styled" checked="checked" value="MTE">
                        MTE
                    </label>
                  </div>
                </div>
                
            </div>
            
            <div class="clearfix"></div>
            
            <div class="form-group">
                <label class="col-sm-2 col-md-1  control-label">Types : </label>
                <div class="col-sm-10">
                  <div class="block-inner">
                    <label class="checkbox-inline checkbox-info">
                        <input name="type" type="checkbox" class="styled" checked="checked" value="TN07">
                        TN07
                    </label>
                    <label class="checkbox-inline checkbox-info">
                        <input name="type" type="checkbox" class="styled" checked="checked" value="TN09">
                        TN09
                    </label>
                    <label class="checkbox-inline checkbox-info">
                        <input name="type" type="checkbox" class="styled" checked="checked" value="TN10">
                        TN10
                    </label>
                    <label class="checkbox-inline checkbox-info">
                        <input name="type" type="checkbox" class="styled" checked="checked" value="Alternance">
                        Alternance
                    </label>
                  </div>
                </div>
                
            </div>
        </form>
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