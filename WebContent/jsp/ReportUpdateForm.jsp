<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
<script src="https://code.jquery.com/jquery-2.2.4.js"></script>
<link rel="stylesheet" href="../css/community.css">

<script type="text/javascript">
   
	$(document).ready(
			function() {
				var content = $('#contentArea').val();
	        	 $('#counter').html("(" + content.length + " / 최대 2000자)")
				$('#contentArea').keyup(function(e) {
		               var content = $(this).val();
		               $('#counter').html("(" + content.length + " / 최대 2000자)")

		               if (content.length > 2000) {
		                  alert("최대 2000자까지 입력가능합니다.")
		                  $(this).val(content.substring(0, 2000));
		                  $('#counter').html("(2000 / 최대 2000자)");
		               }
		            })

				$('#UpdateBtn').click(
						function() {

							var content = $('#contentArea').val().replace(/(?:\r\n|\r|\n)/g, '<br />');
							var title = $('#title').val();
							var password = $('#password').val();
							var oldPassword = $('#oldPassword').val();
							var name = $('#name').text();
							var num = $('#num').val();
							var readCount = $('#readCount').val();
							var writedate = $('#writedate').val();
							var up = $('#up').val();

							if (content == "") {
								alert("내용을 입력해주세요")
							} else if (title == "") {
								alert("제목을 입력해주세요")
							} else if (password == "") {
								alert("비밀번호를 입력해주세요")
							} else {
								$.ajax({
		                             type : "POST",
		                             url : "HashpwdCheck.do",
		                             data : "pwd=" + password,
		                             dataType : "text",
		                             success : function(data) {
		                                if (data == "true") {

		                                	location.href = 'Report_update.do?num='
		                                        + num + '&password=' + password
		                                        + '&name=' + name + '&title='
		                                        + title + '&content=' + content
		                                        + '&readCount=' + readCount
		                                        + '&writedate=' + writedate
		                                        + '&up=' + up
		                                } else {
		                                   alert("비밀번호가 일치하지 않습니다.")
		                                }
		                             },
		                             error : function() {
		                                alert("실패");
		                             }

		                          })
							}
						})

				$('#AdminUpdateBtn').click(
                  function() {

                     var content = $('#contentArea').val();
                     var title = $('#title').val();
                     var oldPassword = $('#oldPassword').val();
                     var name = $('#name').text();
                     var num = $('#num').val();
                     var readCount = $('#readCount').val();
                     var writedate = $('#writedate').val();
                     var up = $('#up').val();
                     
                     
                     location.href = 'adminReportBoardUpdate.do?num='
                         + num + '&password=' + oldPassword
                         + '&name=' + name + '&title='
                         + title + '&content=' + content
                         + '&readCount=' + readCount
                         + '&writedate=' + writedate
                         + '&up=' + up
                           
                  })

			})

	function getpwd(password) {
		var result;
		$.ajax({
			type : "POST",
			url : "Getpwd.do",
			data : "password=" + password,
			dataType : "text",
			async : false,
			success : function(data) {
				result = data;
			},
			error : function() {
				alert("실패");
			}

		})
		return result;
	}
</script>
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
			<h3 style="width: 1000px; float:right;">신고게시판 글 수정하기</h3>
				<table id="reportupdatetab" class="table table-bordered" style="width: 1000px; float:right; margin-bottom: 100px;">
					<tbody>
						<tr>
							<th style="width: 100px">작성자:</th>
							<td id="name">${reportboard.name  }</td>
						</tr>
						<tr>
							<th>제목:</th>
							<td><input id="title" value="${reportboard.title }"
								type="text" placeholder="제목을 입력하세요." class="form-control">
							</td>
						</tr>
						<tr>
							<th style="width: 100px">내용:</th>
							<td><textarea class="form-control" id="contentArea"
									style="height: 400px; text-align: left;"
									placeholder="내용을 입력하세요">${reportboard.content }</textarea>
									<span style="color: #aaa;" id="counter">(0 / 최대 200자)</span></td>
						</tr>
						 <c:if test="${userid == 'admin' }">
		                     <tr>
		                        <td colspan="2">
		                           <button style="float: right;"
		                              button" onclick="location.href='Report_view.do?num=${reportboard.num}'">뒤로가기
		                           </button>
		                           <button type="button" id="AdminUpdateBtn" class="pull-right">수정하기
		                              &ensp;</button>
		                           <button type="button" onclick="location.href='Report_Main.do'">목록보기</button>
		                        </td>
		                     </tr>
		                  </c:if>
		                  
		                  <c:if test="${userid != 'admin' }">
						<tr>
							<th style="width: 100px">비밀번호:</th>
							<td><input style="width: 100px" id="password" type="text"
								class="form-control"></td>
						</tr>
						<tr>
							<td colspan="2">
								<button style="float: right;"
									button" onclick="location.href='Report_view.do?num=${reportboard.num}'">뒤로가기
								</button>
								<button type="button" id="UpdateBtn" class="pull-right">수정하기
									&ensp;</button>
								<button type="button" onclick="location.href='Report_Main.do'">목록보기</button>
							</td>
						</tr>
						</c:if>
					</tbody>
				</table>


				<input type="hidden" value="${reportboard.num }" id="num"> <input
					type="hidden" value="${reportboard.readCount }" id="readCount">
				<input type="hidden"
					value='<fmt:formatDate value="${reportboard.writedate}" pattern="yyyy-MM-dd" />'
					id="writedate"> <input type="hidden"
					value="${reportboard.up }" id="up"> <input type="hidden"
					value="${reportboard.password }" id="oldPassword">
			</div>
		</div>
		</main>
		<footer id="footer" role="contentinfo">
			<jsp:include page="footer.jsp" />
		</footer>
	</div>
</body>
</html>