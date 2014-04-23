<div class="panel panel-default">
    
    <div class="panel-heading">
        
        <h6 class="panel-title">
            <i class="icon-newspaper"></i>
            <%= title %>
            
        </h6>
        
        <h6 class="panel-title pull-right js-edit">
            <i class="icon-pencil3"></i>
        </h6>
        
    </div>
    

    <div class="panel-body">

        <div class="tags">
            <%
                var tagArr = tags.split(',');
                for(i in tagArr){
                    print('<span class="tag">'+tagArr[i]+'</span>'); 
                }
            %>
        </div>
        
        <div class="tags_clear"></div>
            
        <div class="offer-desc">
            
            <p>
                <label>Type :</label>
                <%=type%>
            </p>
            
            <p>
                <label>Department :</label>
                <%=department%>
            </p>
            
            <p>
                <label>Specialization :</label>
                <%=departmentSpec%>
            </p>
            
            <p>
                <label>Company :</label>
                <a href="#company/<%=company%>"+><%=company%></a>
            </p>
            
            <p class="justified">
                <label>Mission :</label>
                <%=mission%>
            </p>
            
            <p class="justified">
                <label>Profile :</label>
                <%=profile%>
            </p>
            
            <p>
                <label>Remuneration :</label>
                <%=rem%> €
            </p>
        </div>
        
        <div class="pull-right">
            <button class="btn btn-success"><i class="icon-star4"></i> Ajouter aux favoris</button>
        
            <button class="btn btn-success">Postuler</button>
        </div>
        

    </div>
</div>