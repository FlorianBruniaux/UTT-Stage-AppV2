<td class="center">
    <%
        if(validation.state == 'not yet treated'){
    %>
        <a href="#offers/<%=_id%>"><button  class="btn btn-warning">Not treated</button></a>
    <%
        }
        else{
    %>
        <a href="#offers/<%=_id%>"><button class="btn btn-danger">Denied</button></a>
    <%
        }
    %>
</td>

<td class="center"><%=type%></td>

<td class="center"><%=department%></td>

<td class="center"><%=departmentSpec%></td>

<td class="center">
    <a href="#companies/<%=company._id%>"><%=company.cname%></a>
</td>

<td class="center"><%=fullAddress%></td>

<td class="center">
    <a href="#offers/<%=_id%>"><%=title%></a>
</td>
