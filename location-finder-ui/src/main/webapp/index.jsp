<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en" lang="en">
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
	<title>Modular Development with Spring Technologies and AJAX</title>
	<link rel="stylesheet" href="<c:url value="/resources/styles/blueprint/screen.css" />" type="text/css" media="screen, projection" />
	<script type="text/javascript" src="<c:url value="/resources/javascript/jquery/1.5.1/jquery.js" />"></script>
	

<script type="text/javascript">


function post_to_url(path, params, method) {
    method = method || "post"; // Set method to post by default, if not specified.

    // The rest of this code assumes you are not using a library.
    // It can be made less wordy if you use one.
    var form = document.createElement("form");
    form.setAttribute("method", method);
    form.setAttribute("action", path);

    for(var key in params) {
        var hiddenField = document.createElement("input");
        hiddenField.setAttribute("type", "hidden");
        hiddenField.setAttribute("name", key);
        hiddenField.setAttribute("value", params[key]);

        form.appendChild(hiddenField);
    }

    document.body.appendChild(form);    // Not entirely sure if this is necessary
    form.submit();
}
</script>

</head>
<body>
<div id="page" class="container">
	
	<div id="header">
		
		<table width="100%">
		<tr>
			<td>
				<a href="<c:url value="/" />">
					<img src="<c:url value="/resources/images/spring09_logo.png"/>" alt="SpringSource/VMWare"/>
				</a>	
			</td>
		</tr>
	</table>
		
	</div>
<hr/>
<h2>Modular Development for the cloud with Spring Technologies</h2>
<h3 class="alt">Spring Integration, RabbitMq and SpringAMQP, Spring MVC, jQuery</h3>
<p>
	<a id="searchFormRequest" href="#" onclick="post_to_url('service/search', {'searchFormName':'form-a'});" >Begin</a>
</p>
</div>
</body>
</html>