/**
 * 사용자가 포메이션을 변경할 경우 실행되는 이벤트입니다.
 */

var inputKeyPlayerNamdTag = function() {
	$("#keyplayers span").each(function(index) {
		if($(this).children(".playerKeyPlusButton").length == 0){
			var keyPlayer_name = $('<div>').attr({
				"id" : "player_name" + index,
				"class" : "keyPlayer_name"
			}).css({
				"left" : "-1px",
				"top" : "80px"
			})
			
			$(this).append(keyPlayer_name);
		}
	})
	
}
var inputKeyPlusButton = function() {
	$("#keyplayers span").each(function(index) {
		var me = $(this)
		if(me.attr("drop") != "drop(event)"){
			me.attr({
				"ondrop" : "drop(event)",
				"ondragover" : "allowDrop(event)",
				"draggable" : "true",
				"ondragstart" : "drag(event)"
			})
		}
		if(me.children(".playerKeyPlusButton").length == 0){
			var plusImage = $("<img>").attr({
				"class" : "playerKeyPlusButton",
				"src" : "images/playerPlus.png",
				"id" : "player_img"+index ,
				"draggable" : "false"
			});
			me.children(".keyPlayer_name").attr("draggable", "false")
			me.append(plusImage);
		}
	})
}

var changFormation = function(positionId, positionClass) {
	$('#keyplayers span').each(function(index) {
		$(this).attr({
			"id" : positionId[index],
			"class" : positionClass[index]
		})
	})
}
			
