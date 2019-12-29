/**
 * 
 */

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