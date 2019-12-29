<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
</head>

<body>
	<div id="LoginIdDIv">${userid}님환영합니다.</div>
	<br>
	<c:if test="${userid == 'admin' }">
		<button type="button" onclick="location.href='AdminManage.do'" id="admin">회원관리페이지</button>
	</c:if>
	<div id="LoginMenuDiv">
		<c:if test="${userid != 'admin' }">
		<div id="LoginPointDiv">포인트 : ${point }점</div>
			<button onclick="location.href='Mypage.do'">마이페이지</button>
		</c:if>
		<button onclick="location.href='Logout.do'">로그아웃</button>
	</div>
</body>
</html>