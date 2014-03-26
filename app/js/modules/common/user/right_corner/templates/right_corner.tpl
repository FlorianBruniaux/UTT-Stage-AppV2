<ul class="nav navbar-nav navbar-right collapse" id="navbar-icons">
        
    <li class="user dropdown">
        <a class="dropdown-toggle" data-toggle="dropdown">
            <img src="<%= photoUrl %>" alt="">
            <span><%= firstName %> <%= lastName %></span>
            <br /><span>Options</span>
            <i class="caret"></i>
        </a>
        <ul class="dropdown-menu dropdown-menu-right icons-right">
            <li><a href="#users/profile/<%= _id %>"><i class="icon-profile"></i> Profile</a></li>
            <li><a href="#users/parameters/<%= _id %>"><i class="icon-cog"></i> Paramètres</a></li>
            <li><a href="/auth/linkedin/logout"><i class="icon-exit"></i> Déconnexion</a></li>
        </ul>
    </li>
    
</ul>