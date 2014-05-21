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
                <a href="#monitoring/sheet0/edit"><i class="icon-pencil3"></i> </a>
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
                <a href="#monitoring/sheet1/edit"><i class="icon-pencil3"></i> </a>
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
                <a href="#monitoring/sheet2/edit"><i class="icon-pencil3"></i> </a>
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
                <a href="#monitoring/sheet3/edit"><i class="icon-pencil3"></i> </a>
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
                <label style="margin-right:10px;">Sheet 5 - <%=sheets.sheet5.name%> : </label>
                <a href="#monitoring/sheet5/edit"><i class="icon-pencil3"></i> </a>
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
                <a href="#monitoring/sheet6/edit"><i class="icon-pencil3"></i> </a>
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
                <label style="margin-right:10px;">Sheet 8 - <%=sheets.sheet8.name%> : </label>
                <a href="#monitoring/sheet8/edit"><i class="icon-pencil3"></i> </a>
                <span style="margin-left:20px;">(Deadline : <%= (sheets.sheet0.deadline != '')? 'sheets.sheet0.deadline':'Unknown' %>)</span>
                <%
                    if(sheets.sheet8.validation.validated == true){
                %>
                        <i style="color: green; " class="icon-checkmark-circle"></i>
                <%
                    }
                %>
            </p>
            
            
        </div>
        
    </div>
</div>