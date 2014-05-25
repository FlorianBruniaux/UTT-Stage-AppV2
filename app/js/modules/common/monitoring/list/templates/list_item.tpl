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
    <a href="#monitoring/<%=_id%>/edit/sheet0"><%=polyglot.t('monitoring.sheets.sheet0.name')%></a>
    <%
        if(sheets.sheet0.validation){
    %>
            <p ><i style="color: green; " class="icon-checkmark-circle"></i></p>
    <%
        }
    %>
</td>

<td class="center">
    <a href="#monitoring/<%=_id%>/edit/sheet1"><%=polyglot.t('monitoring.sheets.sheet1.name')%></a>
    <%
        if(sheets.sheet1.validation){
    %>
            <p ><i style="color: green; " class="icon-checkmark-circle"></i></p>
    <%
        }
    %>
</td>

<td class="center">
    <a href="#monitoring/<%=_id%>/edit/sheet2"><%=polyglot.t('monitoring.sheets.sheet2.name')%></a>
    <%
        if(sheets.sheet2.validation){
    %>
            <p><i style="color: green;" class="icon-checkmark-circle"></i></p>
    <%
        }
    %>
</td>

<td class="center">
    <a href="#monitoring/<%=_id%>/edit/sheet3"><%=polyglot.t('monitoring.sheets.sheet3.name')%></a>
    <%
        if(sheets.sheet3.validation){
    %>
            <p><i style="color: green;" class="icon-checkmark-circle"></i></p>
    <%
        }
    %>
</td>

<td class="center">
    <a href="#monitoring/<%=_id%>/edit/sheet4"><%=polyglot.t('monitoring.sheets.sheet4.name')%></a>
    <%
        if(sheets.sheet4.validation){
    %>
            <p><i style="color: green;" class="icon-checkmark-circle"></i></p>
    <%
        }
    %>
</td>

<td class="center">
    <a href="#monitoring/<%=_id%>/edit/sheet5"><%=polyglot.t('monitoring.sheets.sheet5.name')%></a>
    <%
        if(sheets.sheet5.validation){
    %>
            <p><i style="color: green;" class="icon-checkmark-circle"></i></p>
    <%
        }
    %>
</td>

<td class="center">
    <a href="#monitoring/<%=_id%>/edit/sheet6"><%=polyglot.t('monitoring.sheets.sheet6.name')%></a>
    <%
        if(sheets.sheet6.validation){
    %>
            <p><i style="color: green;" class="icon-checkmark-circle"></i></p>
    <%
        }
    %>
</td>

<td class="center">
    <a href="#monitoring/<%=_id%>/edit/sheet7"><%=polyglot.t('monitoring.sheets.sheet7.name')%></a>
    <%
        if(sheets.sheet7.validation){
    %>
            <p><i style="color: green;" class="icon-checkmark-circle"></i></p>
    <%
        }
    %>
</td>

<td class="center">
    <a href="#monitoring/<%=_id%>/edit/sheet8"><%=polyglot.t('monitoring.sheets.sheet8.name')%></a>
    <%
        if(sheets.sheet8.validation){
    %>
            <p><i style="color: green;" class="icon-checkmark-circle"></i></p>
    <%
        }
    %>
</td>

<td class="center">
    <a href="#monitoring/<%=_id%>/edit/sheet9"><%=polyglot.t('monitoring.sheets.sheet9.name')%></a>
    <%
        if(sheets.sheet9.validation){
    %>
            <p><i style="color: green;" class="icon-checkmark-circle"></i></p>
    <%
        }
    %>
</td>

<td class="center">
    <a href="#monitoring/<%=_id%>/edit/sheet10"><%=polyglot.t('monitoring.sheets.sheet10.name')%></a>
    <%
        if(sheets.sheet10.validation){
    %>
            <p><i style="color: green;" class="icon-checkmark-circle"></i></p>
    <%
        }
    %>
</td>
