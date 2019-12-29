<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
<link rel="stylesheet" href="../css/community.css">
<script src="https://code.jquery.com/jquery-2.2.4.js"></script>

<script type="text/javascript">
	$(document).ready(
			function() {
				
				$('#contentArea').keyup(function(e) {
		               var content = $(this).val();
		               $('#counter').html("(" + content.length + " / 최대 2000자)")

		               if (content.length > 2000) {
		                  alert("최대 2000자까지 입력가능합니다.")
		                  $(this).val(content.substring(0, 2000));
		                  $('#counter').html("(2000 / 최대 2000자)");
		               }
		            })

				$('#insertBtn').click(

						function() {
							var content = $('#contentArea').val().replace(/(?:\r\n|\r|\n)/g, '<br />');
							var title = $('#title').val();
							var password = $('#password').val();
							var name = $('#name').text();

							//                      var content2 = content.replace("\r\n","<br>")
							//                      alert(content2)
							if (content == "") {
								alert("내용을 입력해주세요")
							} else if (title == "") {
								alert("제목을 입력해주세요")
							} else if (password == "") {
								alert("비밀번호를 입력해주세요")
							} else {
								location.href = 'Tip_insert.do?content='
										+ content + '&title=' + title
										+ '&password=' + password + '&name='
										+ name
							}
						})

			})
</script>

<style>
.wrap {
	margin-top: 100px;
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
			<h3 style="width: 1000px; float:right;">팁게시판 글쓰기</h3>
				<table style="width: 1000px; float:right; margin-bottom: 100px;" class="table table-bordered">
					<tbody>
						<tr>
							<th>작성자:</th>
							<td id="name">${userid }</td>
						</tr>
						<tr>
							<th style="width: 100px">제목:</th>
							<td><input type="text" placeholder="제목을 입력하세요. " id="title"
								class="form-control" /></td>
						</tr>
						<tr>
							<th style="width: 100px">내용:</th>
							<td><textarea id="contentArea" style="height: 400px"
									cols="10" placeholder="내용을 입력하세요. " name="content"
									class="form-control"></textarea> <span style="color: #aaa;"
								id="counter">(0 / 최대 200자)</span></td>

						</tr>
						<tr>
							<td colspan="2">
								<button style="float: right;" button" onclick="location.href='Tip_Main.do${tstring}'">뒤로가기</button>
								<button type="button" id="insertBtn" class="pull-right">글쓰기 &ensp;</button>
							</td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>
		</main>
		<footer id="footer" role="contentinfo">
			<jsp:include page="footer.jsp" />
		</footer>
	</div>
</body>
</html>