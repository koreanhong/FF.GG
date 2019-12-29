//가져온 데이터를 이용해 동적 테이블 생성
var attention = new Array();
if (sessionStorage.getItem('attention') !== null) attention = JSON.parse(sessionStorage.getItem('attention'));

//시즌이미지 url에 사용되는 json
var classId = {
		101: "icon",
		201: "NHD",
		202: "tki",
		206: "tb",
		207: "tt",
		210: "gr",
		211: "19toty",
		212: "18toty",
		213: "MCICON",
		214: "tc",
		215: "19tots",
		216: "hot",
		217: "coc",
		218: "OTW",
		295: "2019KFA",
		297: "MCFC",
		298: "KFA",
		300: "LIVE",
		317: "17",
		318: "18",
		500: "PLC",
		501: "18PLS",
		502: "19PLA"
};

//오버롤테스트
//var ovrList = new Array();

// 선수 정보 뿌려주기
var setListTable = function(index, player) {
//	ovrList.push(player);
//	ovrList.sort(function(a, b) {
//		return a.average_stat.av_defense - b.average_stat.av_defense;
//	});
	
	var tr = $("<div>").attr('class', "tr");
	var td1 = $("<div>").attr("class", "td default").html(player.name);

//	시즌 이미지 넣어주기
	var id;
	var seasonId;
	var spid = player.id;
	seasonId = Math.floor(spid / 1000000);

	if (spid >= 200000000 && seasonId != 213) id = spid % 1000000;
	else id = spid;
	
	var seasonURL = "http://s.nx.com/s2/game/fo4/obt/externalAssets/season/" + classId[seasonId] + ".png";
	var seasonImg = $("<img>").attr({
			class: 'season',
			src: seasonURL
		});
	td1.append(seasonImg);
	
//	사진 이미지 넣어주는 부분
	var img = $("<img>").attr({
		class: 'playerimg',
		src: "https://fo4.dn.nexoncdn.co.kr/live/externalAssets/common/players/p" + id + ".png",
		alt: '""',
		onerror: "this.src='https://fo4.dn.nexoncdn.co.kr/live/externalAssets/common/players/not_found.png'"
	});
	td1.append(img);

//	포지션 밸류 넣어주는 부분
	var polength = player.main_position.positions.length;
	for (var i = 0; i < polength; i++) {
		var position = $("<div>").attr("class", "position_value");
		position.html(player.main_position.positions[i] +" " +player.main_position.positions_ovr[i]);
		td1.append(position);
	}

//	버튼 만들어주는 곳
	var icon = $("<div>").attr("class", "icon");
	var plusBtn = $("<form>").attr({
		class: "fas fa-search-plus",
		action: "playerDetailView.do",
		target: "_blank",
		method: "post"
	});
	var input = $("<input>").attr({
		type: "hidden",
		value: JSON.stringify(player),
		name: "param"
	});
	
	var inputId = $("<input>").attr({
		type: "hidden",
		value: player.id,
		name: "id"
	});

	plusBtn.append(input, inputId);
	plusBtn.click(function() {
		plusBtn.submit();
	});
	icon.append(plusBtn);

	var basket = $("<div>");
	
//	세션 체크
	var attlen = attention.length;
	if (attlen === 0) {
		basket.attr("class", "far fa-heart");
	} else {
		for (var i = 0; i < attlen; i++) {
			if (attention.indexOf(player.id) === -1) basket.attr("class", "far fa-heart");
			else basket.attr("class", "fas fa-heart");
		}
	}
	
//	클릭 이벤트
	basket.click(function() {
		if (basket.attr("class") == "far fa-heart") {
			attention.push(player.id);
			basket.attr("class", "fas fa-heart");
		} else {
			for (var i = 0; i < attlen; i++) {
				var p = attention[i];
				if (p === player.id) attention.splice(i, 1);
			}
			basket.attr("class", "far fa-heart");
		}
		sessionStorage.setItem("attention", JSON.stringify(attention));
	});
	icon.append(basket);
	td1.append(icon);
	
//	데이터 담아서 뿌려주는 곳
	var td2 = $("<div>").attr("class", "td td_ar pay").html(player.main_position.positions_ovr[0]);
	var td3 = $("<div>").attr("class", "td td_ar").html(player.basic_info.pay_side);
	var td4 = $("<div>").attr("class", "td td_ar").html(player.average_stat.av_speed);
	var td5 = $("<div>").attr("class", "td td_ar").html(player.average_stat.av_dribble);
	var td6 = $("<div>").attr("class", "td td_ar").html(player.average_stat.av_pass);
	var td7 = $("<div>").attr("class", "td td_ar").html(player.average_stat.av_physical);
	var td8 = $("<div>").attr("class", "td td_ar_bp").html(player.rating);
	tr.append(td1).append(td2).append(td3).append(td4).append(td5).append(td6).append(td7).append(td8);
	$("#divPlayerList").append(tr);
};

