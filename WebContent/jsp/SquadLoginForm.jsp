d<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
<link rel="icon" href="data:;base64,iVBORw0KGgo=">
<link rel="stylesheet" href="../css/community.css">
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css">
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
<script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js"></script>

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

.form-group, #btn_group{
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

<script type="text/javascript">
	//submit
	function login() {
		var check = opener.parent.sessionStorage.getItem("ch");
		var id = $('#userId').val();
		var pwd = $('#pwd').val();
		if(id == "" || pwd == ""){	
			alert("아이디와 비밀번호를 입력해주세요");
		}else{
			$.ajax({
				url : "SquadLogin.do",
				type : "post",
				data : "id=" + id + "&pwd=" + pwd + "&check=" + check,
				dataType : "text",
				success : function(data) {
					if(data == "0"){
						$("#msg").css("color", "red").text("아이디 혹은 비밀번를 확인하세요.");
					}else if(data == "1"){
						window.close();
					}else {
						var rs = JSON.parse(data);
						if(rs.length != 0){
							opener.parent.madeSquadSession(rs);
						}else{
							opener.parent.alert("저장되있는 스쿼드가 없습니다.")
						}
						window.close();
					}
				},
				error : function () {
					alert("에러남!")
				}
			});
		}
	}
</script>
</head>

<body class="default">
	<div id ="form" class="needs-validation">
		<div class="form-group">
			<label for="userId">아 이 디 :</label> 
			<input type="text" class="form-control" id="userId" placeholder="Enter id">
			<div class="valid-feedback"></div>
			<div class="invalid-feedback"></div>
		</div>
		<div class="form-group">
			<label for="pwd">비 밀 번 호 :</label> 
			<input type="password" class="form-control" id="pwd" placeholder="Enter password">
			<div class="valid-feedback"></div>
			<div class="invalid-feedback"></div>
			<span id="msg"></span>
		</div>
		<div id="btn_group">
			<input type="button" class="btn btn-primary" value="로 그 인" onclick="login();"> 
			<input type="button" class="btn btn-primary" onclick="location.href='SquadJoinForm.do'" value="회 원 가 입"> 
			<input type="button" class="btn btn-primary" onclick="location.href='SquadIdFindForm.do'" value="아이디 찾기"> 
			<input type="button" class="btn btn-primary" onclick="location.href='SquadPwFindForm.do'" value="비밀번호 찾기">
		</div>
	</div>
</body>

</html>