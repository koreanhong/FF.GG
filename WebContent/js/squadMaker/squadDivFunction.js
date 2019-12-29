/**
 * 
 * 스쿼드에서의 기능 구현

 * 
 */


//스쿼드에 추가한 선수들의 크기를 고정합니다.
var players_JSON = [{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{}]
//급여의 합계 
var setAllPay = function () {
	var payCombine = 0;
	var pay_side= $("#paySide_td")
	$("#keyplayers #player_position").each(function () {
		payCombine += Number($(this).attr("value"));
	})
	
	pay_side.text(payCombine+"/180");
	
	if(payCombine>180){
		pay_side.css("color", "red");
	}else{
		pay_side.css("color", "black");
	}
}

//차트갱신
var setPositionChert = function (className, chart_id, th_id) {
	
	var number = $("."+className).length;
	var values = 0;
	
	$("." + className + " #player_value").each(function () {
		values += Number($(this).text());
	})
	
	var rs = values/number/150;
	
	
	$("#" + chart_id).css("width", rs*100+"%")
	
	$("#" + th_id).text(Math.floor(values/number));
}
//모든 차트 갱신 함수
var setFormationValue = function () {
	setPositionChert('fw', 'chart_fw', "fw_value");
	setPositionChert('mf', 'chart_mf', "mf_value");
	setPositionChert('df', 'chart_df', "df_value");
	setPositionChert('gk', 'chart_gk', "gk_value");
}

var setPeopleNumber = function () {
	var people = $("#squadDiv #player_position").length
	$("#peopleNumber_td").text(people + "명");
}



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



var positionIndex = {
		"ST" : 0,
		"LS" : 0,
		"RS" : 0,
		"LW" : 1,
		"LF" : 2,
		"CF" : 2,
		"RF" : 2,
		"RW" : 3,
		"LAM" : 4,
		"CAM": 4,
		"RAM": 4,
		"LM": 5,
		"LCM" : 6,
		"CM": 6,
		"RCM" : 6,
		"RM": 7,
		"LDM" : 8,
		"CDM" : 8,
		"RDM" : 8,
		"LWB" : 9,
		"LCB" : 10,
		"CB" : 10,
		"RCB" : 10,
		"RWB" : 11,
		"LB" : 12,
		"SW" : 13,
		"RB" : 14,
		"GK" : 15
}


var infoKeyPlayerOver = function (selectPositionID, player) {
	 var position;
	   if(selectPositionID.includes("banch")){
		   position = player.mainPosition;
	   }else{
		   position = selectPositionID;
	   }
	 var position_value = player.positionValue[positionIndex[position]]; 
	 if($("#"+selectPositionID+" .keyPlayer_name").text() == ""){
		var squad = $('.squadMakerSearch_div');
		   $("#"+selectPositionID+" .keyPlayer_name").text(player.name);
	 	   $("#"+selectPositionID+" .playerKeyPlusButton").attr(
				   {"src" : "https://fo4.dn.nexoncdn.co.kr/live/externalAssets/common/players/p" + player.id + ".png"
					,"onError" : "this.src='http://fo4.dn.nexoncdn.co.kr/live/externalAssets/common/players/not_found.png'"})
					.css({"left" : "20px", "top" : "20px"});
	   
	    var adaptation = Number($("#selectAdaptation").val());
	   //강화버튼
	    var enEnhance = $("<select>").attr("id", "player_enhance").append(
			   "<option value=0>1</option>"+
				"<option value=1>2</option>"+
				"<option value='2'>3</option>"+
				"<option value='4'>4</option>"+
				"<option value='6'>5</option>"+
				"<option value='8'>6</option>"+
				"<option value='11'>7</option>"+
				"<option value='15'>8</option>"+
				"<option value='19'>9</option>"+
				"<option value='24'>10</option>")
				
	   
		enEnhance.click(function () {
			valueDiv.text(position_value + Number(enEnhance.val()) + adaptation);
			setFormationValue();
		})
		
		$("#selectAdaptation").click(function () {
			valueDiv.text(position_value + Number(enEnhance.val()) + Number($("#selectAdaptation").val()));
			setFormationValue();
		})
		
	   //시즌  div		  
	   var season = $("<img>").attr({"src" : "http://s.nx.com/s2/game/fo4/obt/externalAssets/season/"
			+ classId[player.season] + ".png", "id" : "player_seasonImg"});
	  
	   var positionDiv = $("<div>").attr({"id" : "player_position",
	   		"value" : player.pay}).text(position)
	  
	   //value div
	 	var valueDiv = $("<div>").attr({"id": "player_value"
				  ,"value" : player.checkItem}).text(position_value + Number(enEnhance.val()) + adaptation);
	   
	  	$("#" + selectPositionID).append(enEnhance ,season, positionDiv, valueDiv)
	   //포지션 div
	    squad.css("display", "none");
	    setAllPay();
	    setPeopleNumber();
		
	}
	else{
		$("#"+selectPositionID+" #player_position").text(position)
	  	$("#"+selectPositionID+" #player_value").text(position_value)
	}
}

var showSearchResult = function(tagName, data) {
	$("#" + tagName + " #resultList").empty();
	
	var resultList = $("#" + tagName + " #resultList");
	if(data != null){
		resultList.css("font-size" , "15px");
	
		$.each(data, function(index, player) {
			var srt = $('<div>').attr("id", "searchResult_tr")
					.css("height", "85px");

			var pay = $("<div>")
					.attr("class", "searchResult_th")
					.css({"background-image" : "url('/images/hexagon-border.png')",
						"background-size" : "100% 100%"
						}).append($("<div>").text(player.basic_info.pay_side))

			var id;
			var seasonId;
			var spid = player.id; 
			seasonId = Math.floor(spid / 1000000);
			

			if (spid >= 200000000 && seasonId != 213) {
       			id = spid % 1000000;
			} else {
				id = spid;
			}
			
			var checkItem = spid % 1000000;
			
			var imageURL = "https://fo4.dn.nexoncdn.co.kr/live/externalAssets/common/players/p"
					+ id + ".png"
			var seasonURL = "http://s.nx.com/s2/game/fo4/obt/externalAssets/season/"
					+ classId[seasonId] + ".png";
			var seasonImg = $("<img>").attr("src", seasonURL);

			var playerName = $("<div>").text(player.name);

			var Info_th_center = $("<div>").attr("id", "Info_th_center").append(seasonImg, playerName)

			var mainPosition = $("<div>");

			$.each(player.main_position.positions,function(index) {
					var div1 = $('<div>')
					var div2 = $('<div>').text(player.main_position.positions[index]
								+ player.main_position.positions_ovr[index]);

					div1.append(div2);
					mainPosition.append(div1);
			});
			
			var playerImage = $("<img>").attr({"id" : "Info_th_left",
											"src" : imageURL,
											"onError" : "this.src='http://fo4.dn.nexoncdn.co.kr/live/externalAssets/common/players/not_found.png'"
										});
			var info = $("<div>").attr("class", "searchResultB_Info_th").append(playerImage, Info_th_center);

			var ovr = $("<div>").attr("class","searchResult_th").append(mainPosition);
			var shoot = $("<div>").attr("class", "searchResult_th").append(
									$("<div>").text(player.average_stat.av_shoot))
			var pass = $("<div>").attr("class", "searchResult_th").append($("<div>").text(player.average_stat.av_pass))
			var speed = $("<div>").attr("class", "searchResult_th").append($("<div>").text(player.average_stat.av_speed))
			var defense = $("<div>").attr("class", "searchResult_th").append(
			$("<div>").text(player.average_stat.av_defense))
			var physical = $("<div>").attr("class","searchResult_th").append($("<div>").text(player.average_stat.av_physical))
			srt.append(pay, info, ovr, shoot, pass, speed, defense, physical);
			resultList.append(srt)
			
		  
			
			srt.mouseover(function () {
				srt.css("background-color", "#F6E3CE");
				
				})
			srt.mouseout(function () {
				srt.css("background-color", "#FFFFFF");
				})
			
			srt.click(function () {
				var ckeckRs = true;
				$("#squadDiv #player_value").each(function () {
					if(checkItem == $(this).attr("value")){
						ckeckRs = false;
						alert("동일한 선수를 스쿼드에 추가 할수 없습니다.")
						return false;
					}
				})
				if(ckeckRs){
					
				var indexNumber;
				$("#squadDiv span").each(function (index) {
					if($(this).attr("id") == selectPositionID){
						indexNumber = index;
					}
				})
				
				
				var playerJson = {
						"id" : id,
						"season" : seasonId ,
						"name" : player.name,
						"checkItem" : checkItem,
						"selectPositionID" : selectPositionID,
						"mainPosition" :  player.main_position.positions[0],
						"positionValue" : player.position_value,
						"pay" : player.basic_info.pay_side
				};
				
				players_JSON[indexNumber] = playerJson;
				infoKeyPlayerOver(selectPositionID, playerJson);
				setFormationValue();				
				
				}
			})
			
    });
	}else{
		
		resultList.text("검색 결과가 없습니다.").css("font-size" , "20px")
	}
	
}