<td class="center">
    <a href="#monitoring/<%=_id%>">
        <%=offer.provided.by.firstName%> <%=offer.provided.by.lastName%> (<%=offer.provided.by.specificToCategory.department%> - <%=offer.provided.by.specificToCategory.departmentSpec%>)
    </a>
</td>

<td class="center">
    <a href="#offers/<%=offer._id%>"><i class="icon-search"></i></a>
</td>

<td class="center">
    <%=offer.type%>
</td>

<td class="center">
    <a href="#monitoring/<%=_id%>/edit/sheet0"><%=sheets.sheet0.name%></a>
    <%
        if(sheets.sheet0.validation.validated == true){
    %>
            <p ><i style="color: green; " class="icon-checkmark-circle"></i></p>
    <%
        }
    %>
</td>

<td class="center">
    <a href="#monitoring/<%=_id%>/edit/sheet1"><%=sheets.sheet1.name%></a>
    <%
        if(sheets.sheet1.validation.validated == true){
    %>
            <p ><i style="color: green; " class="icon-checkmark-circle"></i></p>
    <%
        }
    %>
</td>

<td class="center">
    <a href="#monitoring/<%=_id%>/edit/sheet2"><%=sheets.sheet2.name%></a>
    <%
        if(sheets.sheet2.validation.validated == true){
    %>
            <p><i style="color: green;" class="icon-checkmark-circle"></i></p>
    <%
        }
    %>
</td>

<td class="center">
    <a href="#monitoring/<%=_id%>/edit/sheet3"><%=sheets.sheet3.name%></a>
    <%
        if(sheets.sheet3.validation.validated == true){
    %>
            <p><i style="color: green;" class="icon-checkmark-circle"></i></p>
    <%
        }
    %>
</td>

<td class="center">
    <a href="#monitoring/<%=_id%>/edit/sheet4"><%=sheets.sheet4.name%></a>
    <%
        if(sheets.sheet4.validation.validated == true){
    %>
            <p><i style="color: green;" class="icon-checkmark-circle"></i></p>
    <%
        }
    %>
</td>

<td class="center">
    <a href="#monitoring/<%=_id%>/edit/sheet5"><%=sheets.sheet5.name%></a>
    <%
        if(sheets.sheet5.validation.validated == true){
    %>
            <p><i style="color: green;" class="icon-checkmark-circle"></i></p>
    <%
        }
    %>
</td>

<td class="center">
    <a href="#monitoring/<%=_id%>/edit/sheet6"><%=sheets.sheet6.name%></a>
    <%
        if(sheets.sheet6.validation.validated == true){
    %>
            <p><i style="color: green;" class="icon-checkmark-circle"></i></p>
    <%
        }
    %>
</td>

<td class="center">
    <a href="#monitoring/<%=_id%>/edit/sheet7"><%=sheets.sheet7.name%></a>
    <%
        if(sheets.sheet7.validation.validated == true){
    %>
            <p><i style="color: green;" class="icon-checkmark-circle"></i></p>
    <%
        }
    %>
</td>

<td class="center">
    <a href="#monitoring/<%=_id%>/edit/sheet8"><%=sheets.sheet8.name%></a>
    <%
        if(sheets.sheet8.validation.validated == true){
    %>
            <p><i style="color: green;" class="icon-checkmark-circle"></i></p>
    <%
        }
    %>
</td>

<td class="center">
    <a href="#monitoring/<%=_id%>/edit/sheet9"><%=sheets.sheet9.name%></a>
    <%
        if(sheets.sheet9.validation.validated == true){
    %>
            <p><i style="color: green;" class="icon-checkmark-circle"></i></p>
    <%
        }
    %>
</td>

<td class="center">
    <a href="#monitoring/<%=_id%>/edit/sheet10"><%=sheets.sheet10.name%></a>
    <%
        if(sheets.sheet10.validation.validated == true){
    %>
            <p><i style="color: green;" class="icon-checkmark-circle"></i></p>
    <%
        }
    %>
</td>
