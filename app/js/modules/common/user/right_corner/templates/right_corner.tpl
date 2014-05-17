<ul class="nav navbar-nav navbar-right collapse" id="navbar-icons">
        
    <li class="user dropdown">
        <a class="dropdown-toggle" data-toggle="dropdown">
            <% if(photoUrl != "") {%>
                <img src="<%= photoUrl %>" alt="">
            <%}else{%>
                <span class="no-photo">
                    
                </span>
            <%}%>
            <span><%= firstName %> <%= lastName %></span>
            <br /><span>Options</span>
            <i class="caret"></i>
        </a>
        <div id="user-id" class="hidden"><%=_id%></div>
        <ul class="dropdown-menu dropdown-menu-right icons-right">
            <li><a href="#user/profile"><i class="icon-profile"></i> <%= polyglot.t('profile') %></a></li>
            <li><a href="/auth/logout"><i class="icon-exit"></i> <%= polyglot.t('logout') %></a></li>
        </ul>
    </li>
    
</ul>