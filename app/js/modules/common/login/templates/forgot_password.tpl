<!-- Login wrapper -->
<div class="login-wrapper">
    
    <div id="logo">
        <img src="images/logo_utt.jpg" width="100%">
    </div>
    
        
    <div class="popup-header">
        <h4 class="text-semibold"><%= polyglot.t('app.name') %></h4>
        <span><%= polyglot.t('forgotPassword.title') %></span>
    </div>
    
    <div class="well">
        
        <form id="forgot-password-form" action="/auth/local/forgotpassword" role="form">
            
            <div class="form-group has-feedback">
                <label><%= polyglot.t('email') %> : </label>
                <input type="text" class="form-control" name="email" placeholder="<%= polyglot.t('email') %>">
                <i class="icon-user form-control-feedback"></i>
            </div>
            
            <div class="form-group has-feedback">
                <button type="submit" class="btn btn-info">
                    <%= polyglot.t('newPassword') %>
                </button>
            </div>
        </form>
        
        <p><a href="/"> <%= polyglot.t('login.goBack') %></a></p>
 
    </div>
    
</div>
<!-- /login wrapper -->