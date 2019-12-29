<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="en">

<head>
	<meta charset="UTF-8">
	<title>Insert title here</title>
	<link rel="stylesheet" type="text/css" href="../css/mainHeader.css">
	<link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.7.0/css/all.css">
	<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
	<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css">
	<link rel="stylesheet" href="//code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css">
	<script src="https://code.jquery.com/jquery-2.2.4.js"></script>
	<script src="https://code.jquery.com/ui/1.12.1/jquery-ui.js"></script>
	<script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js"></script>
	<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js"></script>
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.4/jquery.min.js"></script>
	<script src="https://ajax.googleapis.com/ajax/libs/jqueryui/1.11.4/jquery-ui.min.js"></script>
</head>

<script type="text/javascript">
   $(document).ready(function(){
      $('.btn.btn-secondary').click(function(){
         nickname = $('.form-control').val().trim();
         if(nickname.length == 0){
        	 alert("아이디를 입력해주세요");
         }
         else{
	         sessionStorage.setItem("nickname",nickname);
    	     location.href="UserInfo.do";	 
         }
      });
   });
</script>

<body id="header">
	<div class="page_name_box">
		<img src="../images/파랑색로고.png" style="width: 100px; height: 50px; cursor:pointer;" onclick="location.href='Main.do'">
	</div>
	<div class="buttons" align="center">
		<button type="button" class="btn btn-primary" onclick="location.href='UserInfo.do'">유저 정보</button>
		<button type="button" class="btn btn-primary" onclick="location.href='playerList.do'">선수 분석</button>
		<button type="button" class="btn btn-primary" onclick="location.href='squadMaker.do'">스쿼드메이커</button>
		<button type="button" class="btn btn-primary" onclick="location.href='RankingInfo.do'">랭커 정보</button>
		<button type="button" class="btn btn-primary" onclick="location.href='Community_main.do'">커뮤니티</button>
	</div>
	<div class="input-group" id="user_name_search">
		<input type="text" class="form-control" placeholder="유저명을 검색하세요.">
		<span class="input-group-btn">
			<button class="btn btn-secondary" type="button">찾기</button>
		</span>
	</div>

</body>

</html>