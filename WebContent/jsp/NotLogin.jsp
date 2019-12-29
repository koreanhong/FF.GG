<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
<link rel="stylesheet" href="../css/community.css">
</head>
<body>
	<form action="Login.do">
		<table id="loginTable">
			<tr>
				<td width="150px" align="center">
					<input type="text" name="id" placeholder="아이디" class="notloginInput">
				</td>
			</tr>
			<tr style="height: 15px"></tr>
			<tr>
				<td width="150px" align="center">
				<input type="password"name="pwd" placeholder="비밀번호" class="notloginInput">
				</td>
			</tr>
		</table>
		<div id="notLoginDiv">
			<input type="submit" value="로그인">
			<input type="button" value="회원가입"onclick="location.href='JoinForm.do'">
		</div>
	</form>
</body>
</html>