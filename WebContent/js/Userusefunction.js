function MakeNickName(nickname) {
	var Level = getLevel(nickname);
	$('#div1').append(
					'<table id=nickTable>'
							+ '<tr id=nicktr1>'
							+ '<td id=nicktd11></td>'
							+ '<td id=nicktd12></td>'
							+ '</tr>'
							+
							'<tr id=nicktr2>'
							+ '<td id=nicktd21></td>'
							+ '<td id=nicktd22>'
							+ '</tr>'
							+ '</table>'
							+ '<img class=rounded-circle id=userimg>');

	$('#nickTable').css({
		"text-align" : "center",
		"width" : "70%",
		'margin' : 'auto',
		'top' : '30px',
		'position' : 'relative'
	})

	$('#nicktd11').text("ID : ");
	$('#nicktd21').text("Lv : ");

	$('#nicktd12').text(nickname);
	$('#nicktd22').text(Level);

}
function MakeDateChart(MatchInfo, nickname) {

	$('#div2').append('<table id=d2table>' +

	'<tr id=d2tr1>' + '</tr>' +

	'<tr id=d2tr2>' + '</tr>' +

	'</table>')

	$('#d2table').css({
		"border" : "1px solid black",
		"top" : "250px",
		"position" : "relative",
		'text-align' : 'center'
	})

	var left = 8;
	var color = ''
	for (var i = 0; i < 10; i++) {
		if (i % 2 == 0) {
			color = 'lightblue'
		} else {
			color = 'lightcoral'
		}
		$('#d2tr1').append('<td class=td id=Dtd1' + i + '></td>')

		$('#Dtd1' + i).css({
			"border" : "1px solid black",
			'width': '10%'
		})
		if (i < 5) {
			$('#d2tr2').append('<td class=td id=Dtd2' + i + ' ></td>')
		}
		$('#div2').append('<div id=chartDiv' + i + '>')
		$('#chartDiv' + i).css({
			"background-color" : color,
			"width" : "25px",
			"height" : "10px",
		})

		$('#chartDiv' + i).css({
			"position" : "absolute",
			"left" : left + "px",
			"top" : "150px"
		})
		left += 40
	}

	$('#Dtd20').attr("colspan", "2").css({
		"width" : "80px",
		"border" : "1px solid black"
	})
	$('#Dtd21').attr("colspan", "2").css({
		"width" : "80px",
		"border" : "1px solid black"
	})
	$('#Dtd22').attr("colspan", "2").css({
		"width" : "80px",
		"border" : "1px solid black"
	})
	$('#Dtd23').attr("colspan", "2").css({
		"width" : "80px",
		"border" : "1px solid black"
	})
	$('#Dtd24').attr("colspan", "2").css({
		"width" : "80px",
		"border" : "1px solid black"
	})
	
	var ADay = 0; // 모든 날짜
	var Allcount = 0;
	// 날짜 뽑는 변수
	DateList = [];
	var index = 0;
	var DateCount = 0;
	var count = 0;

	// 승 패 뽑는 변수
	var YYY = (MatchInfo[0].matchDate + "").substring(5, 7)
	var WinList = [];
	var LooseList = [];
	for (var i = 0; i <= 31; i++) { // 0으로 초기화
		WinList[i] = 0;
		LooseList[i] = 0;
	}

	var testcount = 0;
	var w = 0;
	var l = 0;
	var nicknum = 0;
	var WLcount = 0;

	for (var i = 0; i < MatchInfo.length; i++) {
		// /////////////////////////날짜 뽑는 중 //////////////////////////
		if (index < MatchInfo.length) {
			ADay = (MatchInfo[index].matchDate + "").substring(5, 10); // 모든 날짜
																		// 뽑기
		}

		testcount++;
		// 0번은 비교대상이 없으므로 그냥 넣어줌
		if (count <= MatchInfo.length) {

			if (DateList.length < 5) {
				if (i == 0) {
					DateList.push(ADay);
					$('#Dtd2' + i).text(ADay)
					count++;
				}
				if (i != 0) {
					if (DateList[i - 1] != ADay) {
						DateList.push(ADay);
						$('#Dtd2' + i).text(ADay)
						count++;
					} else {
						count++;
						i--;
					}
				}
				index++;
			} else {
				index++;
			}
		}

		// /////////////////////////승패 뽑는 중///////////////////////////
		if (index <= MatchInfo.length) {

			if (MatchInfo[Allcount].matchInfo[0].nickname == nickname) {
				nickNum = 0;
			} else {
				nickNum = 1;
			}
			var WL = MatchInfo[Allcount].matchInfo[nickNum].matchDetail.matchResult; // 승 패
																						// 여부

			// var Wldatee = MatchInfo[Allcount].matchDate

			var WLdate1 = parseInt(ADay.substring(0, 2)); // 달로 자른거
			var WLdate = parseInt(ADay.substring(3, 5)); // 일수 자른거

			if (Allcount < (MatchInfo.length - 1)) {
				Allcount++;
			}

			// alert(ADay + "에이대이 ," + testcount + "카운트 " + i +"i값")
			// testcount++;

			// alert(DateList[DateList.length - 1] + "데이트리스트")

			if (DateList[DateList.length - 1] == ADay) {

				if (WL == "승") {
					w++;
					WinList[WLdate] += 1; // 승일시 승 한 날짜 +1 시켜줌
				} else if (WL == "패") {
					l++;
					LooseList[WLdate] += 1; // 패일시 패 한 날짜 +1 시켜줌
				} else if (WL == null) {
					l++;
					LooseList[WLdate] += 1;
				}

			}
		}
	}

	var chartindex = 0;
	var height = 10;
	var win;
	var loose;
	EveryWin = 0;
	EveryLoose = 0;

	for (var i = 0; i < DateList.length; i++) {

		if (i < DateList.length) {

			var index1 = parseInt((DateList[i] + '').substring(3, 5)); // 날짜를
																		// 인덱스로

			win = WinList[index1] // 날짜에 맞는 승을 가져옴
			loose = LooseList[index1] // 날짜에 맞는 패를 가져옴

			EveryWin += parseInt(win);
			EveryLoose += parseInt(loose)

		}
		$('#Dtd1' + chartindex).text(win);
		$('#chartDiv' + chartindex).css({
			"top" : (240 - (win * 10)),
			"height" : (height + (win * 10))
		})
		chartindex++;
		$('#Dtd1' + chartindex).text(loose);
		$('#chartDiv' + chartindex).css({
			"top" : (240 - (loose * 10)),
			"height" : (height + (loose * 10))
		})
		chartindex++;

		win = 0;
		loose = 0;
	}
}

