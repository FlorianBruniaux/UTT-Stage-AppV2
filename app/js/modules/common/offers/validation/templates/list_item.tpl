<td>
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

<td><%=type%></td>

<td><%=department%></td>

<td><%=departmentSpec%></td>

<td>
    <a href="#companies/<%=company._id%>"><%=company.cname%></a>
</td>

<td><%=fullAddress%></td>

<td>
    <a href="#offers/<%=_id%>"><%=title%></a>
</td>
