<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
<link rel="icon" href="data:;base64,iVBORw0KGgo=">
</head>
<body>
	<div id="board_name">
		<h3>팁 게시판</h3>
		<table id="ListTable" class="table-hover">
			<tr align="center" class="table table-primary">
				<th class="th" style="width: 10%">No</th>
				<th class="th">제 목</th>
				<th class="th" style="width: 15%">작성일</th>
				<th class="th" style="width: 15%">조회수</th>
				<th class="th" style="width: 15%">작성자</th>
				<th class="th" style="width: 15%">추천수</th>
			</tr>

			<c:forEach items="${tboardList }" var="b">
				<tr align="center" class="table table-Active">
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
	</div>
</body>
</html>