function MakekBestPlayer(MatchInfo, nickname) {
	   var jcount = 5; // for문 j값을 변수로 지정해줌 
	   
	   var TotalReturnList = {}; //return으로 넘겨줄 리스트
	   
	   var DefenderRatingList1 = new Array(); // 수비수 평점
	   var MidfielderRatingList1 = new Array(); // 미드필더 평점
	   var StrikerRatingList1 = new Array(); // 공격수 평점
	   
	   var DefenderRatingList2 = new Array(); // 수비수 아이디
	   var MidfielderRatingList2= new Array(); // 미드필더 평점
	   var StrikerRatingList2 = new Array(); // 공격수 평점
	   
	   var DefenderRatingList3 = new Array(); // 수비수 평점
	   var MidfielderRatingList3= new Array(); // 미드필더 평점
	   var StrikerRatingList3 = new Array(); // 공격수 평점
	   
	   
	   if(jcount >= MatchInfo.length){
	      jcount = MatchInfo.length
	   }
	   for (var j = 0; j < jcount; j++) {
	            
	      var spIdList = new Array(); // 선수아이디 
	      var SpPositionList = new Array(); // 포지션
	      var spRatingList = new Array(); // 평점
	      
	      if(j == MatchInfo.length){
	         break;
	      }
	      var nickNum = 0;
	      if (MatchInfo[j].matchInfo[0].nickname == nickname) {
	         nickNum = 0;
	      } else {
	         nickNum = 1;
	      }
	      if(MatchInfo[j].matchInfo[nickNum].player.length == 0){
	         jcount++;
	      }
	      else{
	      
	      for (var i = 0; i < 18; i++) {
	         if (MatchInfo[j].matchInfo[nickNum].player.length == 0) {
	            MatchCountt++;
	            continue;
	         }
	         else if (MatchInfo[j].matchInfo[nickNum].player[i].spPosition != 0) {
	            // 18명의 포지션을 넣어줌
	            SpPositionList
	                  .push(MatchInfo[j].matchInfo[nickNum].player[i].spPosition);
	            // 18명의 점수를 넣어줌
	            spRatingList
	                  .push(MatchInfo[j].matchInfo[nickNum].player[i].status.spRating);
	            // 18명의 아이디를 넣어줌
	            spIdList.push(MatchInfo[j].matchInfo[nickNum].player[i].spId);
	         }
	      }
	      
	      for (var i = 0; i < 18; i++) {
	         if (MatchInfo[j].matchInfo[nickNum].player.length == 0) {
	            continue;
	         }
	         var spPosition = SpPositionList[i]; //변수에 포지션값을 담음 

	         // 만약 수비수이면
	         if (spPosition == 1 || spPosition == 2 || spPosition == 3
	               || spPosition == 4 || spPosition == 5 || spPosition == 6
	               || spPosition == 7 || spPosition == 8) {

	            var Rating = spRatingList[i]; //변수에 i번쨰에 점수를 담음
	            var ID = spIdList[i]; //변수에 i번쨰 아이디를 담음
	            
	            //이렇게 하면 list1[0]에 값이랑 list[0]에 값이 서로 매칭이됨
	            DefenderRatingList1.push(Rating); //점수를 배열에 담음
	            DefenderRatingList2.push(ID); //아이디를 배열에 담음 

	         }
	         
	         // 만약 미드필더 라면(위게 작업과 같음)
	         if (spPosition == 9 || spPosition == 10 || spPosition == 11
	               || spPosition == 12 || spPosition == 13 || spPosition == 14
	               || spPosition == 15 || spPosition == 16 || spPosition == 17
	               || spPosition == 18 || spPosition == 19) {

	            var Rating = spRatingList[i];
	            var ID = spIdList[i];
	            MidfielderRatingList1.push(Rating);
	            MidfielderRatingList2.push(ID);
	         }
	         // 만약 공격수라면(위게 작업과 같음)
	         if (spPosition == 20 || spPosition == 21 || spPosition == 22
	               || spPosition == 23 || spPosition == 24 || spPosition == 25
	               || spPosition == 26 || spPosition == 27) {

	            var Rating = spRatingList[i];
	            var ID = spIdList[i];

	            StrikerRatingList1.push(Rating);
	            StrikerRatingList2.push(ID);
	         }

	      }
	      
	      var DR = DefenderRatingList1[0];
	      var MR = MidfielderRatingList1[0];
	      var SR = StrikerRatingList1[0];

	      for (var i = 0; i < DefenderRatingList1.length; i++) {
	         if (DR < DefenderRatingList1[i]) {
	            DR = DefenderRatingList1[i];
	         }
	      }
	   
	      for (var i = 0; i < MidfielderRatingList1.length; i++) {
	         if (MR < MidfielderRatingList1[i]) {
	            MR = MidfielderRatingList1[i];
	         }
	      }
	      for (var i = 0; i < StrikerRatingList1.length; i++) {
	         if (SR < StrikerRatingList1[i]) {
	            SR = StrikerRatingList1[i];
	         }
	      }
	      
	      DefenderRatingList3.push(DR)
	      MidfielderRatingList3.push(MR)
	      StrikerRatingList3.push(SR)
	      }
	   }
	   
	   var bestD2 = DefenderRatingList3[0]
	   var bestM2 = MidfielderRatingList3[0]
	   var bestS2 = StrikerRatingList3[0]


	   for (var i = 0; i < DefenderRatingList3.length; i++) {
	         if (bestD2 < DefenderRatingList3[i]) {
	            bestD2 = DefenderRatingList3[i];
	         }
	   }
	   for (var i = 0; i < MidfielderRatingList3.length; i++) {
	         if (bestM2 < MidfielderRatingList3[i]) {
	            bestM2 = MidfielderRatingList3[i];
	         }
	   }
	   for (var i = 0; i < StrikerRatingList3.length; i++) {
	         if (bestS2 < StrikerRatingList3[i]) {
	            bestS2 = StrikerRatingList3[i];
	         }
	   }
	   
	   
	   var DIndex1 = DefenderRatingList1.indexOf(bestD2);
	   var MIndex2= MidfielderRatingList1.indexOf(bestM2);
	   var SIndex3 = StrikerRatingList1.indexOf(bestS2);
	   
	   
	   var bestD2 = DefenderRatingList2[DIndex1]
	   var bestM2 = MidfielderRatingList2[MIndex2]
	   var bestS2 = StrikerRatingList2[SIndex3]
	   
	   TotalReturnList.seasonid1 = bestD2
	   TotalReturnList.seasonid2 = bestM2
	   TotalReturnList.seasonid3 = bestS2
	   
	   //이부분에서 시즌아이디 출력해서 리스트로 넣어줘서 리턴시켜주면 된다.
	   bestD2 += '';
	   bestM2 += '';
	   bestS2 += '';

	   
	   // 선수아이디 비교를 위해 앞부분 3잦리 자름
	   D_sub1 = bestD2.substring(0, 3);
	   M_sub1 = bestM2.substring(0, 3);
	   S_sub1 = bestS2.substring(0, 3);

	   // 101이 아닌애들은 잘라야지 나오고 .. 101인애들은 자르지말아야지 나옴
	   // 잘라진걸로 101이랑 비교후 101이 아니면 뒤에부분 다자름
	   if (D_sub1 != '101') {
	      bestD2 = bestD2.substring(3, 9);
	   }
	   if (M_sub1 != '101') {
	      bestM2 = bestM2.substring(3, 9);
	   }
	   if (S_sub1 != '101') {
	      bestS2 = bestS2.substring(3, 9);
	   }
	   TotalReturnList.pid1 = parseInt(bestD2)
	   TotalReturnList.pid2 = parseInt(bestM2)
	   TotalReturnList.pid3 = parseInt(bestS2)
	   
	   return TotalReturnList;
	}

