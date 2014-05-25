<div class="panel panel-default">
    
    <div class="panel-heading">
        
        <h6 class="panel-title">
            <i class="icon-newspaper"></i>
            <%= title %>
        </h6>

    </div>
    
    <%
    
        if(provided.by != ''){
    %>
            <div class="bg-info with-padding block-inner">
                <p><%=polyglot.t('offer.provided.on')%> <%=provided.date%> <%=polyglot.t('by')%> <%=provided.by.firstName%> <%=provided.by.lastName%></p>
            </div>
    <%
        }
        else if(userCategory != 'students'){
          
            if(validation.state == 'not yet treated'){
    %>
                <div class="bg-warning with-padding block-inner">
                    <p><%=polyglot.t('offer.not.yet.validated')%>.</p>
                </div>
    <%
            }
            else if(validation.state == 'validated'){
    %>
                <div class="bg-success with-padding block-inner">
                    <p><%=polyglot.t('offer.validated.by')%> <b><%=validation.by.firstName%> <%=validation.by.lastName%></b> <%=polyglot.t('on')%> <%=validation.date%>.</p>
                    <p>Message : <%=validation.msg%></p>
                </div>
    <%
            }
            else{
    %>
                <div class="bg-danger with-padding block-inner">
                    <p><%=polyglot.t('offer.denied.by')%> <b><%=validation.by.firstName%> <%=validation.by.lastName%></b> <%=polyglot.t('on')%> <%=validation.date%>.</p>
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
                <label><%=polyglot.t('internship.type')%> :</label>
                <%=type%>
            </p>
            
            <p>
                <label><%=polyglot.t('department')%> :</label>
                <%=department%>
            </p>
            
            <p>
                <label><%=polyglot.t('departmentSpec')%> :</label>
                <%=departmentSpec%>
            </p>
            
            <p>
                <label><%=polyglot.t('company')%> :</label>
                <a href="#companies/<%=company._id%>"><%=company.cname%></a>
            </p>
            
            <p class="justified">
                <label>Mission :</label>
                <%=mission%>
            </p>
            
            <p class="justified">
                <label><%=polyglot.t('profile.searched')%> :</label>
                <%=profile%>
            </p>
            
            <p>
                <label><%=polyglot.t('remuneration.monthly.gross')%> :</label>
                <%=rem%> €
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
                
            <%
                if(provided.by == ''){
            %>
                    <button class="btn btn-success js-provide"><i class="icon-checkbox-unchecked"></i> <%=polyglot.t('defineAsProvided')%></button>
            <%
                }
                else{
            %>
                    <button class="btn btn-success js-provide"><i class="icon-checkbox-checked"></i> <%=polyglot.t('changeAttribution')%></button>
            <%
                }
            %>
                    <button class="btn btn-success js-modify"><i class="icon-pencil3"></i> <%=polyglot.t('modify')%></button>
                    <button class="btn btn-danger js-delete"><i class="icon-remove3"></i> <%=polyglot.t('delete')%></button>
                </div>
            
        <%
            }
            else if(userCategory == 'teachers'){
        %>
        
                <div class="pull-right">
                    <button class="btn btn-success js-validate"><i class="icon-checkmark3"></i> <%=polyglot.t('validate')%></button>
                    <button class="btn btn-danger js-refuse"><i class="icon-checkmark3"></i> <%=polyglot.t('deny')%></button>
                </div>
            
        <%
            }
            else{
        %>
        
                <div class="pull-right">
                    <%
                        if(provided.by == ''){
                    %>
                            <%
                                if(isUserFavorite){
                            %>
                                    <button class="btn btn-success js-delete-from-favorites"><i class="icon-remove3"></i> <%=polyglot.t('favorites.remove')%></button>
                            <%
                                }
                                else{
                            %>
                                    <button class="btn btn-success js-favorites"><i class="icon-star4"></i> <%=polyglot.t('favorites.add')%></button>
                            <%
                                }
                            %>
                            
                            <button class="btn btn-success js-postulate"> <%=polyglot.t('postulate')%></button>
                    <%
                        }
                    %>

                </div>
            
        <%
            }
        %>
        
    </div>
</div>