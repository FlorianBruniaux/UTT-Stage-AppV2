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
                    <label class="col-lg-2 col-md-2 col-sm-3 control-label"><%=polyglot.t('department')%> :</label>
                    <div class="col-md-9">
                        <div class="block-inner" id="form-department" data-editors="department">
                        </div>
                    </div>
                </div>
                
                <div class="row">
                    <label class="col-lg-2 col-md-2 col-sm-3 control-label"><%=polyglot.t('internship.type')%> : </label>
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
                    <th class="center"><%=polyglot.t('student')%></th>
                    <th class="center"><%=polyglot.t('department')%></th>
                    <th class="center"><%=polyglot.t('internship.type')%></th>
                    <th class="center"><%=polyglot.t('monitoring.sheets.sheet0.name')%></th>
                    <th class="center"><%=polyglot.t('monitoring.sheets.sheet1.name')%></th>
                    <th class="center"><%=polyglot.t('monitoring.sheets.sheet2.name')%></th>
                    <th class="center"><%=polyglot.t('monitoring.sheets.sheet3.name')%></th>
                    <th class="center"><%=polyglot.t('monitoring.sheets.sheet4.name')%></th>
                    <th class="center"><%=polyglot.t('monitoring.sheets.sheet5.name')%></th>
                    <th class="center"><%=polyglot.t('monitoring.sheets.sheet6.name')%></th>
                    <th class="center"><%=polyglot.t('monitoring.sheets.sheet7.name')%></th>
                    <th class="center"><%=polyglot.t('monitoring.sheets.sheet8.name')%></th>
                    <th class="center"><%=polyglot.t('monitoring.sheets.sheet9.name')%></th>
                    <th class="center"><%=polyglot.t('monitoring.sheets.sheet10.name')%></th>
                    <th class="center"></th>
                </tr>
            </thead>
            
            <tbody>
                
            </tbody>
        </table>
    </div>
</div>