function MakekBestPlayerDiv(MatchInfo, nickname) {
    var BP1 = MakekBestPlayer(MatchInfo, nickname); //MakekBestPlayer 리턴값을 변수에 담음 (json)타입
    var BestPlayerList =[]; // 베스트 플레이어 3명이 담긴 배열 선언
    var SeasonList = []; //플레이어에 시즌아이디가 담긴 배열 선언
    
    //베스트 플레이어를 배열에 담아줌
    BestPlayerList.push(BP1.pid1)
    BestPlayerList.push(BP1.pid2)
    BestPlayerList.push(BP1.pid3)
    //시즌아이디를 배열에 담아줌
    SeasonList.push(BP1.seasonid1)
    SeasonList.push(BP1.seasonid2)
    SeasonList.push(BP1.seasonid3)
    //베스트플레이어 spid를 --> 이름으로 바꿔주는 작업
    test = [];
    test = JSON.parse(getPlayerName(SeasonList));
   
    // 주요선수 div만들기
    $("#div3").append('<div id=main1>')
    $('#main1').html("주요선수").css({
		'border-bottom': '1px black solid'
	});
   
   var classId = {
    101 : "icon",
    201 : "NHD",
    202 : "tki",
    206 : "tb",
    207 : "tt",
    210 : "gr",
    211 : "19toty",
    212 : "18toty",
    213 : "MCICON",
    214 : "tc",
    215 : "19tots",
    216 : "hot",
    217 : "coc",
    218 : "OTW",
    295 : "K19",
    298 : "MCFC",
    300 : "LIVE",
    317 : "17",
    318 : "18",
    500 : "PLC",
    501 : "18PLS",
    502 : "19PLA"
 }
    var id = '' 
    var seasonId = '';
    var seasonURL ='';
    var top1 = 50; //css 탑값을 설정해줄 변수 for문 밖으로 선언해줘야함
    
    //시즌아이디를 넣어서 해당되는 시즌을 가져오는 for문
    for (var i = 1; i < 4; i++) {   
       
    var spid = SeasonList[i-1];
     if (spid >= 200000000) {
             id = spid % 1000000;
          } else {
             id = spid;
          }
     seasonId = Math.floor(spid / 1000000);
     var seasonURL = "http://s.nx.com/s2/game/fo4/obt/externalAssets/season/"
           + classId[seasonId] + ".png";
    ///////////////여기까지////////////////////
     
     var bestspi = SeasonList[i-1];
     var name = '';
     $.each(test, function(j, item) {
             if (test[j].id == bestspi) {
                name = test[j].name
                return false;
             }
       })
     
     //html을 만들어줌
       $("#div3").append(
      		 '<div id=sub' + i + '>' + '<font id=font' + i + '>' + '</font>' + 
                                  '<img id=simg'+ i + ' src='+seasonURL  + '>' + '</img>'+
                                  '<div id=nameDiv'+ i +'>'+ name + '</div>'+
             ' </div>'
                   + '<div id=Comment' + i + '>' +
                   '</div>')
       
       $('#font' + i).attr("size", "1");
       $('#Comment' + i).css({
			"left" : "100px",
			"position" : "absolute",
			"top" : top1 + "px"
		})
     
       top1 += 90; //탑값을 더해줌
       ///////////여기까지//////////////////
    }

    //선수에 대한 평가항목과 점수를 넣어줄 html을 만듬
    for (var i = 1; i < 4; i++) {
       $('#Comment' + i).append(
             '<table id=table' + i + '> ' + '<tr id=tr' + i + '1>'
                   + '<th id=th' + i + '01><th>' + '<th id=th' + i
                   + '02><th>' + '<th id=th' + i + '03><th>' + '<th id=th'
                   + i + '04><th>' + '</tr>' +

                   '<tr id=tr' + i + '2>' + '<th id=th' + i + '11><th>'
                   + '<th id=th' + i + '12><th>' + '<th id=th' + i
                   + '13><th>' + '<th id=th' + i + '14><th>' + '</tr>' +

                   '</table>');

       $('#table' + i).attr({
          "class" : "ComTable",
          "align" : "center",
       })

    }

    $('#font1').html("수비수")
    $('#font1').css({
		"position" : "absolute",
		'font-size' : '12px'
    })
    
    //여기서 시즌아이디 이미지를 css를 만져줌
    $('#simg1').css({
       "top" : "33px",
       "position" : "absolute"
    })

    $('#font2').html("미드필더")
    $('#font2').css({
		"position" : "absolute",
		'font-size' : '12px'
    })
    
    //여기서 시즌아이디 이미지를 css를 만져줌
     $('#simg2').css({
    	 "top" : "33px",
         "position" : "absolute"
    })

    $('#font3').html("공격수")
    $('#font3').css({
		"position" : "absolute",
		'font-size' : '12px'
    })
    //"여기임"
    //여기서 시즌아이디 이미지를 css를 만져줌
     $('#simg3').css({
		 "top" : "33px",
		 "position" : "absolute"
    })

    // 선수이미지를 넣어주는곳
    var top2 = 40; //이미지 탑값을 to2로 변수로 선언해줌
    for (var i = 0; i < 3; i++) {
       $('#div3').append('<img  id=img' + i + '>')
       $('#img' + i)
             .attr(
                   {
                      "src" : "https://fo4.dn.nexoncdn.co.kr/live/externalAssets/common/players/p"
                            + BestPlayerList[i] + ".png"
                   });
       $('#img' + i).css({
			"width" : "50px",
			"height" : "50px",
			"left" : "30px",
			"top" : top2 + "px",
			"position" : "absolute"
		});
       top2 += 90; //css 탑 값을 변경해줌
    }

    var D_Rating = 0; // 최고점수
    var D_dribble = 0;
    var D_tackle = 0;
    var D_block = 0;

    var M_Rating = 0
    var M_passTry = 0;
    var M_passSuccess = 0;
    var M_assist = 0;

    var S_Rating = 0;
    var S_shoot = 0;
    var S_effectshoot = 0;
    var S_goal = 0;

    var jjcount = 5;
    if(jjcount >= MatchInfo.length){
       jjcount = MatchInfo.length
    }
    for (var j = 0; j < jjcount; j++) {
       var nickNum = 0;
       if (MatchInfo[j].matchInfo[0].nickname == nickname) {
          nickNum = 0;
       } else {
          nickNum = 1;
       }
       for (var i = 0; i < 18; i++) {
          if (MatchInfo[j].matchInfo[nickNum].player.length == 0) {
             continue;
          }
          var PositionNum = MatchInfo[j].matchInfo[nickNum].player[i].spId
                + '';

          if (PositionNum.indexOf((BestPlayerList[0] + '')) != -1) { // 수비수이면
             var D_Rating_ = MatchInfo[j].matchInfo[nickNum].player[i].status.spRating // 최고
                                                                      // 점수
             var D_dribble_ = MatchInfo[j].matchInfo[nickNum].player[i].status.dribble
             var D_tackle_ = MatchInfo[j].matchInfo[nickNum].player[i].status.tackle
             var D_block_ = MatchInfo[j].matchInfo[nickNum].player[i].status.block
             if (D_Rating_ > D_Rating) {
                D_Rating = D_Rating_
             }
             if (D_dribble_ > D_dribble) {
                D_dribble = D_dribble_
             }
             if (D_tackle_ > D_tackle) {
                D_tackle = D_tackle_
             }
             if (D_block_ > D_block) {
                D_block = D_block
             }

          }

          if (PositionNum.indexOf((BestPlayerList[1] + '')) != -1) { // 미드필더 이면

             var M_passTry_ = MatchInfo[j].matchInfo[nickNum].player[i].status.passTry // 최고
                                                                      // 점수
             var M_passSuccess_ = MatchInfo[j].matchInfo[nickNum].player[i].status.passSuccess
             var M_assist_ = MatchInfo[j].matchInfo[nickNum].player[i].status.assist
             var M_Rating_ = MatchInfo[j].matchInfo[nickNum].player[i].status.spRating

             if (M_passTry_ > M_passTry) {
                M_passTry = M_passTry_
             }
             if (M_passSuccess_ > M_passSuccess) {
                M_passSuccess = M_passSuccess_
             }
             if (M_assist_ > M_assist) {
                M_assist = M_assist_
             }
             if (M_Rating_ > M_Rating) {
                M_Rating = M_Rating_
             }
          }

          if (PositionNum.indexOf((BestPlayerList[2] + '')) != -1) { // 공격수 이면
             var S_Rating_ = MatchInfo[j].matchInfo[nickNum].player[i].status.spRating
             var S_shoot_ = MatchInfo[j].matchInfo[nickNum].player[i].status.shoot
             var S_effectshoot_ = MatchInfo[j].matchInfo[nickNum].player[i].status.effectiveShoot
             var S_goal_ = MatchInfo[j].matchInfo[nickNum].player[i].status.goal // 최고
                                                                // 점수

             if (S_Rating_ > S_Rating) {
                S_Rating = S_Rating_
             }
             if (S_shoot_ > S_shoot) {
                S_shoot = S_shoot_
             }
             if (S_effectshoot_ > S_effectshoot) {
                S_effectshoot = S_effectshoot_
             }
             if (S_goal_ > S_goal) {
                S_goal = S_goal_
             }
          }

       }
    }
    //여기서 각 항목별 점수를 넣어주는 for문
    for (var i = 1; i < 4; i++) {

       if (i = 1) {
          $('#th' + i + '11').text(D_Rating);
          $('#th' + i + '12').text(D_dribble);
          $('#th' + i + '13').text(D_tackle);
          $('#th' + i + '14').text(D_block);
       }
       if (i = 2) {
          $('#th' + i + '11').text(M_Rating);
          $('#th' + i + '12').text(M_passSuccess);
          $('#th' + i + '13').text(M_assist);
          $('#th' + i + '14').text(M_passTry);
       }
       if (i = 3) {
          $('#th' + i + '11').text(S_Rating);
          $('#th' + i + '12').text(S_shoot);
          $('#th' + i + '13').text(S_effectshoot);
          $('#th' + i + '14').text(S_goal);
       }

    }
    //항목이름을 넣어주는 곳
    $('#th101').text("평점");
    $('#th102').text("드리블");
    $('#th103').text("태클");
    $('#th104').text("차단");

    $('#th201').text("평점");
    $('#th202').text("패스성공");
    $('#th203').text("도움");
    $('#th204').text("패스시도");

    $('#th301').text("평점");
    $('#th302').text("슈팅");
    $('#th303').text("유효슈팅");
    $('#th304').text("골");

 }

function makeDivision(MatchInfo, nickname) {
	var divisionnum = getDivisionnum(nickname);

	var img = getgradeImg(divisionnum);
	$('#userimg')
		.attr("src", img)
		.css({
			'width': '200px',
			'height' : '200px'
		});

	var division = getDivision(divisionnum)
	$('#div4').append("<table id=table41 class=Divitable>");
	for (var i = 1; i < 4; i++) {

		$('#table41').append(
				'<tr id=tr4' + i + '>' + '<td id=td40' + i + '>'
						+ '<td id=td41' + i + '>' + '</tr>');
		$('#table41').css({
			"text-align" : "right",
			"border" : "3",
			"height" : "30px",
			"border" : "1px solid black",
			"width" : "300px"
		})
		$('#tr4' + i).css({
			"width" : "250px",
			"height" : "5px",
		    'border-bottom': '1px solid',
		    'text-align': 'center'
		})
	}

	$('#td401').css({
		"width" : "100px",
		"height" : "2px",

	})
	$('#td411').css({
		"width" : "100px",
		"height" : "2px",
	})

	$('#td401').text("역대최고등급");
	$('#td402').text("최근 전적")
	$('#td403').text("포메이션")

	$('#td411').text(division);
	$('#td412').text(EveryWin + "승" + EveryLoose + "패")
	EveryWin = 0;
	EveryLoose = 0;
	$('#td413').text("111")

}

