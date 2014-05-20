<td class="center">
    <%=offer.provided.by.firstName%> <%=offer.provided.by.lastName%>
</td>

<td class="center">
    <a href="#companies/<%=offer.company._id%>"><%=offer.company.cname%></a>
</td>

<td class="center">
    <%=offer.type%>
</td>

<td class="center">
    <a href="#monitoring/<%=_id%>/edit/sheet0"><%=sheets.sh0.name%></a>
    <%
        if(sheets.sh0.validation.validated == true){
    %>
        <p ><i style="color: green; " class="icon-checkmark-circle"></i></p></i>
    <%
        }
    %>
</td>

<td class="center">
    <a href="#monitoring/<%=_id%>/edit/sheet1"><%=sheets.sh1.name%></a>
    <%
        if(sheets.sh1.validation.validated == true){
    %>
        <p ><i style="color: green; " class="icon-checkmark-circle"></i></p></i>
    <%
        }
    %>
</td>

<td class="center">
    <a href="#monitoring/<%=_id%>/edit/sheet2"><%=sheets.sh2.name%></a>
    <%
        if(sheets.sh2.validation.validated == true){
    %>
        <p><i style="color: green;" class="icon-checkmark-circle"></i></p></i>
    <%
        }
    %>
</td>

<td class="center">
    <a href="#monitoring/<%=_id%>/edit/sheet3"><%=sheets.sh3.name%></a>
    <%
        if(sheets.sh3.validation.validated == true){
    %>
        <p><i style="color: green;" class="icon-checkmark-circle"></i></p></i>
    <%
        }
    %>
</td>

<td class="center">
    <a href="#monitoring/<%=_id%>/edit/sheet4"><%=sheets.sh4.name%></a>
    <%
        if(sheets.sh4.validation.validated == true){
    %>
        <p><i style="color: green;" class="icon-checkmark-circle"></i></p></i>
    <%
        }
    %>
</td>

<td class="center">
    <a href="#monitoring/<%=_id%>/edit/sheet5"><%=sheets.sh5.name%></a>
    <%
        if(sheets.sh5.validation.validated == true){
    %>
        <p><i style="color: green;" class="icon-checkmark-circle"></i></p></i>
    <%
        }
    %>
</td>

<td class="center">
    <a href="#monitoring/<%=_id%>/edit/sheet6"><%=sheets.sh6.name%></a>
    <%
        if(sheets.sh6.validation.validated == true){
    %>
        <p><i style="color: green;" class="icon-checkmark-circle"></i></p></i>
    <%
        }
    %>
</td>

<td class="center">
    <a href="#monitoring/<%=_id%>/edit/sheet7"><%=sheets.sh7.name%></a>
    <%
        if(sheets.sh7.validation.validated == true){
    %>
        <p><i style="color: green;" class="icon-checkmark-circle"></i></p></i>
    <%
        }
    %>
</td>

<td class="center">
    <a href="#monitoring/<%=_id%>/edit/sheet8"><%=sheets.sh8.name%></a>
    <%
        if(sheets.sh8.validation.validated == true){
    %>
        <p><i style="color: green;" class="icon-checkmark-circle"></i></p></i>
    <%
        }
    %>
</td>

<td class="center">
    <a href="#monitoring/<%=_id%>/edit/sheet9"><%=sheets.sh9.name%></a>
    <%
        if(sheets.sh9.validation.validated == true){
    %>
        <p><i style="color: green;" class="icon-checkmark-circle"></i></p></i>
    <%
        }
    %>
</td>

<td class="center">
    <a href="#monitoring/<%=_id%>/edit/sheet10"><%=sheets.sh10.name%></a>
    <%
        if(sheets.sh10.validation.validated == true){
    %>
        <p><i style="color: green;" class="icon-checkmark-circle"></i></p></i>
    <%
        }
    %>
</td>
