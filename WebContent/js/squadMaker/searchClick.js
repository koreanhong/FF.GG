/**
 * 
 */


var selectPositionID;

	$(function() {
		make();
		var squad = $('.squadMakerSearch_div');
		
		$('.btn_search_detail').click(function () {
            if ($(this).hasClass('btn_search_detail active')) $(this).attr('class', 'btn_search_detail');
            else $(this).attr('class', 'btn_search_detail active');
        })
		
		var img;
		//선수검색 결과 마우스오버 이벤트
		$(document).on("mouseover", '.playerKeyPlusButton', function() {
			selectPositionID = $(this).parent().attr('id');
			if($(this).attr("src") != "images/playerPlus.png"){
				img = $(this).attr("src");
				$("#"+selectPositionID+ " .playerKeyPlusButton").attr("src", "images/playerDeleteButton.png").css({"left" : "10px", "top" : "10px"});
				$("#"+ selectPositionID + " #player_enhance").hide();
				$("#"+ selectPositionID + " #player_seasonImg").hide();
				$("#"+ selectPositionID + " #player_position").hide();
				$("#"+ selectPositionID + " #player_value").hide();
			}			
		})
		
		//선수검색 결과 마우스아웃 이벤트
		$(document).on("mouseout", '.playerKeyPlusButton', function() {
			selectPositionID = $(this).parent().attr('id');
			if($(this).attr("src") == "images/playerDeleteButton.png"){
				$("#"+selectPositionID+ " .playerKeyPlusButton").attr("src", img).css({"left" : "20px", "top" : "20px"});
				$("#"+ selectPositionID + " #player_enhance").show();
				$("#"+ selectPositionID + " #player_seasonImg").show();
				$("#"+ selectPositionID + " #player_position").show();
				$("#"+ selectPositionID + " #player_value").show();
			}			
		})
		
		//스쿼트메이커 포지션 클릭 이벤트
		$(document).on('click', '.playerKeyPlusButton', function() {
			selectPositionID = $(this).parent().attr('id');
			if($(this).attr("src") == "images/playerPlus.png"){
				squad.css("display", "inherit");
			}else{
				$("#"+ selectPositionID + " .playerKeyPlusButton").attr("src", "images/playerPlus.png").css({"left" : "10px", "top" : "10px"});
				$("#"+ selectPositionID + " .keyPlayer_name").text("");
				$("#"+ selectPositionID + " #player_seasonImg").remove();
				$("#"+ selectPositionID + " #player_position").remove();
				$("#"+ selectPositionID + " #player_value").remove();
				$("#"+ selectPositionID + " #player_enhance").remove();
				
				$("#squadDiv span").each(function(index) {
					if(selectPositionID == players_JSON[index].selectPositionID){
						players_JSON[index] = {};
					}
				})
				setAllPay();
				setPeopleNumber();
				setFormationValue();
			}
		})
		
		//밴치부터는 여기

		//선수검색폼 닫기 이벤트
		$(document).on('click', '#searchClose', function() {
			squad.css("display", "none");
		}) 
		
		//선수검색 초기화 버튼 클릭 이벤트
		$(".btn_reset").click(function() {
			$("#searchName").val("");
			$(".main").empty();
			make();
		})
		
		
	})
		
	//탭기능
	$(function() {
		var tabs = $("#searchResult").tabs();
		tabs.find(".ui-tabs-nav").sortable({
			axis : "x",
			stop : function() {
				tabs.tabs("refresh");
			}
		});
	});
	
	//초기화 버튼
	$(function() {
		$("#squadReset").click(function() {
			if(confirm("저장되지 않은 스쿼드는 초기화 될 수 있습니다. 변경하시겠습니까?")){
				location.reload(true);
			}
		})
		
	});
	
	
	//스쿼드 저장 
	$(function() {
		var me = this
		$("#storage_btn").click(function() {
			//임의 id값
//			var id = "admin"
			var squadName = $("#inputName").val();
			var squadFormation = me.checkFormation;
			
			
			var squadInfo = new Array();
			
			var playerNumber = 0;

			$.each(players_JSON, function(index) {
				if(typeof players_JSON[index].name != "undefined"){
					squadInfo.push(players_JSON[index]);
					playerNumber ++;
				}
			});
			
			if(playerNumber != 0){
				if(squadName != ""){
					var overJson = {
							"squad_name" : squadName,
							"squad_formation" : squadFormation,
							"squad_info" : squadInfo
					};
					$.ajax({
						url : "inputSquadMade.do",
						type : "post",
						data : JSON.stringify(overJson),
						dataType : "text" ,
						contentType : "application/json",
						success : function(data) {
							switch (data) {
							case "1":
								alert("저장되었습니다.")
								break;
							case "2":
								alert("최대 10개까지 저장가능합니다.")
								break;
							case "3":
								alert("이미 회원님이 사용중인 스쿼드 이름입니다. ")
								break;
							case "4":
								alert("로그인 후 이용해 주세요.")
								sessionStorage.setItem("ch", "1");
								var url = "SquadLoginForm.do";
								window.open(url, name,'scrollbars=no,width=600,height=850,status=no,resizable=no');
							}
						}
					});
				}else{
					alert("스쿼드 이름을 입력해주세요.")
				}
			}else{
				alert("최소 한명의 선수를 스쿼드에 등록하셔야 합니다.");
			};
			
		})
		
		
		
		
	})

	
	
	
	