<div class="panel panel-default">
    
    <div class="panel-heading">
        
        <h6 class="panel-title">
            <i class="icon-user"></i>
            <%=firstName%> <%=lastName%>
            
        </h6>

    </div>

    <div class="bg-info with-padding block-inner">
        <p><%=polyglot.t('someFieldsMustBeFilledWithLinkedin')%></p>
    </div>
    
    <div class="panel-body">

        <div class="user-desc">
            
            <p class="desc">
                <label><%=polyglot.t('firstName')%> :</label>
                <%=firstName%>
            </p>
            
            <p class="desc">
                <label><%=polyglot.t('lastName')%> :</label>
                <%=lastName%>
            </p>
            
            <%
                if(userCategory == 'students'){
            %>
                <p class="desc">
                    <label><%=polyglot.t('department')%> - <%=polyglot.t('departmentSpec')%> :</label>
                    <%=specificToCategory.department%> - <%=specificToCategory.departmentSpec%>
                </p>
            <%
                }
            %>
            
            
            <p class="desc">
                <label><%=polyglot.t('email')%> :</label>
                <%=email%>
            </p>
            
            <p class="desc">
                <label><%=polyglot.t('phone.number')%> :</label>
                <%=mobile%>
            </p>
            
            <p class="desc">
                <label><%=polyglot.t('about.me')%> :</label>
                <p><%=headline%></p>
                <%=summary%>
            </p>
            
            <p class="desc">
                <label><%=polyglot.t('skillset')%> :</label>
                <div class="tags">
                    <%
                        _.each(skills.values, function(_value){
                            print('<span class="tag">'+_value.skill.name+'</span>'); 
                        });
                        
                    %>
                </div>
            </p>
            <div class="tags_clear"></div>
            
            <p class="desc">
                <label><%=polyglot.t('education')%> :</label>
                <%
                    _.each(educations.values, function(_value){
                        print(
                            '<div class="education">'+
                                '<p>'+
                                    '<b class="education-title">' + _value.schoolName +'</b>'+
                                    '<br />'+_value.degree +' : '+ _value.fieldOfStudy+
                                    '<br /> <i>' + ( (_value.isCurrent == true ) ? ( 'Current position since ' +  _value.startDate.year ) :  ( _value.startDate.year + ' -> ' + _value.endDate.year) )+ '</i>' +
                                '</p>'+
                                ( (_value.notes != undefined ) ? _value.notes : '') +
                            '</div>'
                        ); 
                    });
                    
                %>
            </p>
            
            <p class="desc">
                <label><%=polyglot.t('professional.experiences')%> :</label>
                <%
                    _.each(positions.values, function(_value){
                        print(
                            '<div class="position">'+
                                '<p>'+
                                    '<b class="position-title">' + _value.company.name +'</b>'+
                                    '<br /> <i>' + ( (_value.isCurrent == true ) ? ( 'Current position since ' + _value.startDate.month + '/' + _value.startDate.year ) :  (_value.startDate.month + '/' + _value.startDate.year + ' -> ' + _value.endDate.month +'/' + _value.endDate.year) )+ '</i>' +
                                '</p>'+
                                ( (_value.summary != undefined ) ? _value.summary:'') +
                            '</div>'
                        ); 
                    });
                    
                %>
            </p>
            
            
        </div>
        
        <div class="pull-right">
            <a href="/auth/linkedin">
                <button class="btn btn-info">
                    <i class="icon-linkedin"></i><%=polyglot.t('linkedin.sync')%>
                </button>
            </a>
            <button class="btn btn-success js-modify"><i class="icon-pencil3"></i><%=polyglot.t('modify')%></button>
        </div>
        
    </div>
</div>