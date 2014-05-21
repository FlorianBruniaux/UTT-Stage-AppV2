<div class="panel panel-default">
    
    <div class="panel-heading">
        
        <h6 class="panel-title">
            <i class="icon-list"></i>
            <%=offer.provided.by.firstName%> <%=offer.provided.by.lastName%> monitoring
            
        </h6>

    </div>
    
    <div class="panel-body">
            
        <div class="monitoring-desc">
            
            <p>
                <label style="margin-right:10px;">Student :</label>
                <%=offer.provided.by.firstName%> <%=offer.provided.by.lastName%>
            </p>
            
            <p>
                <label style="margin-right:10px;">Offer :</label>
                <a href="#offers/<%=offer._id%>"><%=offer.title%></a>
            </p>
            
            <p>
                <label style="margin-right:10px;">Type :</label>
                <%=offer.type%>
            </p>
            
            <p>
                <label style="margin-right:10px;">Sheet 0 - <%=sheets.sheet0.name%> : </label>
                <a href="#monitoring/<%=_id%>/edit/sheet0"><i class="icon-pencil3"></i> </a>
                <span style="margin-left:20px;">(Deadline : <%= (sheets.sheet0.deadline != '')? 'sheets.sheet0.deadline':'Unknown' %>)</span>
                <%
                    if(sheets.sheet0.validation.validated == true){
                %>
                        <i style="color: green; " class="icon-checkmark-circle"></i>
                <%
                    }
                %>
            </p>
            
            <p>
                <label style="margin-right:10px;">Sheet 1 - <%=sheets.sheet1.name%> : </label>
                <a href="#monitoring/<%=_id%>/edit/sheet1"><i class="icon-pencil3"></i> </a>
                <span style="margin-left:20px;">(Deadline : <%= (sheets.sheet0.deadline != '')? 'sheets.sheet0.deadline':'Unknown' %>)</span>
                <%
                    if(sheets.sheet1.validation.validated == true){
                %>
                        <i style="color: green; " class="icon-checkmark-circle"></i>
                <%
                    }
                %>
            </p>
            
            <p>
                <label style="margin-right:10px;">Sheet 2 - <%=sheets.sheet2.name%> : </label>
                <a href="#monitoring/<%=_id%>/edit/sheet2"><i class="icon-pencil3"></i> </a>
                <span style="margin-left:20px;">(Deadline : <%= (sheets.sheet0.deadline != '')? 'sheets.sheet0.deadline':'Unknown' %>)</span>
                <%
                    if(sheets.sheet2.validation.validated == true){
                %>
                        <i style="color: green; " class="icon-checkmark-circle"></i>
                <%
                    }
                %>
            </p>
            
            <p>
                <label style="margin-right:10px;">Sheet 3 - <%=sheets.sheet3.name%> : </label>
                <a href="#monitoring/<%=_id%>/edit/sheet3"><i class="icon-pencil3"></i> </a>
                <span style="margin-left:20px;">(Deadline : <%= (sheets.sheet0.deadline != '')? 'sheets.sheet0.deadline':'Unknown' %>)</span>
                <%
                    if(sheets.sheet3.validation.validated == true){
                %>
                        <i style="color: green; " class="icon-checkmark-circle"></i>
                <%
                    }
                %>
            </p>
            
            <p>
                <label style="margin-right:10px;">Sheet 4 - <%=sheets.sheet4.name%> : </label>
                <a href="#monitoring/<%=_id%>/edit/sheet4"><i class="icon-pencil3"></i> </a>
                <span style="margin-left:20px;">(Deadline : <%= (sheets.sheet0.deadline != '')? 'sheets.sheet0.deadline':'Unknown' %>)</span>
                <%
                    if(sheets.sheet4.validation.validated == true){
                %>
                        <i style="color: green; " class="icon-checkmark-circle"></i>
                <%
                    }
                %>
            </p>

            <p>
                <label style="margin-right:10px;">Sheet 5 - <%=sheets.sheet5.name%> : </label>
                <a href="#monitoring/<%=_id%>/edit/sheet5"><i class="icon-pencil3"></i> </a>
                <span style="margin-left:20px;">(Deadline : <%= (sheets.sheet0.deadline != '')? 'sheets.sheet0.deadline':'Unknown' %>)</span>
                <%
                    if(sheets.sheet5.validation.validated == true){
                %>
                        <i style="color: green; " class="icon-checkmark-circle"></i>
                <%
                    }
                %>
            </p>
            
            <p>
                <label style="margin-right:10px;">Sheet 6 - <%=sheets.sheet6.name%> : </label>
                <a href="#monitoring/<%=_id%>/edit/sheet6"><i class="icon-pencil3"></i> </a>
                <span style="margin-left:20px;">(Deadline : <%= (sheets.sheet0.deadline != '')? 'sheets.sheet0.deadline':'Unknown' %>)</span>
                <%
                    if(sheets.sheet6.validation.validated == true){
                %>
                        <i style="color: green; " class="icon-checkmark-circle"></i>
                <%
                    }
                %>
            </p>
         
            <p>
                <label style="margin-right:10px;">Sheet 7 - <%=sheets.sheet7.name%> : </label>
                <a href="#monitoring/<%=_id%>/edit/sheet7"><i class="icon-pencil3"></i> </a>
                <span style="margin-left:20px;">(Deadline : <%= (sheets.sheet0.deadline != '')? 'sheets.sheet0.deadline':'Unknown' %>)</span>
                <%
                    if(sheets.sheet7.validation.validated == true){
                %>
                        <i style="color: green; " class="icon-checkmark-circle"></i>
                <%
                    }
                %>
            </p>

            <p>
                <label style="margin-right:10px;">Sheet 8 - <%=sheets.sheet8.name%> : </label>
                <a href="#monitoring/<%=_id%>/edit/sheet8"><i class="icon-pencil3"></i> </a>
                <span style="margin-left:20px;">(Deadline : <%= (sheets.sheet0.deadline != '')? 'sheets.sheet0.deadline':'Unknown' %>)</span>
                <%
                    if(sheets.sheet8.validation.validated == true){
                %>
                        <i style="color: green; " class="icon-checkmark-circle"></i>
                <%
                    }
                %>
            </p>
            

            <p>
                <label style="margin-right:10px;">Sheet 9 - <%=sheets.sheet9.name%> : </label>
                <a href="#monitoring/<%=_id%>/edit/sheet9"><i class="icon-pencil3"></i> </a>
                <span style="margin-left:20px;">(Deadline : <%= (sheets.sheet0.deadline != '')? 'sheets.sheet0.deadline':'Unknown' %>)</span>
                <%
                    if(sheets.sheet9.validation.validated == true){
                %>
                        <i style="color: green; " class="icon-checkmark-circle"></i>
                <%
                    }
                %>
            </p>

            <p>
                <label style="margin-right:10px;">Sheet 10 - <%=sheets.sheet10.name%> : </label>
                <a href="#monitoring/<%=_id%>/edit/sheet10"><i class="icon-pencil3"></i> </a>
                <span style="margin-left:20px;">(Deadline : <%= (sheets.sheet0.deadline != '')? 'sheets.sheet0.deadline':'Unknown' %>)</span>
                <%
                    if(sheets.sheet10.validation.validated == true){
                %>
                        <i style="color: green; " class="icon-checkmark-circle"></i>
                <%
                    }
                %>
            </p>

        </div>
        
    </div>
</div>