function MakeFormation(MatchInfo, nickname) {
	$('#div4').append(
			'<div id=podiv>' + '<img src=../images/stadium1.jpg id=room>'
					+ ' </div>')
	$('#room').css({
		"width" : "300px",
		"height" : "215px",
		"position" : "absolute"
	})
	$('#podiv').css({
		"width" : "300px",
		"height" : "215px",
		"position" : "absolute",
		"z-index" : "1"
	})

	var nickNum = 0;
	// 일단 한경기만 뽑아볼 거기 떄문에 MathInfo에 인덱스를 0으로 줌

	if (MatchInfo[0].matchInfo[0].nickname == nickname) {
		nickNum = 0;

	} else {
		nickNum = 1;

	}
	var counttt = 0
	var PositionList = [];
	var SpidList = [];

	var Defender = 0; // 수비전부
	var Midfielder1 = 0; // CDM LDM RDM
	var Midfielder2 = 0; // CM LM RM
	var Midfielder3 = 0; // CAM LAM RAM
	var Striker = 0;

	var MatchCount = 0;
	for (var i = 0; i < 18; i++) {
		if (MatchInfo[MatchCount].matchInfo[nickNum].player.length == 0) {
			i--;
			MatchCount++;
			continue;
		}
		var Positest = MatchInfo[MatchCount].matchInfo[nickNum].player[i].spPosition;
		var Spidtest
		// 101이 아닌애들은 잘라야지 나오고 .. 101인애들은 자르지말아야지 나옴
		// 잘라진걸로 101이랑 비교후 101이 아니면 뒤에부분 다자름
		var idtest = (MatchInfo[MatchCount].matchInfo[nickNum].player[i].spId + "")
				.substring(0, 3) // 207000240
		if (idtest == '101') {
			Spidtest = parseInt(MatchInfo[MatchCount].matchInfo[nickNum].player[i].spId);
		} else {
			Spidtest = parseInt((MatchInfo[MatchCount].matchInfo[nickNum].player[i].spId + "")
					.substring(3, 9))
		}

		if (Positest == 0) { // GK
			PositionList.push(Positest);
			SpidList.push(Spidtest)
			$('#podiv').append('<img  id=Pimg' + i + '>')
			$('#Pimg' + i)
					.attr(
							{
								"src" : "https://fo4.dn.nexoncdn.co.kr/live/externalAssets/common/players/p"
										+ Spidtest + ".png",
							});

			$('#Pimg' + i).css({
				"width" : "30px",
				"height" : "30px",
				"left" : "2px",
				"top" : "90px",
				"position" : "absolute"
			})
			counttt++;
		}
		if (Positest == 1) { // SW
			Defender++;
			PositionList.push(Positest);
			SpidList.push(Spidtest)
			$('#podiv').append('<img  id=Pimg' + i + '>')// SW
			$('#Pimg' + i)
					.attr(
							{
								"src" : "https://fo4.dn.nexoncdn.co.kr/live/externalAssets/common/players/p"
										+ Spidtest + ".png",
							});

			$('#Pimg' + i).css({
				"width" : "30px",
				"height" : "30px",
				"left" : "30px",
				"top" : "90px",
				"position" : "absolute"
			})

			counttt++;
		}
		if (Positest == 2) { // RWB
			Defender++;
			PositionList.push(Positest);
			SpidList.push(Spidtest)
			$('#podiv').append('<img  id=Pimg' + i + '>')// RWB
			$('#Pimg' + i)
					.attr(
							{
								"src" : "https://fo4.dn.nexoncdn.co.kr/live/externalAssets/common/players/p"
										+ Spidtest + ".png",
							});

			$('#Pimg' + i).css({
				"width" : "30px",
				"height" : "30px",
				"left" : "80px",
				"top" : "180px",
				"position" : "absolute"
			})
			counttt++;
		}
		if (Positest == 3) { // RB
			Defender++;
			PositionList.push(Positest);
			SpidList.push(Spidtest)
			$('#podiv').append('<img  id=Pimg' + i + '>')// RB
			$('#Pimg' + i)
					.attr(
							{
								"src" : "https://fo4.dn.nexoncdn.co.kr/live/externalAssets/common/players/p"
										+ Spidtest + ".png",
							});

			$('#Pimg' + i).css({
				"width" : "30px",
				"height" : "30px",
				"left" : "70px",
				"top" : "150px",
				"position" : "absolute"
			})
			counttt++;
		}
		if (Positest == 4) { // RCB
			Defender++;
			PositionList.push(Positest);
			SpidList.push(Spidtest)
			$('#podiv').append('<img  id=Pimg' + i + '>')// RCB
			$('#Pimg' + i)
					.attr(
							{
								"src" : "https://fo4.dn.nexoncdn.co.kr/live/externalAssets/common/players/p"
										+ Spidtest + ".png",
							});

			$('#Pimg' + i).css({
				"width" : "30px",
				"height" : "30px",
				"left" : "60px",
				"top" : "120px",
				"position" : "absolute"
			})
			counttt++;
		}
		if (Positest == 5) { // CB
			Defender++;
			PositionList.push(Positest);
			SpidList.push(Spidtest)
			$('#podiv').append('<img  id=Pimg' + i + '>')// CB
			$('#Pimg' + i)
					.attr(
							{
								"src" : "https://fo4.dn.nexoncdn.co.kr/live/externalAssets/common/players/p"
										+ Spidtest + ".png",
							});

			$('#Pimg' + i).css({
				"width" : "30px",
				"height" : "30px",
				"left" : "60px",
				"top" : "90px",
				"position" : "absolute"
			})
			counttt++;
		}
		if (Positest == 6) { // LCB
			Defender++;
			PositionList.push(Positest);
			SpidList.push(Spidtest)
			$('#podiv').append('<img  id=Pimg' + i + '>')// LCB
			$('#Pimg' + i)
					.attr(
							{
								"src" : "https://fo4.dn.nexoncdn.co.kr/live/externalAssets/common/players/p"
										+ Spidtest + ".png",
							});

			$('#Pimg' + i).css({
				"width" : "30px",
				"height" : "30px",
				"left" : "60px",
				"top" : "60px",
				"position" : "absolute"
			})
			counttt++;
		}
		if (Positest == 7) { // LB
			Defender++;
			PositionList.push(Positest);
			SpidList.push(Spidtest)
			$('#podiv').append('<img  id=Pimg' + i + '>')// LB
			$('#Pimg' + i)
					.attr(
							{
								"src" : "https://fo4.dn.nexoncdn.co.kr/live/externalAssets/common/players/p"
										+ Spidtest + ".png",
							});

			$('#Pimg' + i).css({
				"width" : "30px",
				"height" : "30px",
				"left" : "70px",
				"top" : "30px",
				"position" : "absolute"
			})
			counttt++;
		}
		if (Positest == 8) { // LWB
			Defender++;
			PositionList.push(Positest);
			SpidList.push(Spidtest)
			$('#podiv').append('<img  id=Pimg' + i + '>')// LWB
			$('#Pimg' + i)
					.attr(
							{
								"src" : "https://fo4.dn.nexoncdn.co.kr/live/externalAssets/common/players/p"
										+ Spidtest + ".png",
							});

			$('#Pimg' + i).css({
				"width" : "30px",
				"height" : "30px",
				"left" : "80px",
				"position" : "absolute"
			})
			counttt++;
		}
		if (Positest == 9) { // RDM
			Midfielder1++;
			PositionList.push(Positest);
			SpidList.push(Spidtest)
			$('#podiv').append('<img  id=Pimg' + i + '>')// RDM
			$('#Pimg' + i)
					.attr(
							{
								"src" : "https://fo4.dn.nexoncdn.co.kr/live/externalAssets/common/players/p"
										+ Spidtest + ".png",
							});

			$('#Pimg' + i).css({
				"width" : "30px",
				"height" : "30px",
				"left" : "100px",
				"top" : "120px",
				"position" : "absolute"
			})
			counttt++;
		}
		if (Positest == 10) { // CDM
			Midfielder1++;
			PositionList.push(Positest);
			SpidList.push(Spidtest)
			$('#podiv').append('<img  id=Pimg' + i + '>')// CDM
			$('#Pimg' + i)
					.attr(
							{
								"src" : "https://fo4.dn.nexoncdn.co.kr/live/externalAssets/common/players/p"
										+ Spidtest + ".png",
							});

			$('#Pimg' + i).css({
				"width" : "30px",
				"height" : "30px",
				"left" : "100px",
				"top" : "90px",
				"position" : "absolute"
			})
			counttt++;
		}
		if (Positest == 11) { // LDM
			Midfielder1++;
			PositionList.push(Positest);
			SpidList.push(Spidtest)
			$('#podiv').append('<img  id=Pimg' + i + '>')// LDM
			$('#Pimg' + i)
					.attr(
							{
								"src" : "https://fo4.dn.nexoncdn.co.kr/live/externalAssets/common/players/p"
										+ Spidtest + ".png",
							});

			$('#Pimg' + i).css({
				"width" : "30px",
				"height" : "30px",
				"left" : "100px",
				"top" : "60px",
				"position" : "absolute"
			})
			counttt++;
		}
		if (Positest == 12) { // RM
			Midfielder2++;
			PositionList.push(Positest);
			SpidList.push(Spidtest)
			$('#podiv').append('<img  id=Pimg' + i + '>')// RM
			$('#Pimg' + i)
					.attr(
							{
								"src" : "https://fo4.dn.nexoncdn.co.kr/live/externalAssets/common/players/p"
										+ Spidtest + ".png",
							});

			$('#Pimg' + i).css({
				"width" : "30px",
				"height" : "30px",
				"left" : "150px",
				"top" : "180px",
				"position" : "absolute"
			})
			counttt++;
		}
		if (Positest == 13) { // RCM
			Midfielder2++;
			PositionList.push(Positest);
			SpidList.push(Spidtest)
			$('#podiv').append('<img  id=Pimg' + i + '>')// RCM
			$('#Pimg' + i)
					.attr(
							{
								"src" : "https://fo4.dn.nexoncdn.co.kr/live/externalAssets/common/players/p"
										+ Spidtest + ".png",
							});

			$('#Pimg' + i).css({
				"width" : "30px",
				"height" : "30px",
				"left" : "140px",
				"top" : "120px",
				"position" : "absolute"
			})
			counttt++;
		}
		if (Positest == 14) { // CM
			Midfielder2++;
			PositionList.push(Positest);
			SpidList.push(Spidtest)
			$('#podiv').append('<img  id=Pimg' + i + '>')// CM
			$('#Pimg' + i)
					.attr(
							{
								"src" : "https://fo4.dn.nexoncdn.co.kr/live/externalAssets/common/players/p"
										+ Spidtest + ".png",
							});

			$('#Pimg' + i).css({
				"width" : "30px",
				"height" : "30px",
				"left" : "140px",
				"top" : "90px",
				"position" : "absolute"
			})
			counttt++;
		}
		if (Positest == 15) { // LCM
			Midfielder2++;
			PositionList.push(Positest);
			SpidList.push(Spidtest)
			$('#podiv').append('<img  id=Pimg' + i + '>')// LCM
			$('#Pimg' + i)
					.attr(
							{
								"src" : "https://fo4.dn.nexoncdn.co.kr/live/externalAssets/common/players/p"
										+ Spidtest + ".png",
							});

			$('#Pimg' + i).css({
				"width" : "30px",
				"height" : "30px",
				"left" : "140px",
				"top" : "60px",
				"position" : "absolute"
			})
			counttt++;
		}
		if (Positest == 16) { // LM
			Midfielder2++;
			PositionList.push(Positest);
			SpidList.push(Spidtest)
			$('#podiv').append('<img  id=Pimg' + i + '>')// LM
			$('#Pimg' + i)
					.attr(
							{
								"src" : "https://fo4.dn.nexoncdn.co.kr/live/externalAssets/common/players/p"
										+ Spidtest + ".png",
							});

			$('#Pimg' + i).css({
				"width" : "30px",
				"height" : "30px",
				"left" : "150px",
				"position" : "absolute"
			})
			counttt++;
		}
		if (Positest == 17) { // RAM
			Midfielder3++;
			PositionList.push(Positest);
			SpidList.push(Spidtest)
			$('#podiv').append('<img  id=Pimg' + i + '>')// RAM
			$('#Pimg' + i)
					.attr(
							{
								"src" : "https://fo4.dn.nexoncdn.co.kr/live/externalAssets/common/players/p"
										+ Spidtest + ".png",
							});

			$('#Pimg' + i).css({
				"width" : "30px",
				"height" : "30px",
				"left" : "180px",
				"top" : "130px",
				"position" : "absolute"
			})
			counttt++;
		}
		if (Positest == 18) { // CAM
			Midfielder3++;
			PositionList.push(Positest);
			SpidList.push(Spidtest)
			$('#podiv').append('<img  id=Pimg' + i + '>')// CAM
			$('#Pimg' + i)
					.attr(
							{
								"src" : "https://fo4.dn.nexoncdn.co.kr/live/externalAssets/common/players/p"
										+ Spidtest + ".png",
							});

			$('#Pimg' + i).css({
				"width" : "30px",
				"height" : "30px",
				"left" : "180px",
				"top" : "90px",
				"position" : "absolute"
			})
			counttt++;
		}
		if (Positest == 19) { // LAM
			Midfielder3++;
			PositionList.push(Positest);
			SpidList.push(Spidtest)
			$('#podiv').append('<img  id=Pimg' + i + '>')// LAM
			$('#Pimg' + i)
					.attr(
							{
								"src" : "https://fo4.dn.nexoncdn.co.kr/live/externalAssets/common/players/p"
										+ Spidtest + ".png",
							});

			$('#Pimg' + i).css({
				"width" : "30px",
				"height" : "30px",
				"left" : "180px",
				"top" : "50px",
				"position" : "absolute"
			})
			counttt++;
		}
		if (Positest == 20) { // RF
			Striker++;
			PositionList.push(Positest);
			SpidList.push(Spidtest)
			$('#podiv').append('<img  id=Pimg' + i + '>')// RF
			$('#Pimg' + i)
					.attr(
							{
								"src" : "https://fo4.dn.nexoncdn.co.kr/live/externalAssets/common/players/p"
										+ Spidtest + ".png",
							});

			$('#Pimg' + i).css({
				"width" : "30px",
				"height" : "30px",
				"left" : "210px",
				"top" : "130px",
				"position" : "absolute"
			})
			counttt++;
		}
		if (Positest == 21) { // CF
			Striker++;
			PositionList.push(Positest);
			SpidList.push(Spidtest)
			$('#podiv').append('<img  id=Pimg' + i + '>')// CF
			$('#Pimg' + i)
					.attr(
							{
								"src" : "https://fo4.dn.nexoncdn.co.kr/live/externalAssets/common/players/p"
										+ Spidtest + ".png",
							});

			$('#Pimg' + i).css({
				"width" : "30px",
				"height" : "30px",
				"left" : "210px",
				"top" : "90px",
				"position" : "absolute"
			})
			counttt++;
		}
		if (Positest == 22) { // LF
			Striker++;
			PositionList.push(Positest);
			SpidList.push(Spidtest)
			$('#podiv').append('<img  id=Pimg' + i + '>')// LW
			$('#Pimg' + i)
					.attr(
							{
								"src" : "https://fo4.dn.nexoncdn.co.kr/live/externalAssets/common/players/p"
										+ Spidtest + ".png",
							});

			$('#Pimg' + i).css({
				"width" : "30px",
				"height" : "30px",
				"left" : "210px",
				"position" : "absolute"
			})
			counttt++;
		}
		if (Positest == 23) { // RW
			Striker++;
			PositionList.push(Positest);
			SpidList.push(Spidtest)
			$('#podiv').append('<img  id=Pimg' + i + '>')// RW
			$('#Pimg' + i)
					.attr(
							{
								"src" : "https://fo4.dn.nexoncdn.co.kr/live/externalAssets/common/players/p"
										+ Spidtest + ".png",
							});

			$('#Pimg' + i).css({
				"width" : "30px",
				"height" : "30px",
				"left" : "210px",
				"top" : "180px",
				"position" : "absolute"
			})
			counttt++;
		}
		if (Positest == 24) { // RS
			Striker++;
			PositionList.push(Positest);
			SpidList.push(Spidtest)
			$('#podiv').append('<img  id=Pimg' + i + '>')// RS
			$('#Pimg' + i)
					.attr(
							{
								"src" : "https://fo4.dn.nexoncdn.co.kr/live/externalAssets/common/players/p"
										+ Spidtest + ".png",
							});

			$('#Pimg' + i).css({
				"width" : "30px",
				"height" : "30px",
				"left" : "240px",
				"top" : "130px",
				"position" : "absolute"
			})
			counttt++;
		}
		if (Positest == 25) { // ST
			Striker++;
			PositionList.push(Positest);
			SpidList.push(Spidtest)
			$('#podiv').append('<img  id=Pimg' + i + '>')// ST
			$('#Pimg' + i)
					.attr(
							{
								"src" : "https://fo4.dn.nexoncdn.co.kr/live/externalAssets/common/players/p"
										+ Spidtest + ".png",
							});

			$('#Pimg' + i).css({
				"width" : "30px",
				"height" : "30px",
				"left" : "240px",
				"top" : "90px",
				"position" : "absolute"
			})
			counttt++;
		}
		if (Positest == 26) { // LS
			Striker++;
			PositionList.push(Positest);
			SpidList.push(Spidtest)
			$('#podiv').append('<img  id=Pimg' + i + '>')// LS
			$('#Pimg' + i)
					.attr(
							{
								"src" : "https://fo4.dn.nexoncdn.co.kr/live/externalAssets/common/players/p"
										+ Spidtest + ".png",
							});

			$('#Pimg' + i).css({
				"width" : "30px",
				"height" : "30px",
				"left" : "240px",
				"top" : "50px",
				"position" : "absolute"
			})
			counttt++;
		}
		if (Positest == 27) { // LW
			Striker++;
			PositionList.push(Positest);
			SpidList.push(Spidtest)
			$('#podiv').append('<img  id=Pimg' + i + '>')// LW
			$('#Pimg' + i)
					.attr(
							{
								"src" : "https://fo4.dn.nexoncdn.co.kr/live/externalAssets/common/players/p"
										+ Spidtest + ".png",
							});

			$('#Pimg' + i).css({
				"width" : "30px",
				"height" : "30px",
				"left" : "210px",
				"position" : "absolute"
			})
			counttt++;
		}

	}

	InDefender = parseInt(Defender);
	InMidfielder1 = parseInt(Midfielder1);
	InMidfielder2 = parseInt(Midfielder2);
	InMidfielder3 = parseInt(Midfielder3);
	Instriker = parseInt(Striker)

	var foma = ""

	if (InDefender != 0) {
		foma += InDefender + "-";
	}
	if (InMidfielder1 != 0) {
		foma += InMidfielder1 + "-"
	}
	if (InMidfielder2 != 0) {
		foma += InMidfielder2 + "-"
	}
	if (InMidfielder3 != 0) {
		foma += InMidfielder3 + "-"
	}
	if (Instriker != 0) {
		foma += Instriker + "-"
	}
	foma = foma.substring(0, foma.length - 1)

	$('#td413').text(foma)

	// 날짜계산 다시하기
	// 첫판 강제종료 해결하기

}
// ===================================================================================================찬규
function infodivform(index) {
	var text = '<div class=content id='
			+ index
			+ '><br>'
			+ '<table class=infotab id=tab'
			+ index
			+ '>'
			+ '<tr id=name'
			+ index
			+ '>'
			+ '<td class=tw colspan=2 id=nametd1-'
			+ index
			+ '></td>'
			+ '<td class=one id=nametd2-'
			+ index
			+ '></td>'
			+ '<td class=tw colspan=2></td>'
			+ '<td class=tw colspan=5 id=nametd3-'
			+ index
			+ '></td>'
			+ '<td class=one></td>'
			+ '<td class=one></td>'
			+ '<td class=one id=nametd4-'
			+ index
			+ '></td>'
			+ '<td class=tw colspan=2 id=nametd5-'
			+ index
			+ '></td>'
			+ '</tr>'
			+ '<tr id=grade'
			+ index
			+ '>'
			+ '<td class=tw colspan=2 rowspan=3 id=gradetd1-'
			+ index
			+ '><img id=gradeimg1-'
			+ index
			+ ' class=rounded-circle alt=Cinque Terre></td>'
			+ '<td class=one>최고등급</td>'
			+ '<td class=tw colspan=2 id=gradetd2-'
			+ index
			+ '></td>'
			+ '<td class=twre colspan=2 id=gradetd3-'
			+ index
			+ '></td>'
			+ '<td class=one></td><td class=twre colspan=2 id=gradetd4-'
			+ index
			+ '></td>'
			+ '<td class=one>최고등급</td>'
			+ '<td class=tw colspan=2 id=gradetd5-'
			+ index
			+ '></td>'
			+ '<td class=tw colspan=2 rowspan=3 id=gradetd6-'
			+ index
			+ '><img id=gradeimg2-'
			+ index
			+ ' class=rounded-circle alt=Cinque Terre></td>'
			+ '</tr>'
			+ '<tr id=form'
			+ index
			+ '>'
			+ '<td class=one>포메이션</td>'
			+ '<td class=tw colspan=2 id=form1-'
			+ index
			+ '></td>'
			+ '<td class=tw colspan=2></td>'
			+ '<td class=one></td>'
			+ '<td class=tw colspan=2></td>'
			+ '<td class=one>포메이션</td>'
			+ '<td class=tw colspan=2 id=form2-'
			+ index
			+ '></td>'
			+ '</tr>'
			+ '<tr id=curr'
			+ index
			+ '>'
			+ '<td class=one>최근전적</td>'
			+ '<td class=tws colspan=2 id=currtd1-'
			+ index
			+ '></td>'
			+ '<td class=twsc colspan=2 id=currtd2-'
			+ index
			+ '></td>'
			+ '<td class=one></td>'
			+ '<td class=twsc colspan=2 id=currtd3-'
			+ index
			+ '></td>'
			+ '<td class=one>최근전적</td>'
			+ '<td class=tws colspan=2 id=currtd4-'
			+ index
			+ '></td></tr>'
			+ '<tr id=blank'
			+ index
			+ '>'
			+ '<td class=tw colspan=2></td>'
			+ '<td class=one></td>'
			+ '<td class=one colspan=2></td>'
			+ '<td class=twre colspan=2></td>'
			+ '<td class=one></td>'
			+ '<td class=twre colspan=2></td>'
			+ '<td class=one></td>'
			+ '<td class=one colspan=2></td>'
			+ '<td class=one></td>'
			+ '<td class="fas fa-angle-double-down one" style="font-size:36px; cursor: pointer; " id=btn'
			+ index
			+ '></td>'
			+ '</tr>'
			+ '</table>'
			+ '<div id=detaildiv'
			+ index
			+ ' class=detaildiv>'
			+ '<ul class=tabs id=ul'
			+ index
			+ '>'
			+ '<li class=tab-squad id=squad'
			+ index
			+ ' data-tab=tab'
			+ index
			+ '-1>스쿼드</li>'
			+ '<li class=tab-divide style=background-color:black; id=divi'
			+ index
			+ ' data-tab=tab'
			+ index
			+ '-1>분리</li>'
			+ '<li class=tab-total id=total'
			+ index
			+ ' data-tab=tab'
			+ index
			+ '-2>통계</li></ul>'
			+ '<div id=tab'
			+ index
			+ '-1 class=tab-content-current>'
			+ '<div class=mysq id=mysq'
			+ index
			+ '>'
			+ '<div class=G id=mG'
			+ index
			+ '></div><div class=dd></div>'
			+ '<div class=D id=mD'
			+ index
			+ '></div><div class=dd></div>'
			+ '<div class=M id=mM'
			+ index
			+ '></div><div class=dd></div>'
			+ '<div class=A id=mA'
			+ index
			+ '></div>'
			+ '</div>'
			+ '<div class=divide id=divide'
			+ index
			+ '></div>'
			+ '<div class=yoursq id=yoursq'
			+ index
			+ '>'
			+ '<div class=A id=yA'
			+ index
			+ '></div><div class=dd></div>'
			+ '<div class=M id=yM'
			+ index
			+ '></div><div class=dd></div>'
			+ '<div class=D id=yD'
			+ index
			+ '></div><div class=dd></div>'
			+ '<div class=G id=yG'
			+ index
			+ '></div>'
			+ '</div>'
			+ '</div>'
			+ '<div id=tab'
			+ index
			+ '-2 class=tab-content>'
			+ '<table border=1 style=text-align:center class=totaltab id=totaltab'
			+ index + '>' + '<tr id=nick' + index + '>'
			+ '<td class=tdd id=nick1-' + index + '></td>'
			+ '<th class=tdd>닉네임</th>' + '<td class=tdd id=nick2-' + index
			+ '></td>' + '</tr>' + '<tr id=shoot' + index + '>'
			+ '<td class=tdd id=shoot1-' + index + '></td>'
			+ '<th class=tdd>슈팅</th>' + '<td class=tdd id=shoot2-' + index
			+ '></td>' + '</tr>' + '<tr id=efshoot' + index + '>'
			+ '<td class=tdd id=efshoot1-' + index + '></td>'
			+ '<th class=tdd>유효슈팅</th>' + '<td class=tdd id=efshoot2-' + index
			+ '></td>' + '</tr>' + '<tr id=foul' + index + '>'
			+ '<td clss=tdd id=foul1-' + index + '></td>'
			+ '<th class=tdd>파울</th>' + '<td class=tdd id=foul2-' + index
			+ '></td>' + '</tr>' + '<tr id=yc' + index + '>'
			+ '<td class=tdd id=yc1-' + index + '></td>'
			+ '<th class=tdd>옐로카드</th>' + '<td class=tdd id=yc2-' + index
			+ '></td>' + '</tr>' + '<tr id=rc' + index + '>'
			+ '<td class=tdd id=rc1-' + index + '></td>'
			+ '<th class=tdd>레드카드</th>' + '<td class=tdd id=rc2-' + index
			+ '></td>' + '</tr>' + '<tr id=corner' + index + '>'
			+ '<td class=tdd id=corner1-' + index + '></td>'
			+ '<th class=tdd>코너킥</th>' + '<td class=tdd id=corner2-' + index
			+ '></td>' + '</tr>' + '<tr id=possession' + index + '>'
			+ '<td class=tdd id=possession1-' + index + '></td>'
			+ '<th class=tdd>점유율</th>' + '<td class=tdd id=possession2-'
			+ index + '></td>' + '</tr>' + '</table>' + '</div>' + '</div>'
			+ '</div>';
	return text;
}
function getwinlose(youArray, nickname) { // 해당 경기data와 nickname을 가지고 최근 10경기
	// 전적 뽑음
	var win = 0;
	var lose = 0;
	var draw = 0;
	var index = 0;
	for (var i = 0; i < youArray.length; i++) {

		if (youArray[i].matchInfo[0].nickname == nickname)// 0번째와 해당 nick이 같은
			// 경우
			index = 0;
		else
			// 1번index와 같은 경우
			index = 1;

		if (youArray[i].matchInfo[index].matchDetail.matchResult == "승")
			win++;
		else if (youArray[i].matchInfo[index].matchDetail.matchResult == "무")
			draw++;
		else
			lose++;
	}
	var msg = win + "승 " + draw + "무" + lose + "패";
	return msg;
}

