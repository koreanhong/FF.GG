<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="en">

<head>
<meta charset="UTF-8">
<title>선수 상세 정보</title>
<link rel="shortcut icon" href="">

<link rel="stylesheet"
	href="//code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css">
<link href="https://fonts.googleapis.com/css?family=Noto+Sans+KR&display=swap&subset=korean" rel="stylesheet">
	<link rel="stylesheet" type="text/css"
	href="../css/playerDetailView.css">
<script src="https://code.jquery.com/jquery-1.12.4.js"></script>
<script src="https://code.jquery.com/ui/1.12.1/jquery-ui.js"></script>
<script
	src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.4/jquery.min.js"></script>
<script
	src="https://ajax.googleapis.com/ajax/libs/jqueryui/1.11.4/jquery-ui.min.js"></script>

<link rel="stylesheet" type="text/css"
	href="../css/playerList.css">
<style type="text/css">


</style>



</head>

<script type="text/javascript">
  var seting = function(requestParams, requestComments, commentsId){
  $(function(){  
	var career = $("#career");
	var teamColor = $("#teamColor");
	$.each(requestParams.affiliation, function(index, item){
		career.append($("<div>").attr("class", "year_th").text(item.affiliation_year))
		career.append($("<div>").attr("class", "club_th").text(item.affiliation_team))
	})
	if (typeof requestParams.team_color != "undefined") {
		$.each(requestParams.team_color, function(index, item){
			teamColor.append($("<div>").text(item))
		})
		
	}
  })
  
	var modifyCheck = false;
	var modifyTag = null;
	var insertComments = function (item) {
		var commentsBox = $(".comments")
		var commentsList = $("#commentsList");
		var textarea = $('#inputComments textarea')
		var selectScore = $('#selectScore select')
		var commentsTag = $("<div>").attr("id", "comments");
		var userId = $("<div>").attr("id","userId").text(item.user_id);
		if(commentsId == item.user_id){
			commentsBox.css("display", "none");
		}
		
		var comments = $("<div>").attr("id", "userComments").text(item.comments);
		var commentsFunction = $("<div>").attr("id","commentsFunction");
		var inputDate = $("<div>").attr("id","inputDate").text(item.input_date);
		var commentsDelete = $("<div>").attr("id","commentsDelete");
		var deleteComments = $("<a href='#'>").text("삭제");
		
		deleteComments.click(function () {
			if(commentsId == item.user_id){
				$.ajax({
					type : "post",
					url : "deleteComments.do",
					data : {"checkId" : item.user_id},
					dataType : "text",
					success : function(data){
						if(data == ""){
							alert("회원 본인 댓글만 삭제할 수 있습니다.");
						}else{
							commentsBox.css("display", "flex");
							commentsTag.remove();
						}
					},
					error:function(xhr, status, error){
						alert(xhr, status, error);
					}
				})
			}else{
				alert("회원 본인 댓글만 삭제할 수 있습니다.");
			}
		})
		
		var commentsmodify = $("<div>").attr("id","commentsModify");
		var modifyComments = $("<a href='#'>").text("수정");
		modifyComments.click(function () {
			if(commentsId==item.user_id){
				modifyTag = commentsTag;
				commentsTag.css("display", "none");
				commentsBox.css("display", "flex");
				modifyCheck = true;
				commentsBox.focus();
				commentsBox.blur();
				$('#inputComments textarea').val(item.comments)
				$('#selectScore select').val(item.score).prop("selected", true);
				
			}else{
				alert("본인 댓글만 수정할 수 있습니다.")
			}
		})
		
		var score = $("<div>").attr("id","score").text(item.score + "점");
		commentsDelete.append(deleteComments);
		commentsmodify.append(modifyComments);
		commentsFunction.append(inputDate, commentsDelete, commentsmodify, score);
		commentsTag.append(userId, comments, commentsFunction);
		commentsList.append(commentsTag);
	}
	
	$(function () {
		$.each(requestComments, function(index) {
			insertComments(requestComments[index]);
		})
	})

  $(function () {
	  $("#insertButton").click(function () {
		if(commentsId != ""){
			var urlString;
			var comments = $('#inputComments textarea').val();
			var score = parseInt($('#selectScore select').val());
			var jsonData = {
				"id" : requestParams.id,
				"comments" : comments,
				"score" : score
			};
			if(modifyTag != null){
				urlString = "modifyComments.do";
			}else{
				urlString = "insertPlayerComments.do";
			}
			$.ajax({
			 	type: "post",
			 	url : urlString,
			 	data: JSON.stringify(jsonData),
			 	dataType : "text",
			 	contentType: "application/json",
			 	success : function(data){
			 		if(data == ''){
			 			alert("로그인 후 이용가능합니다.");
			 		}else{
			 			if(modifyTag != null){
			 				modifyTag.children("#score").text(score + " 점");
			 				modifyTag.children("#comments").text(comments);
			 				modifyTag.css("display", "block");
			 				modifyTag = null;
			 			}else{
// 			 				commentsId = '${userId}';
				 			jsonData.user_id = commentsId;
				 			jsonData.score = score;
				 			jsonData.input_date = data;
			 				insertComments(jsonData);
			 			}
			 		}
			 	},
			 	error:function(xhr, status, error){
			 		alert(xhr, status, error);
			 	}
			})
			
		}else{
			alert("로그인 후 가능한 서비스입니다.");
		}
	})
})
}
  
