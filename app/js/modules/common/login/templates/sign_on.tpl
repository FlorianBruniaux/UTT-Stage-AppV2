<!-- Login wrapper -->
<div class="login-wrapper">
    
    <div id="logo">
        <img src="images/logo_utt.jpg" width="100%">
    </div>
    
    <div class="popup-header">
        <h4 class="text-semibold"><%= polyglot.t('app.name') %></h4>
        <span><%= polyglot.t('register.title') %></span>
    </div>
    
    <div class="well">
        
        <form action="/auth/local/signon" method="post" role="form">
            
            <div class="form-group has-feedback">
                <label><%= polyglot.t('firstName') %> : </label>
                <input type="text" class="form-control" name="firstName" placeholder="<%= polyglot.t('firstName') %>">
                <i class="icon-user form-control-feedback"></i>
            </div>
            
            <div class="form-group has-feedback">
                <label><%= polyglot.t('lastName') %> : </label>
                <input type="text" class="form-control" name="lastName" placeholder="<%= polyglot.t('lastName') %>">
                <i class="icon-user form-control-feedback"></i>
            </div>
            
            <div class="form-group has-feedback">
                <label><%= polyglot.t('email') %> : </label>
                <input type="text" class="form-control" name="email" placeholder="<%= polyglot.t('email') %>">
                <i class="icon-mail form-control-feedback"></i>
            </div>
            
            <div class="form-group has-feedback">
                <label><%= polyglot.t('password') %> : </label>
                <input type="password" class="form-control" name="password" placeholder="<%= polyglot.t('password') %>">
                <i class="icon-lock form-control-feedback"></i>
            </div>

            <div class="form-group has-feedback">
                <label><%= polyglot.t('confirmPassword') %> : </label>
                <input type="password" class="form-control"  name="confirmPassword" placeholder="<%= polyglot.t('confirmPassword') %>">
                <i class="icon-lock form-control-feedback"></i>
            </div>
            
            <div class="form-group has-feedback">
                <button type="submit" class="btn btn-info">
                    <%= polyglot.t('signOn') %>
                </button>
            </div>
        </form>
         
        <p><a href="/"> <%= polyglot.t('login.goBack') %></a></p>
        
 
    </div>
    
</div>
<!-- /login wrapper -->