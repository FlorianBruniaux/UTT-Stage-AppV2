<div class="panel panel-default">
    
    <div class="panel-heading">
        
        <h6 class="panel-title">
            <i class="icon-office"></i>
            <%=cname%>
        </h6>

    </div>

    <div class="panel-body">
        
        <div class="company-desc">
            
            <p>
                <label><%=polyglot.t('name')%> :</label>
                <%=cname%>
            </p>
            
            <p>
                <label class="justified"><%=polyglot.t('description')%> :</label>
                <%=description%>
            </p>
            
            <p>
                <label class="justified"><%=polyglot.t('website')%> :</label>
                <a href="<%=website%>" target="_blank"><%=website%></a>
            </p>
            
            <p>
                <label><%=polyglot.t('localization')%> :</label>
                <form>
                    <input id="geocomplete" type="text" class="form-control" disabled>
                </form>
                
                <div id="map"></div>
            </p>

        </div>
        
        <%
            if(userCategory == 'internship_managers'){
        %>
                <div class="pull-right">
                    <button class="btn btn-success js-modify"><i class="icon-pencil3"></i> <%=polyglot.t('modify')%></button>
                    <button class="btn btn-danger js-delete"><i class="icon-remove3"></i> <%=polyglot.t('delete')%></button>
                </div>
        <%
            }
        %>

        
    </div>
</div>