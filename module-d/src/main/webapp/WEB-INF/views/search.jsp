<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en" lang="en">
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
	<title>Search Location</title>
	<link rel="stylesheet" href="<c:url value="/resources/styles/blueprint/screen.css" />" type="text/css" media="screen, projection" />
	<script type="text/javascript" src="<c:url value="/resources/javascript/jquery/1.5.1/jquery.js" />"></script>
	<script src="<c:url value="/resources/javascript/custom.js" />" type="text/javascript"></script>
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
		${searchForm}
	
	<br>
	
	<div id="response"></div>
	
	<div id="footer">
		<hr/>
	</div>
</div>
</body>
</html>