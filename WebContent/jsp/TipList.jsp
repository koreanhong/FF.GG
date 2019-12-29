<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
</head>
<body>
	<table>
		<tr align="center">
			<th width="">글 번호</th>
			<th width="">제 목</th>
			<th width="">작성일</th>
			<th width="">조회수</th>
			<th width="">작성자</th>
			<th width="">추천수</th>
		</tr>
		<tr>
			<td colspan="6" width="1400" bgcolor="pink"></td>
		</tr>

		<c:forEach items="${tboardList }" var="b">
			<tr align="center">
				<td>${b.num }</td>
				<td><a href="Tip_view.do?num=${b.num }">${b.title } </a></td>
				<td><fmt:formatDate value="${b.writedate }"
						pattern="yyyy-MM-dd" /></td>
				<td>${b.readCount }</td>
				<td>${b.name }</td>
				<td>${b.up }</td>
			</tr>
		</c:forEach>
	</table>
</body>
</html>