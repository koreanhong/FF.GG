function getInfo(nickname, limit) { // 닉네임으로 정보 얻어오는 함수
	var InfoList = new Array;
	$.ajax({
		type : "get",
		url : "GetInfo.do",
		dataType : 'json',
		data : 'nickname=' + nickname + "&limit=" + limit,
		async : false,
		success : function(data) {
			InfoList = data.MatchInfo;
		},
		error : function(data) {
		}
	});
	return InfoList;
}

function getLevel(nickname) { //레벨 요청하는 함수
	var level = 0;
	$.ajax({
		type : "get",
		url : "GetLevel.do",
		dataType : 'json',
		data : 'nickname=' + nickname,
		async : false,
		success : function(data) {
			level = data.level;
		},
		error : function(xhrReq, status, error) {
			console.log(xhrReq + " ," + status + " ," + error);
		}
	});

	return level;
}

function getDivisionnum(nickname) { //최고 등급 번호 요청하는 함수
	var divisionnum = "";
	$.ajax({
		type : "get",
		url : "GetDivision.do",
		dataType : 'json',
		data : 'nickname=' + nickname,
		async : false,
		success : function(data) {
			divisionnum = data.division;
		},
		error : function(xhrReq, status, error) {
			console.log(xhrReq + " ," + status + " ," + error);
		}
	});
	return divisionnum;
}

function getTrade(nickname,tradetype){ //Trade목록 요청하는 함수
	var result= new Array;
	$.ajax({
		type : "get",
		url : "GetTrade.do",
		dataType : 'json',
		data : 'nickname=' + nickname +'&tradetype='+tradetype,
		async : false,
		success : function(data) {
			result = data;
//			console.log(result)
		},
		error : function(xhrReq, status, error) {
			console.log(xhrReq + " ," + status + " ," + error);
		}
	});
	return result;
}

function getPlayerName(list) {
	var result = new Array();
	$.ajax({
		url: 'getPlayerName.do',
		type: "post",
		async: false,
		data: JSON.stringify(list),
		datatype: 'json',
		contentType: "application/json",
		success: function(data) {
			result = data;
		},
		error: function(jqXHR, textStatus, errorThrown) {
			console.log(jqXHR + " / " + textStatus + " / " + errorThrown);
		}
	})
	return result;
}

function getRanking() { // 닉네임으로 정보 얻어오는 함수
	var RankingList = new Array;
	$.ajax({
		type : "get",
		url : "GetRanking.do",
		dataType : 'json',
		async : false,
		success : function(data) {
			RankingList = data.ranker;
		},
		error : function(xhrReq, status, error) {
			console.log(xhrReq + " ," + status + " ," + error);
		}
	});
	return RankingList;
}