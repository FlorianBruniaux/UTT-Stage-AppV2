<div class="panel panel-default">
    
    <div class="panel-heading">
        
        <h6 class="panel-title">
            <i class="icon-newspaper"></i>
            <%= title %>
            
        </h6>

    </div>
    
    <%
        if(userCategory != 'students'){
          
            if(validation.state == 'not yet treated'){
    %>
                <div class="bg-warning with-padding block-inner">
                    <p>Offre non validée pour l'instant.</p>
                </div>
    <%
            }
            else if(validation.state == 'validated'){
    %>
                <div class="bg-success with-padding block-inner">
                    <p>Offre validée par <b><%=validation.by.firstName%> <%=validation.by.lastName%></b> le <%=validation.date%>.</p>
                    <p>Message : <%=validation.msg%></p>
                </div>
    <%
            }
            else{
    %>
                <div class="bg-danger with-padding block-inner">
                    <p>Offre refusée par <b><%=validation.by.firstName%> <%=validation.by.lastName%></b> le <%=validation.date%>.</p>
                    <p>Message : <%=validation.msg%></p>
                </div>
    <%
            }
        }
    %>

    <div class="panel-body">

        <div class="tags">
            <%
                var tagArr = tags.split(',');
                for(i in tagArr){
                    print('<a href="#offers/list/filter?tags='+tagArr[i]+'"><span class="tag">'+tagArr[i]+'</span></a>'); 
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
                <a href="#companies/<%=company._id%>"><%=company.cname%></a>
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
            
            <p>
                <label>Localization :</label>
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
                    <button class="btn btn-success js-modify"><i class="icon-pencil3"></i> Modifier</button>
                </div>
            
        <%
            }
            else if(userCategory == 'teachers'){
        %>
        
                <div class="pull-right">
                    <button class="btn btn-success js-validate"><i class="icon-checkmark3"></i> Valider</button>
                    <button class="btn btn-danger js-refuse"><i class="icon-checkmark3"></i> Refuser</button>
                </div>
            
        <%
            }
            else{
        %>
        
                <div class="pull-right">
                    <button class="btn btn-success js-favorites"><i class="icon-star4"></i> Ajouter aux favoris</button>
                
                    <button class="btn btn-success js-postulate">Postuler</button>
                </div>
            
        <%
            }
        %>
        
    </div>
</div>