/**
 * 선수 드래그앤드롭 구현
 */

var emptyPlayer = function(id) {

	$("#" + id + " .playerKeyPlusButton").attr("src", "images/playerPlus.png")
			.css({
				"left" : "10px",
				"top" : "10px"
			});
	$("#" + id + " .keyPlayer_name").text("");
	$("#" + id + " #player_seasonImg").remove();
	$("#" + id + " #player_position").remove();
	$("#" + id + " #player_value").remove();
	$("#" + id + " #player_enhance").remove();

}

// 관심선수 가져옴
$(function() {
	var tagName = "tabs-2";
	var attentionPlayer = JSON.parse(sessionStorage.getItem('attention'));

	var check;
	if (attentionPlayer != null) {
		if (attentionPlayer.length != 0) {
			check = true;
		} else {
			check = false;
		}
	} else {
		check = false;
	}

	if (check) {
		$.ajax({
			type : "post",
			url : "attentionPlayers.do",
			data : JSON.stringify({
				"spid" : attentionPlayer
			}),
			dataType : "json",
			contentType : "application/json",
			success : function(data) {
				showSearchResult(tagName, data);
			}
		})
	} else {
		showSearchResult(tagName, null);
	}
})

function allowDrop(ev) {
	ev.preventDefault();
}

function drag(ev) {

	ev.dataTransfer.setData("text", ev.target.id);

}

function drop(ev) {
	// 드래그로 넘어온 아이디
	var data = ev.dataTransfer.getData("text");
	// 드래그를 받은 아이디ev.target.id.includes("name")
	var myId;
	if (ev.target.id.includes("img") || ev.target.id.includes("player")) {
		myId = $("#" + ev.target.id).parent().attr("id");
	} else {
		myId = ev.target.id;
	}
	// span에서의 인덱스 넘버 구하기
	var dataIndex;
	var myIdIndex;

	$("#squadDiv span").each(function(index) {
		if ($(this).attr("id") == data) {
			dataIndex = index;
			return false;
		}
	});

	$("#squadDiv span").each(function(index) {
		if ($(this).attr("id") == myId) {
			myIdIndex = index;
			return false;
		}
	});

	// 태그 포지션 value 변경
	// 해당 태그들 초기화 시켜줌
	emptyPlayer(data)
	emptyPlayer(myId)

	// json 순서변경
	var changeJson = players_JSON[dataIndex]
	players_JSON[dataIndex] = players_JSON[myIdIndex]
	players_JSON[myIdIndex] = changeJson

	// json내의 데이터 갱신
	players_JSON[myIdIndex].selectPositionID = myId
	players_JSON[dataIndex].selectPositionID = data

	//
	if (typeof players_JSON[dataIndex].name != "undefined") {
		infoKeyPlayerOver(data, players_JSON[dataIndex])
	}
	if (typeof players_JSON[myIdIndex].name != "undefined") {
		infoKeyPlayerOver(myId, players_JSON[myIdIndex]);
	}
	setFormationValue();
}