var requestParams = JSON.parse('${rs}');
var requestComments = JSON.parse('${comments}');
var commentsId = '${userId}';
  $(document).ready(function () {
	  seting(requestParams, requestComments, commentsId);
	})

</script>

<body class="default">
	<!-- header 부분 -->
	<div id="wrapper" class="sub">
		<header id="header" class="after_1102">
			<jsp:include page="header.jsp" />
		</header>
		<main id="middle" class="sub">
		<div id="playerAllView">
			<div class="playerView">
				<script type="text/javascript">
				$(function(){
					$.ajax({
						type: "post",
						url : "playerView.do",
						data: JSON.stringify(requestParams),
     					contentType: "application/json",
						success : function(data){
							$(".playerView").append(data);
						},
						error:function(xhr, status, error){
							alert(xhr, status, error);
						}				
					})

				})
					</script>
			</div>
			<div class="career_area">
				<div id="career">
					<div class="car_th">클럽 경력</div>
					<div class="year_th">연도</div>
					<div class="club_th">클럽</div>
				</div>
				<div id="teamColor">
					<div class="car_th">팀컬러</div>					
				</div>
			</div>
			
			<div class="comments">
					<div id="inputComments">
						<textarea></textarea>
					</div>
				<div id="tryInsert">
						<div id="selectScore">점수
							<select>
								<option value=0>0점</option>
								<option value=1>1점</option>
								<option value=2>2점</option>
								<option value=3>3점</option>
								<option value=4>4점</option>
								<option value=5>5점</option>
								<option value=6>6점</option>
								<option value=7>7점</option>
								<option value=8>8점</option>
								<option value=9>9점</option>
								<option value=10>10점</option>
							</select>
						</div>
					<button id="insertButton">평가 남기기</button>
				</div>
			</div>
				<div id="commentsList">
<!-- 					<div id="comments"> -->
<!-- 						<div id="userId">ㅇ</div> -->
<!-- 						<div id="userComment"></div> -->
<!-- 						<div id="commentFunction"> -->
<!-- 							<div id="inputDate">2017-06-06</div> -->
<!-- 							<div id="commentDelete"> -->
<!-- 								<a href="#">삭제</a> -->
<!-- 							</div> -->
<!-- 							<div id="commentModify"> -->
<!-- 								<a href="#">수정</a> -->
<!-- 							</div> -->
<!-- 							<div id="score">점수 : 0점</div> -->
<!-- 						</div> -->
<!-- 					</div> -->
				</div>

		</div>
		</main>
		<footer id="footer" role="contentinfo">
			<jsp:include page="footer.jsp" />
		</footer>
	</div>

</body>

</html>