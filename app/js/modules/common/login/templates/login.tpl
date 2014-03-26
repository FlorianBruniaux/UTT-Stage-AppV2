<!-- Login wrapper -->
<div class="login-wrapper">
    
    <div id="logo">
        <img src="images/logo_utt.jpg" width="100%">
    </div>
    
        
    <div class="popup-header"><span class="text-semibold"><%= polyglot.t('app.name') %></span>

    </div>
    
    <div class="well">
        <form action="#" role="form">
            <div class="form-group has-feedback">
                <label><%= polyglot.t('email') %> : </label>
                <input type="text" class="form-control" placeholder="<%= polyglot.t('email') %>">
                <i class="icon-user form-control-feedback"></i>
            </div>
            
            <div class="form-group has-feedback">
                <label><%= polyglot.t('password') %> : </label>
                <input type="password" class="form-control" placeholder="<%= polyglot.t('password') %>">
                <i class="icon-lock form-control-feedback"></i>
            </div>
            
            <div class="form-group has-feedback">
              
                <button type="submit" class="btn btn-info">
                    Ok
                </button>
              
            </div>
        </form>
        <hr>
        
        <div class="row form-actions">
            <div class="col-xs-12">
                <a href="/auth/linkedin">
                    <button type="submit" class="btn btn-info">
                        <i class="icon-linkedin"></i><%= polyglot.t('connectWith') %> Linkedin
                    </button>
                </a>
            </div>
        </div>
      
    </div>
    
</div>
<!-- /login wrapper -->