function makeinfotab(datalist, me, you,nickname) { // 정보 tab만드는 함수
	var date = datalist[index - 1].matchDate;
	date = date.substring(0, 16);
	date = date.replace("T", " "); // 경기의 날짜

	var mylevel = getLevel(datalist[index - 1].matchInfo[me].nickname); // 나의 레벨
	var yourlevel = getLevel(datalist[index - 1].matchInfo[you].nickname); // 상대방
																			// 레벨

	// 나와 상대 최고 등급,이미지 가져오기
	var mydivisionnum = getDivisionnum(datalist[index - 1].matchInfo[me].nickname);
	var mydivision = getDivision(mydivisionnum);
	var myimg = getgradeImg(mydivisionnum);
	var yourdivisionnum = getDivisionnum(datalist[index - 1].matchInfo[you].nickname);
	var yourdivision = getDivision(yourdivisionnum);
	var yourimg = getgradeImg(yourdivisionnum);

	// 나의 최근 전적
	var myArray = new Array;
	var length = 0;
	if (datalist.length < 10)
		length = datalist.length;
	else
		length = 10;
	for (var j = 0; j < length; j++) { // 10경기의 data를 가지고 winlose뽑아옴
		myArray.push(datalist[j]);
	}
	var mywinlose = getwinlose(myArray,
			datalist[index - 1].matchInfo[me].nickname);

	// 상대 최근 전적 정보 받아오기
	var yourArray = new Array;
	yourArray = getInfo(datalist[index - 1].matchInfo[you].nickname, 10); // 10경기에
																			// 대한
																			// 정보를
																			// 가져옴
	var yourwinlose = getwinlose(yourArray,
			datalist[index - 1].matchInfo[you].nickname);

	$('#nametd1-' + index).text(datalist[index - 1].matchInfo[me].nickname);
	$('#nametd2-' + index).text('LV : ' + mylevel);
	$('#nametd3-' + index).text(date);
	$('#nametd4-' + index).text('LV : ' + yourlevel);
	$('#nametd5-' + index).text(datalist[index - 1].matchInfo[you].nickname);

	if (datalist[index - 1].matchInfo[me].matchDetail.matchResult == null)
		datalist[index - 1].matchInfo[me].matchDetail.matchResult = "패";
	if (datalist[index - 1].matchInfo[you].matchDetail.matchResult == null)
		datalist[index - 1].matchInfo[you].matchDetail.matchResult = "패";
	$('#gradeimg1-' + index).attr("src", myimg);
	$('#gradetd2-' + index).text(mydivision);
	$('#gradetd3-' + index).text(
			datalist[index - 1].matchInfo[me].matchDetail.matchResult);
	$('#gradetd4-' + index).text(
			datalist[index - 1].matchInfo[you].matchDetail.matchResult);
	$('#gradetd5-' + index).text(yourdivision);
	$('#gradeimg2-' + index).attr("src", yourimg);

	$('#currtd1-' + index).text(mywinlose);
	$('#currtd2-' + index).text(
			datalist[index - 1].matchInfo[me].shoot.goalTotal);
	$('#currtd3-' + index).text(
			datalist[index - 1].matchInfo[you].shoot.goalTotal);
	$('#currtd4-' + index).text(yourwinlose);

	if (datalist[index - 1].matchInfo[me].matchDetail.matchResult == "승")
		$('#btn' + index).attr("src", "../images/blueplus.PNG");
	else if (datalist[index - 1].matchInfo[me].matchDetail.matchResult == "패")
		$('#btn' + index).attr("src", "../images/redplus.PNG");
	else
		$('#btn' + index).attr("src", "../images/yellowplus.PNG");
}

