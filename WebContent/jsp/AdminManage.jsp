<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
<link rel="stylesheet" href="../css/community.css">


<style type="text/css">

.leftdiv {
	margin-top: 0px;
}

#membertab {
	width: 1000px;
	text-align: center;
	border: 1px black solid;
	margin-top: 137px;
	margin-bottom: 100px;
}

#membertab tr {
	height: 30px;
}
</style>
</head>
<body class="default">
	<div id="wrapper" class="sub">
		<header id="header" class="after_1102">
			<jsp:include page="header.jsp" />
		</header>
		<main id="middle" class="sub">
		<div class="wrap">
			<div class="leftdiv">
				<div id="logindiv">
					<c:if test="${result == 2}">
						<jsp:include page="NotLogin.jsp"></jsp:include>
					</c:if>
					<c:if test="${result == 1}">
						<jsp:include page="Login.jsp"></jsp:include>
					</c:if>
				</div>
				<div id="categorydiv">
					<div class="CategoryDiv" onclick="location.href='Humor_Main.do'">-
						유머 게시판</div>
					<br>
					<div class="CategoryDiv" onclick="location.href='Tip_Main.do'">-
						팁 게시판</div>
					<br>
					<div class="CategoryDiv" onclick="location.href='Report_Main.do'">-
						신고 게시판</div>
					<br>
					<div class="CategoryDiv" onclick="location.href='Chat.do'">-
						나랑 할사람</div>
				</div>
			</div>
			<div id="centerwrapper">
				<div id="memberdiv">
					<table id="membertab">
						<tr>
							<th>아이디</th>
							<th>이름</th>
							<th>이메일</th>
							<th>포인트</th>
							<th>포인트관리</th>
							<th>관리</th>
						</tr>
						<c:forEach items="${memberList }" var="m">
							<c:if test="${m.id != 'admin' }">
								<tr>
									<td>${m.id }</td>
									<td>${m.name }</td>
									<td>${m.email }</td>
									<td>${m.point }</td>
									<td><input type="button" value="up"
										onclick="location.href='Pointup.do?id=${m.id }'">&nbsp
										<input type="button" value="down"
										onclick="location.href='Pointdown.do?id=${m.id }'"></td>
									<td><input type="button" value="나가"
										onclick="location.href='Withdrawal.do?id=${m.id }'"></td>
								</tr>

							</c:if>
						</c:forEach>
					</table>
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