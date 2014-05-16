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
                <label>Name :</label>
                <%=cname%>
            </p>
            
            <p>
                <label class="justified">Description :</label>
                <%=description%>
            </p>
            
            <p>
                <label class="justified">Website :</label>
                <a href="<%=website%>" target="_blank"><%=website%></a>
            </p>
            
            <p>
                <label>Localization :</label>
                
            </p>

        </div>
        
        <%
            if(userCategory == 'internship_managers'){
        %>
                <div class="pull-right">
                    <button class="btn btn-success js-modify"><i class="icon-pencil3"></i> Modifier</button>
                </div>
        <%
            }
        %>

        
    </div>
</div>