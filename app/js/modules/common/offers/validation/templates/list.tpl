<div class="panel panel-default">
    
    <div class="panel-heading">
        <h6 class="panel-title">
            <i class="icon-checkmark3"></i>
            <%= polyglot.t("offers.validation") %>
        </h6>
    </div>
    
    <div style="display: none;" id="new-offer-msg" class="bg-success with-padding block-inner">
        <h3><%=polyglot.t('oneOfferHasBeenValidated')%></h3>
    </div>
    
    <div class="datatable">
        <table width="100%" class="table table-striped table-bordered">
            
            <thead>
                <tr>
                    <th class="center"><%=polyglot.t('state')%></th>
                    <th class="center"><%=polyglot.t('internship.type')%></th>
                    <th class="center"><%=polyglot.t('department')%></th>
                    <th class="center"><%=polyglot.t('departmentSpec')%></th>
                    <th class="center"><%=polyglot.t('company')%></th>
                    <th class="center"><%=polyglot.t('localization')%></th>
                    <th class="center"><%=polyglot.t('offer.title')%></th>
                </tr>
            </thead>
            
            <tbody>
                
            </tbody>
        </table>
    </div>
</div>