function Formation343() {	
	var positionId = ["GK", "LCB", "RCB", "CB", "LM", "LCM", "RCM", "RM", "LF", "RF", "ST"]
	var positionClass = ["formation gk", "formation df", 
		"formation df", "formation df", "formation mf", "formation mf", "formation mf", "formation mf",
		"formation fw", "formation fw", "formation fw"]
	
	changFormation(positionId, positionClass);
	
}


			function Formation343_2() {
				var positionId = ["GK", "LCB", "CB", "RCB", "LM", "LCM", "RCM", "RM", "LW", "RW", "ST"]
				var positionClass = ["formation gk", "formation df", 
					"formation df", "formation df", "formation mf", "formation mf", "formation mf", "formation mf",
					"formation fw", "formation fw", "formation fw"]
				
				changFormation(positionId, positionClass);
			}

			function Formation3412() {
				var positionId = ["GK", "LCB", "CB", "RCB", "LM", "LCM", "RCM", "RM", "CAM", "LS", "RS"]
				var positionClass = ["formation gk", "formation df", 
					"formation df", "formation df", "formation mf", "formation mf", "formation mf", "formation mf",
					"formation mf", "formation fw", "formation fw"]
				
				changFormation(positionId, positionClass);
			}

			function Formation3232() {
				
				var positionId = ["GK", "LCB", "CB", "RCB", "LDM", "RDM", "LM", "CM", "RM", "CF", "ST"]
				var positionClass = ["formation gk", "formation df", 
					"formation df", "formation df", "formation mf", "formation mf", "formation mf", "formation mf",
					"formation mf", "formation fw", "formation fw"]
				
				changFormation(positionId, positionClass);
			}

			function Formation32212() {
				
				var positionId = ["GK", "LCB", "CB", "RCB", "LDM", "RDM", "LM", "RM", "CAM", "LS", "RS"]
				var positionClass = ["formation gk", "formation df", 
					"formation df", "formation df", "formation mf", "formation mf", "formation mf", "formation mf",
					"formation mf", "formation fw", "formation fw"]
				
				changFormation(positionId, positionClass);

			}

			function Formation31213() {
				
				var positionId = ["GK", "LCB", "CB", "RCB", "CDM", "LM", "RM", "CAM", "LW", "RW", "ST"]
				var positionClass = ["formation gk", "formation df", 
					"formation df", "formation df", "formation mf", "formation mf", "formation mf", "formation mf",
					"formation fw", "formation fw", "formation fw"]
				
				changFormation(positionId, positionClass);				

			}

			function Formation3142() {
				
				var positionId = ["GK", "LCB", "CB", "RCB", "CDM", "LM", "LCM", "RCM", "RM", "LS", "RS"]
				var positionClass = ["formation gk", "formation df", 
					"formation df", "formation df", "formation mf", "formation mf", "formation mf", "formation mf",
					"formation mf", "formation fw", "formation fw"]
				
				changFormation(positionId, positionClass);
									
			}

			function Formation451() {
				
				var positionId = ["GK", "LB", "LCB", "RCB", "RB", "LM", "LCM","CM", "RCM", "RM", "ST"]
				var positionClass = ["formation gk", "formation df", 
					"formation df", "formation df", "formation df", "formation mf", "formation mf", "formation mf",
					"formation mf", "formation mf", "formation fw"]
				
				changFormation(positionId, positionClass);

			}

			function Formation442() {
				
				var positionId = ["GK", "LB", "LCB", "RCB", "RB", "LM", "LCM", "RCM", "RM", "CF", "ST"]
				var positionClass = ["formation gk", "formation df", 
					"formation df", "formation df", "formation df", "formation mf", "formation mf", "formation mf",
					"formation mf", "formation fw", "formation fw"]
				
				changFormation(positionId, positionClass);	
			}
			
			function Formation442_2() {
				
				var positionId = ["GK", "LB", "LCB", "RCB", "RB", "LM", "LCM", "RCM", "RM", "LS", "RS"]
				var positionClass = ["formation gk", "formation df", 
					"formation df", "formation df", "formation df", "formation mf", "formation mf", "formation mf",
					"formation mf", "formation fw", "formation fw"]
				
				changFormation(positionId, positionClass);
				
			}
			function Formation4411() {
				
				var positionId = ["GK", "LB", "LCB", "RCB", "RB", "LM", "LCM", "RCM", "RM", "CAM", "ST"]
				var positionClass = ["formation gk", "formation df", 
					"formation df", "formation df", "formation df", "formation mf", "formation mf", "formation mf",
					"formation mf", "formation mf", "formation fw"]
				
				changFormation(positionId, positionClass);
			}
			
			function Formation433() {
				
				var positionId = ["GK", "LB", "LCB", "RCB", "RB", "LCM", "CM", "RCM", "LW", "RW", "ST"]
				var positionClass = ["formation gk", "formation df", 
					"formation df", "formation df", "formation df", "formation mf", "formation mf", "formation mf",
					"formation fw", "formation fw", "formation fw"]
				
				changFormation(positionId, positionClass);
			}
			
			function Formation433_2() {
				
				var positionId = ["GK", "LB", "LCB", "RCB", "RB", "LCM", "CM", "RCM", "LF", "RF", "ST"]
				var positionClass = ["formation gk", "formation df", 
					"formation df", "formation df", "formation df", "formation mf", "formation mf", "formation mf",
					"formation fw", "formation fw", "formation fw"]
				
				changFormation(positionId, positionClass);
			}
			
			function Formation4321() {
				
				var positionId = ["GK", "LB", "LCB", "RCB", "RB", "LM", "CM", "RM", "LAM", "RAM", "ST"]
				var positionClass = ["formation gk", "formation df", 
					"formation df", "formation df", "formation df", "formation mf", "formation mf", "formation mf",
					"formation mf", "formation mf", "formation fw"]
				
				changFormation(positionId, positionClass);

			}
			function Formation4312() {
				
				var positionId = ["GK", "LB", "LCB", "RCB", "RB", "LCM", "CM", "RCM", "CAM", "LS", "RS"]
				var positionClass = ["formation gk", "formation df", 
					"formation df", "formation df", "formation df", "formation mf", "formation mf", "formation mf",
					"formation mf", "formation fw", "formation fw"]
				
				changFormation(positionId, positionClass);

			}
			
			function Formation424() {
				
				var positionId = ["GK", "LB", "LCB", "RCB", "RB", "LCM", "RCM", "LW", "RW", "LS", "RS"]
				var positionClass = ["formation gk", "formation df", 
					"formation df", "formation df", "formation df", "formation mf", "formation mf", "formation fw",
					"formation fw", "formation fw", "formation fw"]
				
				changFormation(positionId, positionClass);
			}
			
			function Formation4231() {
				
				var positionId = ["GK", "LB", "LCB", "RCB", "RB", "LDM", "RDM", "LAM", "CAM", "RAM", "ST"]
				var positionClass = ["formation gk", "formation df", 
					"formation df", "formation df", "formation df", "formation mf", "formation mf", "formation mf",
					"formation mf", "formation mf", "formation fw"]
				
				changFormation(positionId, positionClass);
			}
			function Formation4222() {
				
				var positionId = ["GK", "LB", "LCB", "RCB", "RB", "LDM", "RDM", "LAM", "RAM", "LS", "RS"]
				var positionClass = ["formation gk", "formation df", 
					"formation df", "formation df", "formation df", "formation mf", "formation mf", "formation mf",
					"formation mf", "formation fw", "formation fw"]
				
				changFormation(positionId, positionClass);
				
			}
			
			function Formation42211() {
				
				var positionId = ["GK", "LB", "LCB", "RCB", "RB", "LDM", "RDM", "LM", "RM", "CAM", "ST"]
				var positionClass = ["formation gk", "formation df", 
					"formation df", "formation df", "formation df", "formation mf", "formation mf", "formation mf",
					"formation mf", "formation mf", "formation fw"]
				
				changFormation(positionId, positionClass);
			}
			
			function Formation4213() {
				
				var positionId = ["GK", "LB", "LCB", "RCB", "RB", "LCM", "RCM", "CAM", "LW", "RW", "ST"]
				var positionClass = ["formation gk", "formation df", 
					"formation df", "formation df", "formation df", "formation mf", "formation mf", "formation mf",
					"formation fw", "formation fw", "formation fw"]
				
				changFormation(positionId, positionClass);
			}
			
			function Formation4213_2() {
				
				var positionId = ["GK", "LB", "LCB", "RCB", "RB", "LDM", "RDM", "CM", "LW", "RW", "ST"]
				var positionClass = ["formation gk", "formation df", 
					"formation df", "formation df", "formation df", "formation mf", "formation mf", "formation mf",
					"formation fw", "formation fw", "formation fw"]
				
				changFormation(positionId, positionClass);
			}
			
			function Formation4141() {
				
				var positionId = ["GK", "LB", "LCB", "RCB", "RB", "CDM", "LM", "LCM", "RCM", "RM", "ST"]
				var positionClass = ["formation gk", "formation df", 
					"formation df", "formation df", "formation df", "formation mf", "formation mf", "formation mf",
					"formation mf", "formation mf", "formation fw"]
				
				changFormation(positionId, positionClass);
			}
			
			function Formation4132() {
				
				var positionId = ["GK", "LB", "LCB", "RCB", "RB", "CDM", "LM", "CM", "RM", "LS", "RS"]
				var positionClass = ["formation gk", "formation df", 
					"formation df", "formation df", "formation df", "formation mf", "formation mf", "formation mf",
					"formation mf", "formation fw", "formation fw"]
				
				changFormation(positionId, positionClass);
			}
			
			function Formation4123() {
				
				var positionId = ["GK", "LB", "LCB", "RCB", "RB", "CDM", "LCM", "RCM", "LW", "RW", "ST"]
				var positionClass = ["formation gk", "formation df", 
					"formation df", "formation df", "formation df", "formation mf", "formation mf", "formation mf",
					"formation fw", "formation fw", "formation fw"]
				
				changFormation(positionId, positionClass);
			}
			
			function Formation4123_2() {
				
				var positionId = ["GK", "LB", "LCB", "RCB", "RB", "CDM", "LCM", "RCM", "LW", "RW", "CF"]
				var positionClass = ["formation gk", "formation df", 
					"formation df", "formation df", "formation df", "formation mf", "formation mf", "formation mf",
					"formation fw", "formation fw", "formation fw"]
				changFormation(positionId, positionClass);

			}
			function Formation41212() {
				
				var positionId = ["GK", "LB", "LCB", "RCB", "RB", "CDM", "LM", "RM", "CAM", "LS", "RS"]
				var positionClass = ["formation gk", "formation df", 
					"formation df", "formation df", "formation df", "formation mf", "formation mf", "formation mf",
					"formation mf", "formation fw", "formation fw"]
				changFormation(positionId, positionClass);

			}
			function Formation41212_2() {
				
				var positionId = ["GK", "LB", "LCB", "RCB", "RB", "CDM", "LCM", "RCM", "CAM", "LS", "RS"]
				var positionClass = ["formation gk", "formation df", 
					"formation df", "formation df", "formation df", "formation mf", "formation mf", "formation mf",
					"formation mf", "formation fw", "formation fw"]
				changFormation(positionId, positionClass);
				
			}
			
			function Formation541() {
				
				var positionId = ["GK", "LWB", "LCB", "CB", "RCB", "RWB", "LCM", "RCM", "LM", "RM", "ST"]
				var positionClass = ["formation gk", "formation df", 
					"formation df", "formation df", "formation df", "formation df", "formation mf", "formation mf",
					"formation mf", "formation mf", "formation fw"]
				changFormation(positionId, positionClass);
			}
			
			function Formation532() {
				
				var positionId = ["GK", "LWB", "LCB", "CB", "RCB", "RWB", "LCM", "CM", "RCM", "LS", "RS"]
				var positionClass = ["formation gk", "formation df", 
					"formation df", "formation df", "formation df", "formation df", "formation mf", "formation mf",
					"formation mf", "formation fw", "formation fw"]
				changFormation(positionId, positionClass);
				
			}
			
			function Formation523() {
				
				var positionId = ["GK", "LWB", "LCB", "CB", "RCB", "RWB", "LCM", "RCM", "LW", "RW", "ST"]
				var positionClass = ["formation gk", "formation df", 
					"formation df", "formation df", "formation df", "formation df", "formation mf", "formation mf",
					"formation fw", "formation fw", "formation fw"]
				changFormation(positionId, positionClass);
			}
			
			function Formation5212() {
				
				var positionId = ["GK", "LWB", "LCB", "CB", "RCB", "RWB", "LCM", "RCM", "CAM", "LS", "RS"]
				var positionClass = ["formation gk", "formation df", 
					"formation df", "formation df", "formation df", "formation df", "formation mf", "formation mf",
					"formation mf", "formation fw", "formation fw"]
				changFormation(positionId, positionClass);
				
			}
			
			function Formation51211() {
				
				var positionId = ["GK", "LWB", "LCB", "CB", "RCB", "RWB", "CDM", "LM", "RM", "CAM", "ST"]
				var positionClass = ["formation gk", "formation df", 
					"formation df", "formation df", "formation df", "formation df", "formation mf", "formation mf",
					"formation mf", "formation mf", "formation fw"]
				changFormation(positionId, positionClass);
				
			}	
			
			var formationFunction = {
					"3-4-3" : Formation343,
					"3-4-3(2)" : Formation343_2,
					"3-4-1-2" : Formation3412,
					"3-2-3-2" : Formation3232,
					"3-2-2-1-2" : Formation32212,
					"3-1-2-1-3" : Formation31213,
					"3-1-4-2" : Formation3142,
					"4-5-1" : Formation451,
					"4-4-2" : Formation442,
					"4-4-2(2)" : Formation442_2,
					"4-4-1-1" : Formation4411,
					"4-3-3" : Formation433,
					"4-3-3(2)" : Formation433_2,
					"4-3-2-1" : Formation4321,
					"4-3-1-2" : Formation4312,
					"4-2-4" : Formation424,
					"4-2-3-1" : Formation4231,
					"4-2-2-2" : Formation4222,
					"4-2-2-1-1" : Formation42211,
					"4-2-1-3" : Formation4213,
					"4-2-1-3(2)" : Formation4213_2,
					"4-1-4-1" : Formation4141,
					"4-1-3-2" : Formation4132,
					"4-1-2-3" : Formation4123,
					"4-1-2-3(2)" : Formation4123_2,
					"4-1-2-1-2" : Formation41212,
					"4-1-2-1-2(2)" : Formation41212_2,
					"5-4-1" : Formation541,
					"5-3-2" : Formation532,
					"5-2-3" : Formation523,
					"5-2-1-2" : Formation5212,
					"5-1-2-1-1" : Formation51211
				}
			
			var setPlayers = function() {
				$("#squadDiv span").each(function(index) {
					if(players_JSON[index].hasOwnProperty("name")){	
						console.log($(this).attr("id"));
						infoKeyPlayerOver($(this).attr("id"), players_JSON[index]);
						
					}
				})
			}
			
	$(function() {
		this.checkFormation = $("#selectPosition").val();
		var me = this;
		$("#selectPosition").click(function() {
				var selectPosition = $("#selectPosition").val();
				if(selectPosition != "포지션을 선택하세요." && selectPosition != "===============" && selectPosition != me.checkFormation && selectPosition != null){
					if(confirm("저장되지 않은 스쿼드는 초기화 될 수 있습니다. 변경하시겠습니까?") == true){
						me.checkFormation = selectPosition;
						var formation = formationFunction[selectPosition];
						formation();
						setPlayers();
						inputKeyPlayerNamdTag();
						inputKeyPlusButton();
						setAllPay();
						setPeopleNumber();
						setFormationValue();
					}else{						
						if(me.checkFormation != "==============="){
							$(this).val(me.checkFormation).prop("selected", true);
						}else{
							$(this).val("포지션을 선택하세요.").prop("selected", true);
						}
						
					}
			}
		})
	})
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
