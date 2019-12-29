<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
<link rel="stylesheet" href="../css/community.css">
<style>
#centerwrapper{
	float:right;
}
#chatallwrapper {
	width: 1000px;
	height: 400px;
	border: 1px solid black;
	position: relative;
}

#chatwrapper {
	position: relative;
	width: 70%;
	height: 400px;
	float: left;
	border: 1px solid black;
}

#idwrapper {
	position: relative;
	width: 30%;
	height: 400px;
	float: right;
	border-top: 1px solid black;
	border-bottom: 1px solid black;
	border-right: 1px solid black;
/* 	margin-left: 10px; */
}

#chatView {
	height: 90%;
	overflow-y: scroll;
}

#chatForm {
	height: 10%;
	border-top: 1px solid black;
}

#msg {
	width: 80%;
	height: 32px;
	border-radius: 8px;
	font-size: 17px;
}

#send ,#out {
	width: 16%;
	height: 34px;
	border-radius: 50px;
	background: black;
	color: white;
}
.useriddiv, .onechatdiv {
	width: 50%;
	float: left;
	font-size: 20px;
	text-align: center;
	border-bottom: 1px solid black;
}
 .onechatdiv{ 
 	cursor: pointer;
 } 
#out {
	display: none;
}
.msgLine {
	margin: 15px;
}

.msgBox {
	border: 1px solid black;
	background: skyblue;
	padding: 2px 5px;
	border-radius: 10px;
	font-size: 17px;
}

.idlist {
	font-size: 17px;
}
</style>
<script src="http://192.168.6.111:82/socket.io/socket.io.js"></script>
<script src="https://code.jquery.com/jquery-2.2.4.js"
	integrity="sha256-iT6Q9iMJYuQiMWNd9lDyBUStIq/8PuOW33aOqmvFpqI="
	crossorigin="anonymous"></script>

