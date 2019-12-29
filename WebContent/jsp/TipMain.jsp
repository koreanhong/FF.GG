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
<link rel="stylesheet" href="../css/community.css">
<script src="https://code.jquery.com/jquery-2.2.4.js"></script>

<script type="text/javascript">
	$(document).ready(function() {

		$('.nav-link').click(function() {
			var point = '${point}'
			if (point >= 100) {
				location.href = 'Tip_insertForm.do';
			} else {
				alert("포인트가 부족합니다.");
			}
		});
		
	})
</script>

<style>
.wrap {
	margin-top:	100px;
}

div#board_name {
    width: 1000px;
    float: right;
}

.CategoryDiv {
    margin-top: 15px;
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
						<tr>
							<td colspan="6" align="center" style="font-size: 20px; padding-top: 20px; padding-bottom: 20px;"><c:if test="${start != 1 }">
									<a href="Tip_Main.do${tstring }page=1">[처음]</a>
									<a href="Tip_Main.do${tstring }page=${start-1 }">[이전]</a>
								</c:if> <c:forEach begin="${start }" end="${end }" var="i">
									<c:choose>
										<c:when test="${i==current }">[${i }]</c:when>
										<c:otherwise>
											<a href="Tip_Main.do${tstring }page=${i }">[${i }]</a>
										</c:otherwise>
									</c:choose>
								</c:forEach> <c:if test="${end < last }">
									<a href="Tip_Main.do${tstring }page=${end+1 }">[다음]</a>
									<a href="Tip_Main.do${tstring }page=${last } ">[마지막]</a>
								</c:if></td>
						</tr>
					</table>
				</div>
				<div class="search_option">
					<nav class="navbar navbar-expand-sm bg-light navbar-primary">
						<ul class="navbar-nav">
							<li class="nav-item active">
								<a class="nav-link" style="cursor:pointer;">글 쓰 기</a>
							</li>
							<li class="nav-item active">
								<a class="nav-link" href="Community_main.do">메 인 으 로</a>
							</li>
				
							<form class="form-inline" action="Tip_Main.do" method="post">
								<li class="nav-item active">
									<a class="nav-link">날 짜 검 색 : </a>
									<li class="nav-item active">
										<input type="date" name="startdate" class="form-control" id="startdate" style="width:160px;">
									</li>
									<li class="nav-item active">
										<a class="nav-link">~</a>
									</li>
									<li class="nav-item active">
										<input type="date" name="enddate" class="form-control" id="enddate" style="width:160px;">
									</li>
								</li>
					   			<select class="form-control" name="type" id="select_search">
									<option value="0">검 색 방 식</option>
									<option value="1">제 목</option>
									<option value="2">내 용</option>
									<option value="3">제 목 / 내 용</option>
									<option value="4">작 성 자</option>
								</select>
							<input class="form-control mr-sm-2" name="keyword" type="text" placeholder="keyword">
							<button class="btn btn-primary" type="submit">Search</button>
							</form>
						</ul>
					</nav>
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

