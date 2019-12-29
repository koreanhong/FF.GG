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

	//선수스탯을 셋팅하는 함수 입니다.
	function inputValue(rs) {
		//옵션 값들을 먼저 불러와서 정수형으로 변환한뒤 더한후에 변수에 담아둡니다.(html에 정수형을 넣어도 넘어올때는 문자열이더라구요...)
		var selectValue = Number($('#enhance').val())
				+ Number($('#adaptation').val());

		//스탯을 셋팅하는 작업입니다. 셋팅할때 옵션값들고 같이 담아 줍니다.
		$('#av_speed').text(rs.average_stat.av_speed + selectValue) // 상단 속도
		$('#av_shoot').text(rs.average_stat.av_shoot + selectValue) //상단 슛
		$('#av_pass').text(rs.average_stat.av_pass + selectValue) //상단 패스
		$('#av_dribble').text(rs.average_stat.av_dribble + selectValue) //상단 드리블
		$('#av_defense').text(rs.average_stat.av_defense + selectValue) //상단 수비
		$('#av_physical').text(rs.average_stat.av_physical + selectValue) //상단 피지컬

		$('#speed').text(rs.detail_stat.speed + selectValue) // 속도
		$('#acceleration').text(rs.detail_stat.acceleration + selectValue)//가속력
		$('#determinative').text(rs.detail_stat.determinative + selectValue)//골 결정력
		$('#shoot_power').text(rs.detail_stat.shoot_power + selectValue)//슛 파워
		$('#range_shoot').text(rs.detail_stat.range_shoot + selectValue) //중거리 슛
		$('#location_selection').text(
				rs.detail_stat.location_selection + selectValue)//위치선정
		$('#volley_shoot').text(rs.detail_stat.volley_shoot + selectValue)//발리 슛
		$('#penalty_kick').text(rs.detail_stat.penalty_kick + selectValue)//패널티 킥
		$('#short_pass').text(rs.detail_stat.short_pass + selectValue)//짧은 패스
		$('#visual_range').text(rs.detail_stat.visual_range + selectValue)//시야
		$('#crossing').text(rs.detail_stat.crossing + selectValue)//크로스
		$('#long_pass').text(rs.detail_stat.long_pass + selectValue)//롱 패스
		$('#free_kick').text(rs.detail_stat.free_kick + selectValue)//프리킥
		$('#curve').text(rs.detail_stat.curve + selectValue)//커브
		$('#dribble').text(rs.detail_stat.dribble + selectValue)//드리블
		$('#ball_control').text(rs.detail_stat.ball_control + selectValue)//볼 컨트롤
		$('#agility').text(rs.detail_stat.agility + selectValue)//민첩성
		$('#balance').text(rs.detail_stat.balance + selectValue)//밸런스
		$('#reaction_velocity').text(
				rs.detail_stat.reaction_velocity + selectValue)//반응 속도
		$('#mantoman_defense').text(
				rs.detail_stat.mantoman_defense + selectValue)//대인 수비
		$('#tackle').text(rs.detail_stat.tackle + selectValue)//태클
		$('#Interception').text(rs.detail_stat.Interception + selectValue)//가로채기
		$('#hader').text(rs.detail_stat.hader + selectValue)//헤더
		$('#sliding_tackle').text(rs.detail_stat.sliding_tackle + selectValue)//슬라이딩 태클
		$('#physical_fight').text(rs.detail_stat.physical_fight + selectValue)//몸싸움
		$('#staminer').text(rs.detail_stat.staminer + selectValue)//스태미너
		$('#hostility').text(rs.detail_stat.hostility + selectValue)//적긍성
		$('#jump').text(rs.detail_stat.jump + selectValue)//점프
		$('#calmness').text(rs.detail_stat.calmness + selectValue)// 침착성
		$('#gk_diving').text(rs.detail_stat.gk_diving + selectValue) //GK다이빙
		$('#gk_handling').text(rs.detail_stat.gk_handling + selectValue)//GK핸들링
		$('#gk_kick').text(rs.detail_stat.gk_kick + selectValue)//GK킥
		$('#gk_reaction_velocity').text(
				rs.detail_stat.gk_reaction_velocity + selectValue)//GK반응속도
		$('#gk_location_selection').text(
				rs.detail_stat.gk_location_selection + selectValue)//GK위치 선정

	}
	//포지션 오버롤을 셋팅하는 함수 입니다.
	function ovr_set(rs) {
		//옵션 값들을 먼저 불러와서 정수형으로 변환한뒤 더한후에 변수에 담아둡니다.
		var selectValue = Number($('#enhance').val())
				+ Number($('#adaptation').val());
		//인덱스 번호가 맞춰놨기 때문에 제이쿼리로 뽑아 이치문으로 해당 테그에 담아 줍니다. 
		$('.circle span').each(function(index) {
			$(this).text(rs.position_value[index] + selectValue);
		})
	}
	
	function input_value(rs) {
		var id;
		var seasonId;
		var spid = rs.id; 
		seasonId = Math.floor(spid / 1000000);
		
		if (spid >= 200000000 && seasonId != 213) {
      			id = spid % 1000000;
		} else {
			id = spid;
		}
		//만들어진 id url에 넣어주고 선수이미지 속성 값으로 넣어줍니다.
		var imageURL = "https://fo4.dn.nexoncdn.co.kr/live/externalAssets/common/players/p"
				+ id + ".png"
		$("#imgs").attr({"src" :  imageURL ,
			"onError" : "this.src='http://fo4.dn.nexoncdn.co.kr/live/externalAssets/common/players/not_found.png'"});
		var seasonURL = "http://s.nx.com/s2/game/fo4/obt/externalAssets/season/"
				+ classId[seasonId] + ".png";
		//밑으로는 전부 받은 데이터 id 값에 맞게 넣어주는 작업입니다.~
		// $('#class img').text(rs.id)//id
		$('#class img').attr("src", seasonURL);
		$('#name').text(rs.name)//이름
		$('#pay').text(rs.basic_info.pay_side)//급여

		//메인포지션

		$.each(rs.main_position.positions,function(index) {
				var div1 = $('<div>')
				var div2 = $('<div>').text(rs.main_position.positions[index]
										+ rs.main_position.positions_ovr[index]);
				div1.append(div2);
			    $('.mainOvr_area').append(div1);
		});

		$('#skill').text(rs.basic_info.skill)//기술
		//발 능력치
		$('#foot').text(
				"L" + rs.basic_info.lfoot + " - " + "R"
						+ rs.basic_info.rfoot)

		$('#fame').text(rs.basic_info.season)//명성

		$('#birth').text(rs.basic_info.birth)//생일
		$('#height').text(rs.basic_info.height + "cm")//키
		$('#weight').text(rs.basic_info.weight + "kg")//몸무개
		$('#bodytype').text(rs.basic_info.bodytype)//체형

		$('#team').text(rs.basic_info.team)//팀

		$('#characteristic').text(rs.basic_info.character)//특성

		inputValue(rs);//선수 스탯
		ovr_set(rs)//포지션 오버롤

		$('select').click(function() { //상단 옵션 변경시에 옵션태그 value 값에 따른 스탯변경
			inputValue(rs)
			ovr_set(rs)
		})
	}