function makedetailtab(datalist, me, you,nickname) { // 자세한 정보 만드는 함수
	makesquad(datalist, me,nickname); // 내 스쿼드 뽑기
	makesquad(datalist, you,nickname);// 상대 스쿼드 뽑기
	$('#nick1-' + index).text(datalist[index - 1].matchInfo[me].nickname);
	$('#nick2-' + index).text(datalist[index - 1].matchInfo[you].nickname);
	$('#shoot1-' + index).text(
			datalist[index - 1].matchInfo[me].shoot.shootTotal);
	$('#shoot2-' + index).text(
			datalist[index - 1].matchInfo[you].shoot.shootTotal);
	$('#efshoot1-' + index).text(
			datalist[index - 1].matchInfo[me].shoot.effectiveShootTotal);
	$('#efshoot2-' + index).text(
			datalist[index - 1].matchInfo[you].shoot.effectiveShootTotal);
	$('#foul1-' + index).text(
			datalist[index - 1].matchInfo[me].matchDetail.foul);
	$('#foul2-' + index).text(
			datalist[index - 1].matchInfo[you].matchDetail.foul);
	$('#yc1-' + index).text(
			datalist[index - 1].matchInfo[me].matchDetail.yellowCards);
	$('#yc2-' + index).text(
			datalist[index - 1].matchInfo[you].matchDetail.yellowCards);
	$('#rc1-' + index).text(
			datalist[index - 1].matchInfo[me].matchDetail.redCards);
	$('#rc2-' + index).text(
			datalist[index - 1].matchInfo[you].matchDetail.redCards);
	$('#corner1-' + index).text(
			datalist[index - 1].matchInfo[me].matchDetail.cornerKick);
	$('#corner2-' + index).text(
			datalist[index - 1].matchInfo[you].matchDetail.cornerKick);
	$('#possession1-' + index).text(
			datalist[index - 1].matchInfo[me].matchDetail.possession);
	$('#possession2-' + index).text(
			datalist[index - 1].matchInfo[you].matchDetail.possession);

	// /받아온 포메이션 출력
	$('#form1-' + index).text(myform);
	$('#form2-' + index).text(yourform);
}


