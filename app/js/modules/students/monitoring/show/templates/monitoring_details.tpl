<div class="panel panel-default">
    
    <div class="panel-heading">
        
        <h6 class="panel-title">
            <i class="icon-list"></i>
            <%=polyglot.t('monitoring.of')%> <%=offer.provided.by.firstName%> <%=offer.provided.by.lastName%>
        </h6>

    </div>
    
    <div class="panel-body">
            
        <div class="monitoring-desc details">
            
            <p>
                <label><%=polyglot.t('student')%> :</label>
                <%=offer.provided.by.firstName%> <%=offer.provided.by.lastName%>
            </p>
            
            <p>
                <label><%=polyglot.t('offer')%> :</label>
                <a href="#offers/<%=offer._id%>"><%=offer.title%></a>
            </p>
            
            <p>
                <label><%=polyglot.t('internship.type')%> :</label>
                <%=offer.type%>
            </p>
            
            <label><%=polyglot.t('sheets')%> : </label>
            <div class="sheets">

                <p>
                    
                    <%
                        if(sheets.sheet1.validation){
                    %>
                            <i style="color: green;" class="icon-file-check"></i>
                    <%
                        }
                        else{
                    %>
                            <i style="color: lightgrey; " class="icon-file-remove"></i>
                    <%
                        }
                    %>
                    
                    <label> 1 - <%=polyglot.t('monitoring.sheets.sheet1.name')%> : </label>
                    <a href="#monitoring/<%=_id%>/edit/sheet1"><i class="icon-pencil3"></i> </a>
                    
                    <p><span>(<%=polyglot.t('deadline')%> : <%= (sheets.sheet1.deadline != '')? sheets.sheet1.deadline:polyglot.t('unknown.f') %>)</span></p>
                    
                    <%
                        if(sheets.sheet1.validation){
                    %>
                            <p style="color: green;" >
                                <span>
                                    <b><%=polyglot.t('validated.f.by')%> <%= sheets.sheet1.validation.by.firstName %> <%= sheets.sheet1.validation.by.lastName %> (<%=sheets.sheet1.validation.date%>) : </b>
                                    <%= sheets.sheet1.validation.msg %>
                                </span>
                            </p>
                    <%
                        }
                    %>
                    
                </p>
                
                <hr>
                
                <p>
                    
                    <%
                        if(sheets.sheet2.validation){
                    %>
                            <i style="color: green;" class="icon-file-check"></i>
                    <%
                        }
                        else{
                    %>
                            <i style="color: lightgrey; " class="icon-file-remove"></i>
                    <%
                        }
                    %>
                    
                    <label> 2 - <%=polyglot.t('monitoring.sheets.sheet2.name')%> : </label>
                    <a href="#monitoring/<%=_id%>/edit/sheet2"><i class="icon-pencil3"></i> </a>
                    
                    <p><span>(<%=polyglot.t('deadline')%> : <%= (sheets.sheet2.deadline != '')? sheets.sheet2.deadline:polyglot.t('unknown.f') %>)</span></p>
                    
                    <%
                        if(sheets.sheet2.validation){
                    %>
                            <p style="color: green;" >
                                <span>
                                    <b><%=polyglot.t('validated.f.by')%> <%= sheets.sheet2.validation.by.firstName %> <%= sheets.sheet2.validation.by.lastName %> (<%=sheets.sheet2.validation.date%>) : </b>
                                    <%= sheets.sheet2.validation.msg %>
                                </span>
                            </p>
                    <%
                        }
                    %>
                    
                </p>
                
                <hr>
                
                <p>
                    <%
                        if(sheets.sheet3.validation){
                    %>
                            <i style="color: green;" class="icon-file-check"></i>
                    <%
                        }
                        else{
                    %>
                            <i style="color: lightgrey; " class="icon-file-remove"></i>
                    <%
                        }
                    %>
                    
                    <label> 3 - <%=polyglot.t('monitoring.sheets.sheet3.name')%> : </label>
                    <a href="#monitoring/<%=_id%>/edit/sheet3"><i class="icon-pencil3"></i> </a>
                    
                    <p><span>(<%=polyglot.t('deadline')%> : <%= (sheets.sheet3.deadline != '')? sheets.sheet3.deadline:polyglot.t('unknown.f') %>)</span></p>
                    
                    <%
                        if(sheets.sheet3.validation){
                    %>
                            <p style="color: green;" >
                                <span>
                                    <b><%=polyglot.t('validated.f.by')%> <%= sheets.sheet3.validation.by.firstName %> <%= sheets.sheet3.validation.by.lastName %> (<%=sheets.sheet3.validation.date%>) : </b>
                                    <%= sheets.sheet3.validation.msg %>
                                </span>
                            </p>
                    <%
                        }
                    %>
                    
                </p>
                
                <hr>
    
                <p>
                    <%
                        if(sheets.sheet5.validation){
                    %>
                            <i style="color: green;" class="icon-file-check"></i>
                    <%
                        }
                        else{
                    %>
                            <i style="color: lightgrey; " class="icon-file-remove"></i>
                    <%
                        }
                    %>
                    
                    <label> 5 - <%=polyglot.t('monitoring.sheets.sheet5.name')%>: </label>
                    <a href="#monitoring/<%=_id%>/edit/sheet5"><i class="icon-pencil3"></i> </a>
                    
                    <p><span>(<%=polyglot.t('deadline')%> : <%= (sheets.sheet5.deadline != '')? sheets.sheet5.deadline:polyglot.t('unknown.f') %>)</span></p>
                    
                    <%
                        if(sheets.sheet5.validation){
                    %>
                            <p style="color: green;" >
                                <span>
                                    <b><%=polyglot.t('validated.f.by')%> <%= sheets.sheet5.validation.by.firstName %> <%= sheets.sheet5.validation.by.lastName %> (<%=sheets.sheet5.validation.date%>) : </b>
                                    <%= sheets.sheet5.validation.msg %>
                                </span>
                            </p>
                    <%
                        }
                    %>
                    
                </p>
                
                <hr>
                    
                <p>
                    <%
                        if(sheets.sheet6.validation){
                    %>
                            <i style="color: green;" class="icon-file-check"></i>
                    <%
                        }
                        else{
                    %>
                            <i style="color: lightgrey; " class="icon-file-remove"></i>
                    <%
                        }
                    %>
                    
                    <label> 6 - <%=polyglot.t('monitoring.sheets.sheet6.name')%> : </label>
                    <a href="#monitoring/<%=_id%>/edit/sheet6"><i class="icon-pencil3"></i> </a>
                    
                    <p><span>(<%=polyglot.t('deadline')%> : <%= (sheets.sheet6.deadline != '')? sheets.sheet6.deadline:polyglot.t('unknown.f') %>)</span></p>
                    
                    <%
                        if(sheets.sheet6.validation){
                    %>
                            <p style="color: green;" >
                                <span>
                                    <b><%=polyglot.t('validated.f.by')%> <%= sheets.sheet6.validation.by.firstName %> <%= sheets.sheet6.validation.by.lastName %> (<%=sheets.sheet6.validation.date%>) : </b>
                                    <%= sheets.sheet6.validation.msg %>
                                </span>
                            </p>
                    <%
                        }
                    %>
                    
                </p>
                
                <hr>
    
                <p>
                    <%
                        if(sheets.sheet8.validation){
                    %>
                            <i style="color: green;" class="icon-file-check"></i>
                    <%
                        }
                        else{
                    %>
                            <i style="color: lightgrey; " class="icon-file-remove"></i>
                    <%
                        }
                    %>
                    
                    <label> 8 - <%=polyglot.t('monitoring.sheets.sheet8.name')%> : </label>
                    <a href="#monitoring/<%=_id%>/edit/sheet8"><i class="icon-pencil3"></i> </a>
                    
                    <p><span>(<%=polyglot.t('deadline')%> : <%= (sheets.sheet8.deadline != '')? sheets.sheet8.deadline:polyglot.t('unknown.f') %>)</span></p>
                    
                    <%
                        if(sheets.sheet8.validation){
                    %>
                            <p style="color: green;" >
                                <span>
                                    <b><%=polyglot.t('validated.f.by')%> <%= sheets.sheet8.validation.by.firstName %> <%= sheets.sheet8.validation.by.lastName %> (<%=sheets.sheet8.validation.date%>) : </b>
                                    <%= sheets.sheet8.validation.msg %>
                                </span>
                            </p>
                    <%
                        }
                    %>
                </p>
                
            </div>

        </div>
        
    </div>
</div>