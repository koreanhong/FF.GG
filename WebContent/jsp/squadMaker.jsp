<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
<link rel="icon" href="data:;base64,iVBORw0KGgo=">
<link rel="stylesheet"
	href="//code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css">
<script src="https://code.jquery.com/jquery-2.2.4.js"
	integrity="sha256-iT6Q9iMJYuQiMWNd9lDyBUStIq/8PuOW33aOqmvFpqI="
	crossorigin="anonymous">
		</script>
<script
	src="https://ajax.googleapis.com/ajax/libs/jqueryui/1.11.4/jquery-ui.min.js"></script>
<link href="https://fonts.googleapis.com/css?family=Noto+Sans+KR&display=swap&subset=korean" rel="stylesheet">
<link rel="stylesheet" type="text/css" href="../css/squadMaker/squadMakerStorage.css">
<link rel="stylesheet" type="text/css" href="../css/squadMaker/squadMakerInfo.css">
<link rel="stylesheet" type="text/css" href="../css/squadMaker/squadForm.css">
<link rel="stylesheet" type="text/css" href="../css/searchForm.css">
<link rel="stylesheet" type="text/css" href="../css/squadMaker/searchForm.css">
<link rel="stylesheet" type="text/css" href="../css/squadMaker/squadDiv.css">
<script type="text/javascript" src="../js/squadMaker/selectPosition.js"></script>
<script type="text/javascript" src="../js/squadMaker/formationChange.js"></script>
<script type="text/javascript" src="../js/squadMaker/squardMakerTrySearch.js"></script>
<script type="text/javascript" src="../js/playerSearch/searchForm.js"></script>
<script type="text/javascript" src="../js/squadMaker/searchClick.js"></script>
<script type="text/javascript" src="../js/squadMaker/squadDivFunction.js"></script>
<script type="text/javascript" src="../js/squadMaker/dragAndDrop.js"></script>
<style type="text/css">
#middle{
	font-family: 'Noto Sans KR', sans-serif;
}
#paySide_td{
	font-size: 25px;
}
#peopleNumber_td{
	font-size: 25px;
}
#madeSquads{
	position : absolute;
 	left : 5%; 
 	
 	top : 76%; 
	width: 90%;
	border : 1px solid black;
	background-color : #FAFAFA;
	overflow: scroll;
	overflow-x: hidden;
	max-height: 300px;
}
#user_squad{
	display: flex;
 	justify-content: space-between;
	width: 95%;
	height: 35px;
	margin:0 auto;
}

#user_squad div{
	display : block;
	text-align : left;
	width: 65%;
	margin-top: 12px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space:nowrap;
   
}

#user_squad button{
	width: 13% auto;
}
</style>

</head>


<script type="text/javascript">
//스쿼드 불러오기 구현
var madeSquadSession = function (data) {
	showUserSquad(data);
}

var loginForm;

//해당 ajax는 리턴값을 서버에서 문자열 혹은 json을 리턴받음, 그래서 데이터타입을 text로 하고 해당 함수에서 파스하는 구조
var showPopup = function() { 
		$.ajax({
			url : "showUserSquad.do",
			type : "get",
			dataType : "text",
			success : function(data) {
				if(data == ""){
					sessionStorage.setItem("ch", "2");
					var url = "SquadLoginForm.do";
					window.open(url, name,'scrollbars=no,width=600,height=850,status=no,resizable=no');
				}else{
					var rs = JSON.parse(data);
					if(rs.length != 0){
						showUserSquad(rs);
					}else{
						alert("저장되있는 스쿼드가 없습니다.");
					}
				}
			},
			error : function () {
				alert("에러남")
			}
		});
		
}


