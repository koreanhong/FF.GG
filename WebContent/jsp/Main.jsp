<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
<link rel="icon" href="data:;base64,iVBORw0KGgo=">
<link rel="stylesheet" href="../css/main.css">
</head>
<body class="default">
	<div id="wrapper" class="sub">
		<header id="header" class="after_1102">
			<jsp:include page="mainHeader.jsp"/>
		</header>
		<main id="middle" class="sub">
		<div class="datacenter">
			<div class="wrap">
				<div id="mainhumorboarddiv">
					<jsp:include page="HumorMainList.jsp" />
				</div>
				<div id="maintipboarddiv">
					<jsp:include page="TipMainList.jsp" />
				</div>
			</div>
		</div>
		</main>
		<footer id="footer" role="contentinfo">
			<jsp:include page="footer.jsp" />
		</footer>
	</div>
</body>
</html>