//console.log(ovrList);
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//스크롤 버튼
var scrollButton = function() {
	$(window).scroll(function() {
		if ($(this).scrollTop() > 100) $(".list_aside").fadeIn();
		else $(".list_aside").fadeOut();
	});
	// 위로 가기 버튼
	$(".btn_list_top").click(function() {
		$("html, body").animate({ scrollTop: 0 }, 0);
	});
	// 아래로 가기 버튼
	$(".btn_list_bottom").click(function() {
		$("html, body").animate({ scrollTop: $("#footer").offset().top }, 0);
	});
	
	//상세검색폼 클릭이벤트
	$('.btn_search_detail').click(function () {
		if ($(this).hasClass('btn_search_detail active')) $(this).attr('class', 'btn_search_detail');
		else $(this).attr('class', 'btn_search_detail active');
	})
};
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//동적 테이블에서 정렬해주는 기능
var sort = function() {
	$(".ar_warp a").click(function() {
		var $this = $(this);
		var $this_table = $this.parents(".player_list_wrap");
		var $this_start_number = $this.parent().parent().index();
		var table_th_length = $this.parents(".player_list_wrap").find(".thead .th").length;
		var table_tr_length = $this.parents(".player_list_wrap").find(".tbody .tr").length;
		
		console.log($(this).attr('id'));
//		console.log("디스 : " + $this.parent() + " / 디스 테이블 : " + $this_table + " / 이놈 스타트 넘버 : " + $this_start_number + " / th 길이 : " + table_th_length + " / tr 길이 : " + table_tr_length)

		new_array = new Array();
		for (let i = 0; i < table_tr_length; i++) {
			new_array[i] = [];
			for (let j = 0; j < table_th_length; j++) {
				var text_array = $this_table.find(".tbody .tr").eq(i).find(".td").eq(j).html();
//				var text_array = $this_table.eq(0).find(".tbody .tr #playerInfo").val()
				new_array[i][j] = text_array;
//				console.log(text_array);
//				console.log($this_table.eq(i).find(".tbody .tr #playerInfo").val());
//				console.log($this_table.find(".tbody .tr").eq(i).find(".td").eq(j).find('.default').html())
//				console.log();
			}
//			console.log(text_array);
		}
//		console.log($this_table.eq(0).find(".tbody .tr #playerInfo").val());
//		console.log(new_array);

		new_array.sort(function(a, b) {
			if ($this.hasClass("btn_up")) {
				return a[$this_start_number] - b[$this_start_number];
			} else {
				return b[$this_start_number] - a[$this_start_number];
			}
		});
		
//		console.log(new_array);

		$this_table.find("#divPlayerList").empty();
		re_table(table_tr_length, table_th_length, $this_table, new_array);
//		setListTable(new_array)
	});
// /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// 정렬 후 동적 테이블 생성
	var re_table = function(row, colomn, $this_table, new_array) {
//		console.log(new_array[0][0]);
		for (let i = 0; i < row; i++) {
			var tr = $("<div>").attr("class", "tr");
//			.attr(
//				"onclick",
//				'$("#playerId").val(' + new_array[i][colomn - 1] + ")"
//			);
			// .attr('draggable', 'true');
			for (let j = 0; j < colomn; j++) {
				var td = $("<div>");
				if (j == 0) td.attr("class", "td default").html(new_array[i][j]);
				else if (j == colomn - 1)
					td.attr("class", "td td_ar_bp").html(new_array[i][j]);
				else if (j == 1) td.attr("class", "td td_ar pay").html(new_array[i][j]);
				else td.attr("class", "td td_ar").html(new_array[i][j]);
				tr.append(td);
//				console.log(new_array[i][j]);
			}
			$("#divPlayerList").append(tr);
		}
	};
};
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//마우스 올리면 아이콘 뜨게 만들기
$(document).on("mouseover", ".tbody .tr", function() {
	$(this).find(".fa-search-plus").css("display", "block");
}).on("mouseout", $(this), function() {
	$(this).find(".fa-search-plus").css("display", "none");
});