<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<link rel="icon" href="data:;base64,iVBORw0KGgo=">
<link rel="stylesheet"
	href="https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css">
<script
	src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
<script
	src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js"></script>
<script
	src="https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js"></script>
<title>Insert title here</title>
<script src='https://kit.fontawesome.com/a076d05399.js'></script>

<script src="https://code.jquery.com/jquery-2.2.4.js"></script>
<script type="text/javascript" src="../js/Userajaxfunction.js"></script>
<script type="text/javascript" src="../js/Userdb.js"></script>
<script type="text/javascript" src="../js/Userusefunction.js"></script>
<script type="text/javascript" src="../js/Userevent.js"></script>
<link rel="stylesheet" type="text/css" href="../css/userstyle.css">

<style>
div#d1 {
    position: relative;
    height: 300px;
}

div#d2 {
    position: relative;
    margin-top: 100px;
    margin-bottom: 100px;
}
</style>

<script type="text/javascript">
	index = 1;
	var MatchInfo = new Array;
	var BuyInfo = new Array;
	var SellInfo = new Array;
	$(document).ready(function() {
		var check = sessionStorage.getItem("nickname");
		if (check == null) {
			start(0);
		} else {
			start(1);
		}
		sessionStorage.removeItem('nickname');
		
		
		
	})
</script>

<script type="text/javascript">
	Dcnt = 0;
	M1cnt = 0;
	M2cnt = 0;
	M3cnt = 0;
	Fcnt = 0;
	myform = "";
	yourform = "";
	EveryWin = 0;
	EveryLoose = 0;

	function makediv1(nickname) {
		MakeNickName(nickname);
	}

	function makediv2(MatchInfo, nickname) {
		MakeDateChart(MatchInfo, nickname);
	}

	function makediv3(MatchInfo, nickname) {
		MakekBestPlayerDiv(MatchInfo, nickname);
	}
	
	function makediv4(MatchInfo, nickname) {
		makeDivision(MatchInfo, nickname);
		MakeFormation(MatchInfo, nickname);
	}

	function makediv5(datalist, nickname) { //게임 결과, 정보 만들어 주는 함수
		var length = datalist.length + 1;
		var text = "";
		for (var i = index; i < index + 6; i++) {
			if (i == length) {
				break;
			}
			text += infodivform(i);
		}
		$('#div5').append(text);

		for (var i = 0; i < 6; i++) { //6줄 생성
			if (index == length) {
				break;
			}
			var me = 1;
			var you = 1;
			//matchInfo의 index정해주기 ( 나, 상대 )
			if (nickname == datalist[index - 1].matchInfo[0].nickname) {
				me = 0;
				you = 1;
			} else {
				me = 1;
				you = 0;
			}

			//정보 table생성
			makeinfotab(datalist, me, you,nickname);

			//자세히보기 추가 태그
			makedetailtab(datalist, me, you,nickname);

			//승패에 따른 색상
			if (datalist[index - 1].matchInfo[me].matchDetail.matchResult == "승") {
				$('#tab' + index).attr("bgcolor", "lightblue");
			} else if (datalist[index - 1].matchInfo[me].matchDetail.matchResult == "무") {
				$('#tab' + index).attr("bgcolor", "Khaki");
			} else {
				$('#tab' + index).attr("bgcolor", "lightcoral");
			}

			index++;
			
		}
		$('#more').remove(); //로딩 지워주고 
		$('#div5').append("<div id=more>");
		$('#more').text("더 보 기");
	}

	function makediv6(buyInfo, sellInfo) { //판매,구매목록 만들어주는 함수
		if(buyInfo.length != 0){
			$('#div6').append('<div id=buydiv>구매</div>'
							+ '<table border=1 id=buytab></table><br>');
			buyTab(buyInfo); //구매목록 테이블 생성		
		}
		if(sellInfo.length != 0){
			$('#div6').append('<div id=selldiv>판매</div>'
							+ '<table border=1 id=selltab></table>');
			sellTab(sellInfo);//판매목록 테이블 생성		
		}
	}
</script>
</head>

<body class="default">
	<div id="wrapper" class="sub">
		<header id="header" class="after_1102">
			<jsp:include page="header.jsp" />
		</header>
		<main id="middle" class="sub">
		<div class="datacenter">
			<div id="div">
				<div id="d1">
					<div id="div1"></div>
					<div id="div2"></div>
					<div id="div3"></div>
				</div>
				<div id="d2">
					<div id="div4"></div>
					<div id="div6"></div>
					<div id="div5"></div>
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