function makesquad(datalist, who,nickname) { // 스쿼드 div 만드는 함수
	var whowho = "m";
	var msg = "";
	var length = datalist[index - 1].matchInfo[who].player.length;
	if (datalist[index - 1].matchInfo[who].player.length == 0) { // 강종한 경우
		if (datalist[index - 1].matchInfo[who].nickname == nickname) {
			myform = "X";
			resetform();
		} else {
			yourform = "X";
			resetform();
		}
	} else {
		var position;
		var check;

		// ///////////////////////////////////////////////////////////////////
		var playerIdList = new Array();
		var playerNameList = new Array();
		var nameListSort = new Array();

		// 거래정보에서 선수 고유 id값만 저장
		for (var i = 0; i < length; i++) {
			spid = String(datalist[index - 1].matchInfo[who].player[i].spId);
			playerIdList.push(spid);
		}
		// 고유 id값으로 이름 가져오는 부분
		playerNameList = JSON.parse(getPlayerName(playerIdList));
		
		// ///////////////////////////////////////////////////////////////////

		for (var i = 0; i < 18; i++) {
			position = datalist[index - 1].matchInfo[who].player[i].spPosition; // 선수의
			// spposition으로포지션위치
			position = getPosition(position); // 포지션 이름 받아옴
			if (position == "SUB") {
				continue;
			}

			spid = String(datalist[index - 1].matchInfo[who].player[i].spId);// 선수의
			// 이미지;
			check = spid.substring(0, 2); // 101인지 체크

			if (check != "101") {
				num = spid.substring(3, 9); // 아니면 잘라줌
			}

			num = parseInt(num); // 이미지를 위한 숫자
			if (datalist[index - 1].matchInfo[who].nickname == nickname) {
				whowho = "m";
				makeimg(num, spid, position, "m"); // 스쿼드 이미지 만들기
			} else {
				whowho = "y";
				makeimg(num, spid, position, "y");
			}
			$.each(playerNameList, function(j, item) {
				if (playerNameList[j].id == spid) {
					$('#pname' + whowho + spid + index).text(playerNameList[j].name);
					return false;
				}
			})
			
			$('#ppos' + whowho + spid + index).text(position);
			$('#pshoot' + whowho + spid + index).text(
					datalist[index - 1].matchInfo[who].player[i].status.shoot);
			$('#peffect' + whowho + spid + index)
					.text(
							datalist[index - 1].matchInfo[who].player[i].status.effectiveShoot);
			$('#pgoal' + whowho + spid + index).text(
					datalist[index - 1].matchInfo[who].player[i].status.goal);
			$('#passist' + whowho + spid + index).text(
					datalist[index - 1].matchInfo[who].player[i].status.assist);
			$('#prating' + whowho + spid + index)
					.text(
							datalist[index - 1].matchInfo[who].player[i].status.spRating);
		}
		if (Dcnt != 0)
			msg += Dcnt + "-";
		if (M1cnt != 0)
			msg += M1cnt + "-";
		if (M2cnt != 0)
			msg += M2cnt + "-";
		if (M3cnt != 0)
			msg += M3cnt + "-";
		if (Fcnt != 0)
			msg += Fcnt + "-";
		msg = msg.substring(0, msg.length - 1);
		if (whowho == "m") {
			myform = msg;
			resetform();
		} else {
			yourform = msg;
			resetform();
		}
	}
}

