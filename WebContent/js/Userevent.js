function start(num){
	var nickname;
	if(num==1){ //랭킹페이지에서 넘어오는 경우
		index = 1;
		nickname = sessionStorage.getItem("nickname");
		
		MatchInfo = getInfo(nickname, 50);
		BuyInfo = getTrade(nickname,"buy");
		SellInfo = getTrade(nickname,"sell");
		$('#div1 *').remove();
		$('#div2 *').remove();
		$('#div3 *').remove();
		$('#div4 *').remove();
		$('#div5 *').remove(); // 테이블 삭제
		$('#div6 *').remove(); // 테이블 삭제
		
		if(MatchInfo.length != 0){
			makediv1(nickname);
			makediv2(MatchInfo, nickname);
			makediv3(MatchInfo, nickname);
			makediv4(MatchInfo, nickname);
			makediv5(MatchInfo,nickname); // 게임 결과, 정보 만들어 주는 함수			
			makediv6(BuyInfo,SellInfo); // 거래 정보 만들어주는 함수				
		}
		else{
			location.href='NoInfo.do';
		}
		$('#loading').hide();
	}
	
	$(document).on('click','.one',function(){// 해당 경기의 자세히를 누른 경우
		if ($(this).hasClass('fa-angle-double-down')) $(this).attr('class', 'fas fa-angle-double-up one');
		else $(this).attr('class', 'fas fa-angle-double-down one');
	
		var id = $(this).attr("id");
		var index = id.substring(3);
		
		id = id.replace("btn", "detaildiv");
		$('#' + id).toggle();
		// 처음에는 squad화면 띄움
		$('#squad' + index).css("background-color", "gray");
		$('#total' + index).css("background-color", "white");
		$('#tab' + index + "-1").show();
		$('#tab' + index + "-2").hide();
	});	
	

	$(document).on('click', "#more", function() { // 경기 수 더보기를 누른 경우
		$('#more').text(""); // 더보기 지워주고
		$('#more').append("<img src=../images/loading.gif style=height:30px;>"); // loading으로교체
		setTimeout(() => {
			makediv5(MatchInfo,nickname);	
		}, 500);
	});
	
	$(document).on('click', ".detaildiv ul li", function() { // 스쿼드,통계 탭 처리해주는 부분
		var id = $(this).attr("id");
		var check = id.substring(0, 5);
		var index = id.substring(5);
		if (check == "squad") {
			$('#squad' + index).css("background-color", "gray");
			$('#total' + index).css("background-color", "white");
			$('#tab' + index + "-1").show();
			$('#tab' + index + "-2").hide();
		} else {
			$('#squad' + index).css("background-color", "white");
			$('#total' + index).css("background-color", "gray");
			$('#tab' + index + "-1").hide();
			$('#tab' + index + "-2").show();
		}

	});
	$(document).on('mouseover', ".pimage", function() { // 선수 이미지에 마우스 올리는
														// 경우
		var id = $(this).attr("id");
		var left1 = $('#'+id).css("left");
        var top1 = $('#'+id).css("top");
        var left = parseInt(left1);
        left = (left+20)+"px";
        var top = parseInt(top1);
        top = (top+20)+"px";
        $('#imgdt'+id).css({left: left, top: top});
		$('#imgdt'+id).show();
		
	});
	$(document).on('mouseout', ".pimage", function() { // 선수 이미지에서 마우스를 떼는
														// 경우
		var id = $(this).attr("id");
		$('#imgdt'+id).hide();
	});
}