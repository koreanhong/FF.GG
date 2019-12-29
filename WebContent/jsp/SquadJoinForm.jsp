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

<link
	href="https://cdnjs.cloudflare.com/ajax/libs/materialize/0.100.2/css/materialize.min.css"
	rel="stylesheet" type="text/css" />
<link href="https://fonts.googleapis.com/icon?family=Material+Icons"
	rel="stylesheet">
<script src="https://code.jquery.com/jquery-3.2.1.min.js"></script>
<script
	src="https://cdnjs.cloudflare.com/ajax/libs/materialize/0.100.2/js/materialize.min.js"></script>
<script
	src="https://cdn.jsdelivr.net/npm/jquery-validation@1.17.0/dist/jquery.validate.min.js"></script>

<style>
input.form-control {
	display: block !important;
	width: 100% !important;
	height: calc(1.5em + .75rem + 2px) !important;
	padding: .375rem .75rem !important;
	font-size: 1rem !important;
	font-weight: 400 !important;
	line-height: 1.5 !important;
	color: #495057 !important;
	background-color: #fff !important;
	background-clip: padding-box !important;
	border: 1px solid #ced4da !important;
	border-radius: .25rem !important;
	transition: border-color .15s ease-in-out, box-shadow .15s ease-in-out
		!important;
	position: relative !important;
	-ms-flex: 1 1 auto !important;
	flex: 1 1 auto !important;
	width: 1% !important;
	margin-bottom: 0 !important;
	border-top-right-radius: 0 !important;
	border-bottom-right-radius: 0 !important;
	-webkit-box-sizing: border-box !important;
}

.login-text {
	margin-top: -6px;
	margin-left: -6px
}

.pointer-events {
	pointer-events: auto
}

.input-field>.material-icons {
	padding-top: 10px;
}

/* 여기서부터 새로 함 */
.login-form {
	width: 500px;
	margin: auto;
}

div#centerwrapper {
	margin-top: 100px;
}

.row .col.s12 {
	width: 500px;
}

.input-field.col.s12.center h4 {
	font-size: 40px;
	font-weight: 600;
}
</style>
<script type="text/javascript">
	$(document).ready(function() {
		var check = /^[A-Za-z0-9_\.\-]+@[A-Za-z0-9\-]+\.[A-Za-z0-9\-]+/; //이메일 형식 체크
		var idcheck = /^(?=.*[a-zA-Z])(?=.*[0-9])[a-zA-Z0-9]{6,}$/; // 영문,숫자포함 6글자 이상
		var pwdcheck = /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,}$/; // 비밀번호 조건문 : 영문,숫자,특문포함, 6글자 이상
		var id = $('#id');
		var pwd = $('#pwd');
		var pwd_check = $('#pwd_check');
		var email = $('#email');
		var name = $('#name');
		var idCheck = false;
		var pwdCheck = false;
		var emailCheck = false;

		$('#id').blur(function() { //아이디 중복 확인용
			$.ajax({
				type : "POST",
				url : "Idcheck.do",
				data : "id=" + id.val(),
				dataType : "text",
				success : function(data) {
					if (data == "true") {
						if (idcheck.test(id.val())) {
							$('#idok').html("아이디 사용가능");
							idCheck = true;
						} else {
							$('#idok').html("영문,숫자포함 6자리 이상 입력하세요");
						}
					} else if (id.val() == "") {
						$('#idok').html("");
					} else {
						$('#idok').html("아이디 중복");
						idCheck = false;
					}
				},
				error : function(xhrReq, status,error) {
					console.log(xhrReq+ " ," + status+ " ,"  + error);
					}

			});
		});

		$('#pwd_check').blur(function() { //비번 확인용
			$.ajax({
				type : "POST",
				url : "Pwdcheck.do",
				data : "pwd="+ pwd.val()+ '&pwd_check='+ pwd_check.val(),
				dataType : "text",
				success : function(data) {
					if (pwd.val() != ""&& data == "true") {
						if (pwdcheck.test(pwd.val())) {
							$('#pwdok').html("비밀번호 일치");
							pwdCheck = true;
						} else {
							$('#pwdok').html("영문,숫자,특문포함, 6글자 이상 입력하세요");
						}
					} else if (pwd.val() == ""|| pwd_check.val() == "") {
						$('#pwdok').html("");
					} else {
						$('#pwdok').html("비밀번호 불일치");
						pwdCheck = false;
					}
				},
				error : function(xhrReq, status,error) {
					console.log(xhrReq+ " ,"+ status+ " ,"+ error);
				}
			})
		});

		$('#email').blur(function() { //이메일 확인용
			$.ajax({
				type : "POST",
				url : "Emailcheck.do",
				data : "email=" + email.val(),
				dataType : "text",
				success : function(data) {
					if (data == "true") {
						if (check.test(email.val())) { //이메일 형식 맞을 시
							$('#emailok').html("이메일 사용가능");
							emailCheck = true;
						} else if (email.val() == '') {
							$('#emailok').html("");
						} else { //이메일 형식 아닐 시 
							$('#emailok').html("잘못된 이메일 형식");
							emailCheck = false;
						}
					} else {
						$('#emailok').html("이메일 중복");
						emailCheck = false;
					}
				},
				error : function(xhrReq, status,error) {
					alert(xhrReq + " ,"+ status+ " ,"+ error);
				}
			})
		});

		$('#joinBtn').click(function() {
			if (id.val() == "" || pwd.val() == ""
				|| pwd_check.val() == ""|| email.val() == ""
				|| name.val() == "") {
				alert("공백을 확인해 주세요")
			} else if (idCheck == false) {
				alert("아이디 형식 또는 중복여부 확인해주세요.")
			} else if (pwdCheck == false) {
				alert("패스워드 형식 또는 중복여부  확인해주세요.")
			} else if (emailCheck == false) {
				alert("이메일 형식이 잘못되었습니다 .")
			} else if ($('#name').val() == null) {
				alert("이름을 입력해주세요")
			} else {
				id = $('#id').val();
				pwd = $('#pwd').val();
				pwd_check = $('#pwd_check').val();
				email = $('#email').val();
				name = $('#name').val();
				$.ajax({
					url : "Join.do",
					data : '?name=' + name+ '&id=' + id + '&pwd=' + pwd
						+ '&pwd_check=' + pwd_check+ '&email=' + email,
					dataType : "text",
					success : function(data) {
						alert("회원가입이 완료되었습니다.");
						location.href='SquadLoginForm.do';
					},
					error : function(xhrReq, status,error) {
						alert(xhrReq + " ,"+ status+ " ,"+ error);
					}
					
				})
				}
			})
		});
