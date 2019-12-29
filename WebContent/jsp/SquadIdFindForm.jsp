<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>

<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>아이디 찾기</title>
<link rel="icon" href="data:;base64,iVBORw0KGgo=">
<link rel="stylesheet" href="../css/community.css">
<link rel="stylesheet"
	href="https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css">
<script
	src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
<script
	src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js"></script>
<script
	src="https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js"></script>
<script src="https://code.jquery.com/jquery-2.2.4.js"></script>

<style type="text/css">
div#centerwrapper {
	position: relative;
	width: 1000px;
	float: right;
	margin-bottom: 100px;
}

div#centerwrapper h3, div#centerwrapper h6 {
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

h5#resultview {
	font-weight: 700;
	color: deeppink;
	width: 500px;
	font-size: 24px;
	margin-top: 50px;
}
#email, #userauthnum{
	width:200px;
}
</style>
<script type="text/javascript">
	$(document).ready(function() {
			var check = /^[A-Za-z0-9_\.\-]+@[A-Za-z0-9\-]+\.[A-Za-z0-9\-]+/; //이메일 형식 체크
			var email = $('#email'); //입력 이메일 text
			var getauth = $('#getauth'); //인증 번호 받기 버튼
			var auth = $('#auth');//인증하기 버튼
			var userauthnum = $('#userauthnum'); //인증 번호 text
			var authnum;

			$('#getauth').click(function() { //인증번호 받기
					if (check.test(email.val())) { //이메일 형식 맞을 시
						$.ajax({
							type : "POST",
						    url : "Getauth.do",
							data : "email=" + email.val(),
							dataType : "text",
							success : function(data) {
									alert("인증번호 발송 완료");
									$('#authcheck').show();
									authnum = data; //받아온 인증 번호 저장
							},
							error : function(xhrReq, status,error) {
									alert(xhrReq + " ," + status + " ," + error);
							}
						})
					} else { //이메일 형식 아닐 시 
						$('#emailok').html("잘못된 이메일 형식입니다.");
						$('#email').focus();
					}
			});

			$('#auth').click(function() { //인증 버튼
					$.ajax({
						type : "POST",
						url : "IdFind.do",
						data : "email="+ email.val()+ "&userauthnum="
								+ userauthnum.val()+ "&authnum="+ authnum,
						dataType : "text",
						success : function(data) {
								if (data == "false") {
									$('#resultview').text("인증번호가 일치하지 않습니다.");
								} else {
									$('#resultview').html(data);
								}
						},
						error : function(xhrReq, status, error) {
								alert(xhrReq + " ,"+ status+ " ,"+ error);
						}
				 })
			});
	});
</script>
</head>

<body class="default">
	<h3>아이디 찾기</h3>
	<h6>이메일을 통해 아이디를 찾을 수 있습니다.</h6>
		<label for="eamil">이 메 일 :</label>
		<div class="input-group-append">
			<input type="text" class="form-control" id="email"
				placeholder="Enter email" name="email" required> <input
				type="button" class="btn btn-primary" value="발송" id="getauth"
				name="getauth" required>
		</div>

		<span id="emailok"></span>

		<div id="authcheck">
			<div class="input-group mb-3">
				<input type="text" class="form-control" id="userauthnum"
					name="userauthnum" placeholder="인증번호">
				<div class="input-group-append">
					<input type="button" class="btn btn-primary" value="인증" id="auth"
						name="auth">
				</div>
				<div>
					<h5 id="resultview"></h5>
				</div>
			</div>
		</div>

	<div id="btn_group">
		<input type="button" class="btn btn-primary" value="비밀번호 찾기"
			onclick="location.href='SquadPwFindForm.do'">
		<input type="button" class="btn btn-primary" value="로그인으로"
			onclick="location.href='SquadLoginForm.do'"
			style="margin-right: 5px;">
	</div>
</body>

</html>