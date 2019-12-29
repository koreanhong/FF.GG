

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
	
var showSearchResult = function(data) {
	$("#resultList").empty();

	var resultList = $('#resultList');
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
			if (spid >= 200000000) {
				id = spid % 1000000;
			} else {
				id = spid;
			}
			seasonId = Math.floor(spid / 1000000);
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
			})
    }