</script>
</head>

<body class="default">
				<!-- 요기 넣으면 됌 -->
	<div id="login-page" class="row">
		<div class="col s12 z-depth-4 card-panel">
			<div class="login-form">
				<div class="row">
					<div class="input-field col s12 center">
						<h4>회원가입</h4>
						<p class="center">가입해바염!</p>
					</div>
				</div>

				<div class="row margin">
					<div class="input-field col s12">
						<i class="mdi-social-person-outline prefix"></i> <i
							class="material-icons prefix">account_circle</i> <input id="name"
							name="name" type="text" /> <label for="name">이름</label>
					</div>
				</div>

				<div class="row margin">
					<div class="input-field col s12">
						<i class="mdi-social-person-outline prefix"></i> <i
							class="material-icons prefix">account_circle</i> <input id="id"
							name="id" type="text" /> <label for="id">ID</label><span
							id="idok"></span>
					</div>
				</div>

				<div class="row margin">
					<div class="input-field col s12">
						<i class="mdi-social-person-outline prefix"></i> <i
							class="material-icons prefix">email</i> <input id="email"
							name="email" type="text" style="cursor: auto;" /> <label
							for="email">example@gmail.com</label><span id="emailok"></span>
					</div>
				</div>

				<div class="row margin">
					<div class="input-field col s12">
						<i class="mdi-action-lock-outline prefix"></i> <i
							class="material-icons prefix">vpn_key</i> <input id="pwd"
							name="pwd" type="password" /> <label for="pwd">비밀번호</label>
					</div>
				</div>

				<div class="row margin">
					<div class="input-field col s12">
						<i class="mdi-action-lock-outline prefix"></i> <i
							class="material-icons prefix">vpn_key</i> <input id="pwd_check"
							name="pwd_check" type="password" /> <label for="pwd_check">비밀번호
							확인</label><span id="pwdok"></span>
					</div>
				</div>

				<div class="row">
					<div class="input-field col s12">
						<button class="btn waves-effect waves-light col s12" id="joinBtn">가입하기</button>
					</div>

					<div class="input-field col s12">
						<button type="button" class="btn waves-effect waves-light col s12"
							onclick="location.href='SquadLoginForm.do'">뒤로가기</button>
					</div>

					<div class="input-field col s12">
						<p class="margin center medium-small sign-up">
							이미 계정 있음? <a href="Login.do">로그인</a>
						</p>
					</div>
				</div>
				<div></div>
			</div>
		</div>
	</div>
</body>

</html>