<!-- Login wrapper -->
<div class="login-wrapper">
    
    <div id="logo">
        <img src="images/logo_utt.jpg" width="100%">
    </div>
    
        
    <div class="popup-header">
        <h4 class="text-semibold"><%= polyglot.t('app.name') %></h4>
        <span><%= polyglot.t('login.title') %></span>
    </div>
    
    <div class="well">
        
        <div class="row form-actions">
            <div class="col-xs-12">
                <label><%= polyglot.t('notRegistered') %></label>
                <a href="#" class="js-sign-on"><%= polyglot.t('signOn') %></a>
            </div>
        </div>

        <hr>
            
        <form id="login-form" role="form" action="/auth/local" method="post">
            <div class="form-group has-feedback">
                <label><%= polyglot.t('email') %>  </label><span class="mandatory">*</span>
                <input type="text" class="required form-control" name="email" placeholder="<%= polyglot.t('email') %>">
                <i class="icon-user form-control-feedback"></i>
            </div>
            
            <div class="form-group has-feedback">
                <label><%= polyglot.t('password') %>  </label><span class="mandatory">*</span>
                <input type="password" class="required form-control" name="password" placeholder="<%= polyglot.t('password') %>">
                <i class="icon-lock form-control-feedback"></i>
     
                <a href="#" class="js-forgot-password"><%= polyglot.t('forgotPassword') %>?</a>
                
            </div>
    
            <div class="form-group has-feedback">
                <button class="btn btn-info js-submit">
                    <%= polyglot.t('signIn') %>
                </button>
            </div>
        </form>

        <hr>
        
        <div class="row">
            <div class="col-xs-12">
                <a href="/auth/linkedin">
                    <button class="btn btn-info">
                        <i class="icon-linkedin"></i><%= polyglot.t('connectWith') %> Linkedin
                    </button>
                </a>
            </div>
        </div>
    </div>
    
</div>
<!-- /login wrapper -->