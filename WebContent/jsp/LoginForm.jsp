<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
<link rel="icon" href="data:;base64,iVBORw0KGgo=">
<link rel="stylesheet" href="../css/community.css">
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css">
<script
	src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
<script
	src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js"></script>
<script
	src="https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js"></script>
<script src="https://code.jquery.com/jquery-2.2.4.js"></script>
<script>
$(document).ready(function(){
    $('#login_btn').click(function(){
       var id = $('#id').val();
       var pwd = $('#pwd').val();
       
       if(id == "" || pwd == ""){
          $('#infoSpan').html("공백이 입력되었습니다.")
       }else{
          location.href = "Login.do?id="+id+'&pwd='+pwd
       }
    })
})
</script>

<style>
div#centerwrapper {
	position: relative;
	width: 1000px;
	float: right;
	margin-bottom: 100px;
}

div#centerwrapper h3 {
	margin-left: 150px;
}

.form-group, #btn_group {
    margin-left: 150px;
    margin-right: 30px;
    margin-top: 50px;
    margin-bottom: 50px;
    width: 50%;
}

#input_id, #input_pwd {
	width: 70%;
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
				<h3>로그인 폼</h3>
				<form class="needs-validation" novalidate>
					<div class="form-group">
						<label for="id">아 이 디 :</label>
						<input type="text" class="form-control" id="id" placeholder="Enter id" name="id" required>
						<div class="valid-feedback">잘썼음</div>
						<div class="invalid-feedback">이 부분을 채워주세용</div>
					</div>
					<div class="form-group">
						<label for="pwd">비 밀 번 호 :</label>
						<input type="password" class="form-control" id="pwd" placeholder="Enter password" name="pwd" required>
						<div class="valid-feedback">잘썼음</div>
						<div class="invalid-feedback">이 부분을 채워주세용</div>
						<br>
						<div>
				            <c:if test="${result == 2 }">
				               <span style="color: red" id="infoSpan">등록되지 않은 정보입니다.</span>
				            </c:if>
						</div>
					</div>
					<div id="btn_group">
						<input type="button" class="btn btn-primary" id="login_btn" value="로 그 인">
						<input type="button" class="btn btn-primary" onclick="location.href='JoinForm.do'" value="회 원 가 입">
						<input type="button" class="btn btn-primary" onclick="location.href='IdFindForm.do'"  value="아이디 찾기">
						<input type="button" class="btn btn-primary" onclick="location.href='PwFindForm.do'"  value="비밀번호 찾기">
					</div>
				</form>
			</div>
		</div>
		</main>
		<footer id="footer" role="contentinfo">
			<jsp:include page="footer.jsp" />
		</footer>
	</div>
</body>

</html>