<script type="text/javascript">
	$(document).ready(function() {
		var socket = io("http://192.168.6.111:82");
		var check = false; //1:1채팅인지, 전체 채팅인지 여부 체크 -> true면 1:1, false면 전체
		var roomname = ""; //내가 1:1 채팅 들어갈 roomname
		
		var id = '${userid}'; //내 id
		socket.emit('IDSEND', id); // 서버한테 IDSEND라는 이벤트 보냄, ID보냄

		var chatView = document.getElementById('chatView');
		var chatForm = document.getElementById('chatForm');

		chatForm.addEventListener('submit', function() { //전송 누르는 이벤트
			var msg = $('#msg');

			if (msg.val() == '') {
				return;

			} else {
				var message = replacemsg(msg.val());
				console.log("변경전 : "+msg.val()+"\n변경후 : "+message);
				if(check){ //1:1채팅의 경우
					socket.emit('SEND1:1', id + " : " + message+","+roomname); //서버쪽에 SEND라는 이벤트 보냄 , ID + msg를 보냄
				}
				else{//전체 채팅의 경우		
					socket.emit('SEND', id + " : " + message); //서버쪽에 SEND라는 이벤트 보냄 , ID + msg를 보냄				
				}

				var msgLine = $('<div class="msgLine">');
				var msgBox = $('<div class="msgBox">');

				msgBox.append(id + " : " + message);
				msgBox.css('display', 'inline-block');

				msgLine.append(msgBox);

				$('#chatView').append(msgLine);

				msg.val('');
				chatView.scrollTop = chatView.scrollHeight;
			}
		});
		
		//전체채팅 메시지 보내는 이벤트
		socket.on('SEND', function(msg) { //서버로부터 SEND라는 이벤트 받음 , msg를 받음
			var msgLine = $('<div class="msgLine">');
			var msgBox = $('<div class="msgBox">');

			msgBox.append(msg);
			msgBox.css('display', 'inline-block');

			msgLine.append(msgBox);
			$('#chatView').append(msgLine);

			chatView.scrollTop = chatView.scrollHeight;
		});
		
		//1:1메시지 보내는 이벤트
		socket.on('SEND1:1', function(msg) { //서버로부터 SEND1:1라는 이벤트 받음 , msg를 받음
			var msgLine = $('<div class="msgLine">');
			var msgBox = $('<div class="msgBox">');

			msgBox.append(msg);
			msgBox.css('display', 'inline-block');

			msgLine.append(msgBox);
			$('#chatView').append(msgLine);

			chatView.scrollTop = chatView.scrollHeight;
		});
		
		//채팅참여자 목록 받아오는 이벤트
		socket.on("list", function(idList) { //서버로부터 list라는 이벤트 받음, idList를 받음
			$('#idwrapper *').remove();
			for (var i = 0; i < idList.length; i++) {
				var msg = $("<div class=userlistdiv id="+idList[i]+"list></div>");
				var msg2 = $("<div class=useriddiv></div>");
				var msg3 = $("<div class=onechatdiv id="+idList[i]+">1:1채팅</div>");
				msg2.append(idList[i]);
				$('#idwrapper').append(msg);
				$('#'+idList[i]+'list').append(msg2).append(msg3);
			}
		});
		
		//1:1채팅의 여부 이벤트
		socket.on("1:1result", function(msg){
			var result = msg.split(",");
			var idset = result[1].split(" ");
			var reqid = idset[0];
			var respid = idset[1];
			if(result[0] == "true"){
				roomname = result[2]; //roomname 저장
				alert("1:1채팅이 시작됩니다.");
				check = true;
				$('#chatView *').remove(); //채팅창 전부 지워줌
				$('#idwrapper *').remove();//아이디 목록 전부 지워줌
				//아이디 목록 만들기
				var msg = $("<div class=userlistdiv id="+reqid+respid+"></div>");
				var msg2 = $("<div class=useriddiv>"+reqid+"</div>");
				var msg3 = $("<div class=useriddiv>"+respid+"</div>");
				$('#idwrapper').append(msg);
				$('#'+reqid+respid).append(msg2).append(msg3);
				
				$('#msg').css("width","65%");
				$('#out').show(); //나가기 버튼 보여주기
			}
			else{
				alert("1:1채팅이 거절되었습니다.");
			}
		});

		//1:1요청 받는 이벤트
		socket.on("1:1check", function(msg) { //1:1요청 메시지 받는 이벤트
				var msgarr = msg.split(",");
				var idset = msgarr[0]; //요청id,요청받은id set
				var result = confirm(msgarr[1]);
				if(result){ //수락
					socket.emit('1:1confirm',idset+",true"); //true 를 보냄
				}
				else{//거절
					socket.emit('1:1confirm',idset+",false"); //false 를 보냄
				}
		});
		
		$(document).on('click', '.onechatdiv', function(event) {
			var respid = $(this).attr("id"); //해당 아이디
			if(respid != id){ //자기자신이 아닌 경우에
				var result = confirm(respid + "님에게 1:1 대화를 거시겠습니까?");
				if(result){
					socket.emit('1:1want', respid);// 해당 아이디 1:1 요청 이벤트를 서버로 보냄				
				}
			}
			else{
				alert("자기 자신과는 1:1대화를 할 수 없습니다.");
			}
		});
		
		
		//1:1채팅에서 나가기
		$(document).on('click', '#out', function() { //1:1채팅에서 나가기 클릭 할 시 
			var result = confirm("1:1채팅을 종료하시겠습니까?");
			if(result){
				check = false;
				alert("1:1채팅방이 종료되었습니다.");
				socket.emit('1:1finish',roomname); //1:1finish 서버로 보냄
				
				$('#chatView *').remove(); //채팅창 전부 지워줌
				$('#msg').css("width","80%");
				$('#out').hide(); //나가기 버튼 감추기
			}
		});
		
		//1:1채팅 종료 이벤트
		socket.on('1:1finish',function(msg){ //1:1finish 서버로부터 받음
			alert(msg);
			check = false;
			$('#chatView *').remove(); //채팅창 전부 지워줌
			$('#msg').css("width","80%");
			$('#out').hide(); //나가기 버튼 감추기
		})	
	});
	
	function replacemsg(msg){ //욕설 치환
		var message = msg;
		message = message.replace(/현기/g,"**");
		message = message.replace(/시발/g,"**");
		message = message.replace(/개새/g,"**");
		message = message.replace(/병신/g,"**");
		message = message.replace(/닥쳐/g,"**");
		message = message.replace(/새끼/g,"**");
		return message;
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
					<div class="CategoryDiv" onclick="location.href='Tip_Main.do'">-
						신고 게시판</div>
					<br>
					<div class="CategoryDiv" onclick="location.href='Chat.do'">-
						나랑 할사람</div>
				</div>
			</div>
			<div id="centerwrapper">
				<div id="board_name">
					<h3>나랑 겜할랭</h3>
				</div>
				<div id="chatallwrapper">
					<div id="chatwrapper">
						<div id="chatView"></div>
						<form id="chatForm" onsubmit="return false">
							<input type="text" id="msg"> 
							<input type="submit" id="send" value="전송">
							<input type=button id="out" value="나가기">
						</form>
					</div>
					<div id="idwrapper"></div>
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