var showUserSquad = function (data) {
	// 	name();
	//받아 왔다면 테이블을 깔아줄꺼임
	var madeSquads = $("<div>").attr({"id" : "madeSquads"});
	$.each(data, function (index, sq) {
		//깔아주고!!
		var squadTh = $("<div>").attr("id", "user_squad");
		var squadName = $("<div>").text(sq.squad_name);
		var selectButton = $("<button>").css("width", "18%").text("불러오기");
		var deleteButton = $("<button>").css("width", "13%").text("삭제");
		squadTh.append(squadName, selectButton, deleteButton);
		//기능 만들어 주고!!
		selectButton.click(function () {
			
			//체크포메이션이 돔에서 생성됐기 때문에 돔에서 찾아주고 포메이션 바까줄꺼임
			var formation = sq.squad_formation;
			
			$(function() {
				this.checkFormation = "";
			});
			
			//선수배열 초기화
			players_JSON = [{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{}]
			
			var back = formation.substring(0,1)
			var selectBack = $("#selectBack")
			if(formation == "==============="){
				selectBack.val("포지션을 선택하세요.").prop("selected", true);
			}else if(back == "3"){
				selectBack.val("3Back").prop("selected", true);
			}else if(back == "4"){
				selectBack.val("4Back").prop("selected", true);
			}else if(back == "5"){
				selectBack.val("5Back").prop("selected", true);
			}
			
			$(function () {
				$('#selectBack').click();
				$("#selectPosition").val(formation).prop("selected", true);
				$("#selectPosition").click();
			});
			
			//배열에 넣기 시작
			var squad_info = sq.squad_info;
			var squad_infoSize = squad_info.length;
			
			var sqSpan = $("#squadDiv span");
			
			sqSpan.children(" .playerKeyPlusButton").
			attr("src", "images/playerPlus.png").css(
					{"left" : "10px", "top" : "10px"});
			sqSpan.children(".keyPlayer_name").text("");
			sqSpan.children(" #player_seasonImg").remove();
			sqSpan.children(" #player_position").remove();
			sqSpan.children(" #player_value").remove();
			sqSpan.children(" #player_enhance").remove();
			
			sqSpan.each(function(index) {
				if(squad_infoSize >= 0){
					var me = $(this);
					$.each(squad_info, function (i, item) {
						if(me.attr("id") == item.selectPositionID){
							players_JSON[index] = item;
							squad_infoSize--;
						}
					});
				}
			});
			setPlayers();
			setPeopleNumber();
			setFormationValue();
			
		});
		
		deleteButton.click(function () {
			$.ajax({
				url : "deleteSquad.do",
				type : "post",
				data : "userId=" + sq.id + "&squadName=" + sq.squad_name,
				dataType : "text",
				success : function(data) {
					if(data == "0"){
						alert("삭제가 실패하였습니다. 관리자에게 문의하세요.");
					}else{
						squadTh.remove();
						data.splice(sq, 1);
					}
				}
			});
		});
		
		madeSquads.append(squadTh);
	})
	
	$(".callingUp_div").append(madeSquads);
	
}
	var sqOpend = function () {
		if(this.sqOpendCk){
			return this.sqOpendCk = false;
		}else{
			return this.sqOpendCk = true;
		}
	}
	
	$(function () {
		$("#callingUp_btn").click(function () {
			//저함수에서 아이디 리턴 받을 거임
			//받았다 치고 시작하겠음 id = admin임
			if(sqOpend()){
				showPopup();
			}else{
				$("#madeSquads").remove();
			}
			
		})
	})
	
	
	
</script>
<script>

</script>
<body class="default">
	<div id="wrapper" class="sub">
		<header id="header" class="after_1102">
			<jsp:include page="header.jsp" />
		</header>
		<main id="middle" class="sub">
		<div class="squadMakerDiv">
			<div class="storageDiv">
				<div class="callingUp_div">
					<button id="callingUp_btn">저장된 내 스쿼드 불러오기 / 삭제하기</button>
				</div>
				<div class="inputStorage_div">
					<div>
						<input id="inputName" placeholder="스쿼드 이름 입력">
						<button id="storage_btn">스쿼드 저장</button>
					</div>
				</div>
			</div>
			<div class="squadInfo_div">
				<div id="pay_div">
					<div id="payDiv_tr">
						<div id="paySide_th">총 급여</div>
						<div id="paySide_td">0/180</div>
					</div>
				</div>
				<div id="chart_div">
					<div id="chartDiv_tr">
						<div id="position_tr">
							<div>FW</div>
							<div>MF</div>
							<div>DF</div>
							<div>GK</div>
						</div>
						<div id="chart_tr">
							<div style="width: 100%; height: 15%">
								<div id="chart_fw"></div>
							</div>
							<div style="width: 100%; height: 15%">
								<div id="chart_mf"></div>
							</div>
							<div style="width: 100%; height: 15%">
								<div id="chart_df"></div>
							</div>
							<div style="width: 100%; height: 15%">
								<div id="chart_gk"></div>
							</div>
						</div>
						<div id="chartValue_tr">
							<div id="fw_value">0</div>
							<div id="mf_value">0</div>
							<div id="df_value">0</div>
							<div id="gk_value">0</div>
						</div>
					</div>
				</div>
				<div id="peopleNumber_div">
					<div id="peopleNumber_tr">
						<div id="peopleNumber_th">총 인원</div>
						<div id="peopleNumber_td">0명</div>
					</div>
				</div>
			</div>
			<div class="selectPosition_tr">
				<select id="selectBack">
					<option>포지션을 선택하세요.</option>
					<option>3Back</option>
					<option>4Back</option>
					<option>5Back</option>
				</select> <select id="selectPosition">
					<option>===============</option>
				</select> <select id="selectAdaptation">
					<option value="0">적응도 +1</option>
					<option value="1">적응도 +2</option>
					<option value="2">적응도 +3</option>
					<option value="3">적응도 +4</option>
					<option value="4">적응도 +5</option>
				</select>
				<button id="squadReset">초기화</button>
			</div>
			
			
			
			<div id="squadDiv">
				<div id="keyplayers"
					style="background-image: url(images/stadium.jpg); background-size: 100% 100%">
					<span></span> 
					<span></span> 
					<span></span> 
					<span></span> 
					<span></span>
					<span></span> 
					<span></span> 
					<span></span> 
					<span></span> 
					<span></span>
					<span></span>
				</div>
				
				<div id="banchPlayers">
					<span id="banch1" class="banchPlayer"  ondrop="drop(event)" ondragover="allowDrop(event)" draggable="true" ondragstart="drag(event)">
						<img class="playerKeyPlusButton" src="images/playerPlus.png" draggable="false" id="player_img11"> 
						<div class="banch keyPlayer_name" id="player_name11" draggable="false"></div>
					</span> 
					<span id="banch2" class="banchPlayer"  ondrop="drop(event)" ondragover="allowDrop(event)" draggable="true" ondragstart="drag(event)">
						<img class="playerKeyPlusButton" src="images/playerPlus.png" draggable="false" id="player_img12">
						<div class="banch keyPlayer_name" id="player_name12" draggable="false"></div>
					</span>
					<span id="banch3" class="banchPlayer"  ondrop="drop(event)" ondragover="allowDrop(event)" draggable="true" ondragstart="drag(event)">
						<img class="playerKeyPlusButton" src="images/playerPlus.png" draggable="false" id="player_img13">
						<div class="banch keyPlayer_name" id="player_name13" draggable="false"></div>
					</span>
					<span id="banch4" class="banchPlayer"  ondrop="drop(event)" ondragover="allowDrop(event)" draggable="true" ondragstart="drag(event)">
						<img class="playerKeyPlusButton" src="images/playerPlus.png" draggable="false" id="player_img14">
						<div class="banch keyPlayer_name" id="player_name14" draggable="false" ></div>
					</span>
					<span id="banch5" class="banchPlayer"  ondrop="drop(event)" ondragover="allowDrop(event)" draggable="true" ondragstart="drag(event)">
						<img class="playerKeyPlusButton" src="images/playerPlus.png" draggable="false" id="player_img15">
						<div class="banch keyPlayer_name" id="player_name15" draggable="false" ></div>
					</span>
					<span id="banch6" class="banchPlayer"  ondrop="drop(event)" ondragover="allowDrop(event)" draggable="true" ondragstart="drag(event)">
						<img class="playerKeyPlusButton" src="images/playerPlus.png" draggable="false" id="player_img16">
						<div class="banch keyPlayer_name" id="player_name16" draggable="false" ></div>
					</span>
					<span id="banch7" class="banchPlayer"   ondrop="drop(event)" ondragover="allowDrop(event)" draggable="true" ondragstart="drag(event)">
						<img class="playerKeyPlusButton" src="images/playerPlus.png" draggable="false" id="player_img17">
						<div class="banch keyPlayer_name" id="player_name17" draggable="false" ></div>
					</span>

				</div>
			</div>

		</div>
		<!-- 마지막 -->
		<div class="squadMakerSearch_div">
			<div id="title">
				<div></div>
				<div>선수 정보</div>
				<div>
					<a href="#"> <img id="searchClose" src="images/closeButton.png">
					</a>
				</div>
			</div>
			<div id="form_div">
				<form id="form1" onsubmit="return false;">
					<div class="search_panel">
						<div class="search_input_name">
							<input type="text" id="searchName" name="strPlayerName"
								placeholder="선수명을 입력해주세요.">
						</div>
						<div class="search_input_submit">
							<button class="btn_search">검색</button>
							<button class="btn_reset">초기화</button>
						</div>
						<div class="search_input_submit_adder">
							<a href="#" class="btn_search_detail"> <span class="txt">상세
									검색 </span> <span class="num" name="spSeachCnt"></span> <span
								class="arr"></span>
							</a>
						</div>
					</div>
					<div class="search_choice_sort">
						<div class="search_class search_sort">
							<div class="main"></div>
						</div>
					</div>
				</form>


				<div id="searchResult">
					<ul>
						<li><a href="#tabs-1">검색 결과</a></li>
						<li><a href="#tabs-2">관심 선수</a></li>
					</ul>
					<div id="tabs-1">
						<div class="main_th">
							<div class="searchResult_th">
								<div>급여</div>
							</div>
							<div class="searchResultB_Info_th">
								<div>기본 정보</div>
							</div>
							<div class="searchResult_th">
								<div>ovr</div>
							</div>
							<div class="searchResult_th">
								<div>슛</div>
							</div>
							<div class="searchResult_th">
								<div>패스</div>
							</div>
							<div class="searchResult_th">
								<div>드리블</div>
							</div>
							<div class="searchResult_th">
								<div>수비</div>
							</div>
							<div class="searchResult_th">
								<div>피지컬</div>
							</div>
						</div>
						<div id="resultList"></div>
					</div>
					<div id="tabs-2">
						<div class="main_th">
							<div class="searchResult_th">
								<div>급여</div>
							</div>
							<div class="searchResultB_Info_th">
								<div>기본 정보</div>
							</div>
							<div class="searchResult_th">
								<div>ovr</div>
							</div>
							<div class="searchResult_th">
								<div>슛</div>
							</div>
							<div class="searchResult_th">
								<div>패스</div>
							</div>
							<div class="searchResult_th">
								<div>드리블</div>
							</div>
							<div class="searchResult_th">
								<div>수비</div>
							</div>
							<div class="searchResult_th">
								<div>피지컬</div>
							</div>
						</div>
						<div id="resultList"></div>
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