function makeimg(num, spid, position, MorY) { // 스쿼드 내에서 선수 이미지 만드는 부분
	console.log("MorY : " + MorY)
	var check = "G";
	var left = 0;
	var top = 0;
	if (position == "GK") {
		check = "G";
		left = 0;
		top = 165;
	}
	if (position == "SW") {
		Dcnt++;
		check = "D";
		if (MorY == "m") {
			left = 0;
			top = 165;
		} else {
			left = 62;
			top = 165;
		}
	}
	if (position == "RWB") {
		Dcnt++;
		check = "D";
		if (MorY == "m") {
			left = 40;
			top = 315;
		} else {
			left = 20;
			top = 15;
		}
	}
	if (position == "RB") {
		Dcnt++;
		check = "D";
		if (MorY == "m") {
			left = 30;
			top = 265;
		} else {
			left = 30;
			top = 65;
		}
	}
	if (position == "RCB") {
		Dcnt++;
		check = "D";
		if (MorY == "m") {
			left = 30;
			top = 215;
		} else {
			left = 30;
			top = 115;
		}
	}
	if (position == "CB") {
		Dcnt++;
		check = "D";
		left = 30;
		top = 165;
	}
	if (position == "LCB") {
		Dcnt++;
		check = "D";
		if (MorY == "m") {
			left = 30;
			top = 115;
		} else {
			left = 30;
			top = 215;
		}
	}
	if (position == "LB") {
		Dcnt++;
		check = "D";
		if (MorY == "m") {
			left = 30;
			top = 65;
		} else {
			left = 30;
			top = 265;
		}
	}
	if (position == "LWB") {
		Dcnt++;
		check = "D";
		if (MorY == "m") {
			left = 40;
			top = 15;
		} else {
			left = 20;
			top = 315;
		}
	}
	if (position == "RDM") {
		M1cnt++;
		check = "M";
		if (MorY == "m") {
			left = 10;
			top = 255;
		} else {
			left = 113;
			top = 75;
		}

	}
	if (position == "CDM") {
		M1cnt++;
		check = "M";
		if (MorY == "m") {
			left = 10;
			top = 165;
		} else {
			left = 113;
			top = 165;
		}
	}
	if (position == "LDM") {
		M1cnt++;
		check = "M";
		if (MorY == "m") {
			left = 10;
			top = 75;
		} else {
			left = 113;
			top = 255;
		}
	}
	if (position == "LM") {
		M2cnt++;
		check = "M";
		if (MorY == "m") {
			left = 60;
			top = 25;
		} else {
			left = 60;
			top = 305;
		}
	}
	if (position == "LCM") {
		M2cnt++;
		check = "M";
		if (MorY == "m") {
			left = 60;
			top = 95;
		} else {
			left = 60;
			top = 235;
		}
	}
	if (position == "CM") {
		M2cnt++;
		check = "M";
		left = 60;
		top = 165;
	}
	if (position == "RCM") {
		M2cnt++;
		check = "M";
		if (MorY == "m") {
			left = 60;
			top = 235;
		} else {
			left = 60;
			top = 95;
		}
	}
	if (position == "RM") {
		M2cnt++;
		check = "M";
		if (MorY == "m") {
			left = 60;
			top = 305;
		} else {
			left = 60;
			top = 25;
		}
	}
	if (position == "RAM") {
		M3cnt++;
		check = "M";
		if (MorY == "m") {
			left = 120;
			top = 235;
		} else {
			left = 3;
			top = 95;
		}
	}
	if (position == "CAM") {
		M3cnt++;
		check = "M";
		if (MorY == "m") {
			left = 120;
			top = 165;
		} else {
			left = 3;
			top = 165;
		}
	}
	if (position == "LAM") {
		M3cnt++;
		check = "M";
		if (MorY == "m") {
			left = 120;
			top = 95;
		} else {
			left = 3;
			top = 235;
		}
	}
	if (position == "RF") {
		Fcnt++;
		check = "A";
		if (MorY == "m") {
			left = 10;
			top = 215;
		} else {
			left = 52;
			top = 115;
		}
	}
	if (position == "CF") {
		Fcnt++;
		check = "A";
		if (MorY == "m") {
			left = 10;
			top = 165;
		} else {
			left = 52;
			top = 165;
		}
	}
	if (position == "LF") {
		Fcnt++;
		check = "A";
		if (MorY == "m") {
			left = 10;
			top = 115;
		} else {
			left = 52;
			top = 215;
		}
	}
	if (position == "LW") {
		Fcnt++;
		check = "A";
		if (MorY == "m") {
			left = 30;
			top = 25;
		} else {
			left = 32;
			top = 305;
		}
	}
	if (position == "LS") {
		Fcnt++;
		check = "A";
		if (MorY == "m") {
			left = 60;
			top = 95;
		} else {
			left = 2;
			top = 235;
		}
	}
	if (position == "ST") {
		Fcnt++;
		check = "A";
		if (MorY == "m") {
			left = 60;
			top = 165;
		} else {
			left = 2;
			top = 165;
		}
	}
	if (position == "RS") {
		Fcnt++;
		check = "A";
		if (MorY == "m") {
			left = 60;
			top = 235;
		} else {
			left = 2;
			top = 95;
		}
	}
	if (position == "RW") {
		Fcnt++;
		check = "A";
		if (MorY == "m") {
			left = 30;
			top = 305;
		} else {
			left = 32;
			top = 25;
		}
	}
	$('#' + MorY + check + index).append(
			'<img src=https://fo4.dn.nexoncdn.co.kr/live/externalAssets/common/players/p'
					+ num + '.png class=pimage id=' + MorY + spid + index + '>'
					+ '<table border=1 class=imgdetail id=imgdt' + MorY + spid
					+ index + '>' + '<tr>' + '<th>이름</th>' + '<td id=pname'
					+ MorY + spid + index + '></td>' + '</tr>' + '<tr>'
					+ '<th>포지션</th>' + '<td id=ppos' + MorY + spid + index
					+ '></td>' + '</tr>' + '<tr>' + '<th>슈팅</th>'
					+ '<td id=pshoot' + MorY + spid + index + '></td>'
					+ '</tr>' + '<tr>' + '<th>유효슈팅</th>' + '<td id=peffect'
					+ MorY + spid + index + '></td>' + '</tr>' + '<tr>'
					+ '<th>골</th>' + '<td id=pgoal' + MorY + spid + index
					+ '></td>' + '</tr>' + '<tr>' + '<th>어시스트</th>'
					+ '<td id=passist' + MorY + spid + index + '></td>'
					+ '</tr>' + '<tr>' + '<th>평점</th>' + '<td id=prating'
					+ MorY + spid + index + '></td>' + '</tr>' + '</table>');
	$('#' + MorY + spid + index)
			.attr(
					"onError",
					"this.src='http://fo4.dn.nexoncdn.co.kr/live/externalAssets/common/players/not_found.png'")
	$('#' + MorY + spid + index).css({
		'left' : left + 'px',
		'top' : top + 'px'
	});
}

function resetform() { // 포메이션 만들기 위해 초기화
	Dcnt = 0;
	M1cnt = 0;
	M2cnt = 0;
	M3cnt = 0;
	Fcnt = 0;
}

function buyTab(buyInfo) { // 구매목록 테이블 만들어 주는 함수
	
	var length = buyInfo.length;
	var playerIdList = new Array();
	var playerNameList = new Array();
	
	for (var i = 0; i < length; i++){
		playerIdList.push(buyInfo[i].spid);
	}
	
	playerNameList = JSON.parse(getPlayerName(playerIdList));
	
	for (var i = 0; i < length + 1; i++) {
		$('#buytab').append('<tr id=buy' + i + '></tr>');

		if (i == 0) {
			$('#buy' + i).append('<td>No</td><td>선수 이름</td><td>구매 가격</td>');
		} else {
			$.each(playerNameList,function(j,item){
				if(playerNameList[j].id === buyInfo[i-1].spid){
					$('#buy' + i).append(
							'<td>' + i + '</td><td>' + playerNameList[j].name
									+ '</td><td>' + buyInfo[i - 1].value + 'BP</td>');
					return false;
				}
			})
		}
	}
}

function sellTab(sellInfo) { // 판매목록 테이블 만들어 주는 함수
	
	var length = sellInfo.length;
	var playerIdList = new Array();
	var playerNameList = new Array();
	var nameListSort = new Array();
	
//	거래정보에서 선수 고유 id값만 저장
	for (var i = 0; i < length; i++){
		playerIdList.push(sellInfo[i].spid);
	}
	
//	고유 id값으로 이름 가져오는 부분
	playerNameList = JSON.parse(getPlayerName(playerIdList));
	
	for (var i = 0; i < length + 1; i++) {
		$('#selltab').append('<tr id=sell' + i + '></tr>');
		if (i == 0) {
			$('#sell' + i).append('<td>No.</td><td>선수 이름</td><td>판매 가격</td>');
		} else {
			$.each(playerNameList,function(j,item){
				if(playerNameList[j].id === sellInfo[i-1].spid){
					$('#sell' + i).append(
							'<td>' + i + '</td><td>' + playerNameList[j].name
									+ '</td><td>' + sellInfo[i - 1].value + 'BP</td>');
					return false;
				}
			})
		}
	}
}
