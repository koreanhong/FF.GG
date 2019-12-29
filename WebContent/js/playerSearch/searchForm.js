var make = function() {
	
	var detailStatText = [ "세부 스탯 선택", "속력", "가속력", "골 결정력", "슛 파워", "중거리 슛",
		"위치 선정", "발리슛", "페널티 킥", "짧은 패스", "시야", "크로스", "긴 패스", "프리킥", "커브",
		"드리블", "볼 컨트롤", "민첩성", "밸런스", "반응 속도", "대인 수비", "태클", "가로채기", "헤더",
		"슬라이딩 태클", "몸싸움", "스테미너", "적극성", "점프", "침착성", "GK 다이빙", "GK 핸들링",
		"GK 킥", "GK 반응속도", "GK 위치선정" ]
	var detailStatValue = [ "", "speed", "acceleration", "determinative",
		"shot_power", "range_shot", "location_selection", "balinese_shot",
		"penalty_kick", "short_pass", "visual_range", "crossing",
		"long_pass", "free_kick", "curve", "dribble", "ball_control",
		"agility", "balance", "reaction_velocity", "mantoman_defense",
		"tackle", "Interception", "hader", "sliding_tackle",
		"physical_fight", "staminer", "hostility", "jump", "calmness",
		"gk_diving", "gk_handling", "gk_kick", "gk_reaction_velocity",
		"gk_location_selection" ]
	var character = [ "보유 특성", "선호포지션 고집", "장거리 스로잉", "다이버", "유리 몸", "강철 몸",
		"주발 선호", "슬라이딩 태클 선호", "얼리 크로스 선호", "예리한 감아차기", "화려한 개인기",
		"긴패스 선호", "중거리 슛 선호", "스피드 드리블러", "플레이 메이커", "GK 공격 가담",
		"GK 능숙한 펀칭", "GK 멀리 던지기", "파워헤더", "GK 침착한 1:1 수비", "초 장거리 스로인",
		"아웃사이드 슈팅", "패스 마스터" ]
	
	// ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// 검색 폼 시작
	$(function searchForm() {
		var me = this;
		$('.btn_search').bind("click", function() {
			function basicSearchPutOption(params) {
				params.name = $("#searchName").val();
				params.classes = new Array();
				$('input:checkbox[class=classckb]').each(function() {
					if ($(this).is(':checked'))
						params.classes.push($(this).val());
				});
	
				params.main_positions = new Array();
				$(".pt input").each(function() {
					if ($(this).is(':checked')) {
						if ($(this).val() != 'All')
							params.main_positions.push($(this).val());
					}
				});
				
				params.position_ovr = [ me.ovr_min, me.ovr_max ];
				params.pay_side = [ me.pay_min, me.pay_max ];
			}
	
			if (me.detailSearchCkeck) {
				var params = {};
				basicSearchPutOption(params);
	
				params.team = $("#inputTeam").val();
				params.nationality = $("#inputNationality").val();
				params.teamColor = $(".inputTeamColor").val();
	
				params.detailInfoKey = new Array();
				$(".classDetail option:selected").each(function() {
					if ($(this).is(':selected'))
						params.detailInfoKey.push($(this).val());
				})
	
				params.detailInfovlaue = new Array();
				for (var i = 0; i < 3; i++) {
					var valueMin = Number($("#detailMin" + i).text());
					var valueMax = Number($("#detailMax" + i).text());
					params.detailInfovlaue.push(valueMin, valueMax)
				}
	
				params.retentionCharacter = new Array();
				$(".retentionCharacter option:selected").each(
					function() {
						if ($(this).is(':selected'))
							params.retentionCharacter.push($(this).val());
					})
	
				params.unretentionCharacter = new Array();
				$(".unretentionCharacter option:selected").each(
					function() {
						if ($(this).is(':selected'))
							params.unretentionCharacter.push($(this).val());
					})
	
				params.year = [ me.year_min, me.year_max ];
				params.month = $(".month option:selected").val();
				params.date = $(".date option:selected").val();
	
				params.height = [ me.height_min, me.height_max ];
				params.weight = [ me.weight_min, me.weight_max ];
	
				params.physical = new Array();
				$('input:checkbox[class=physical_cb]').each(function() {
					if ($(this).is(':checked'))
						params.physical.push($(this).val());
				});
				
				params.footValue = [
						$(".L_footValue  option:selected").val(),
						$(".R_footValue  option:selected").val() ];
				params.skillLevel = $(".skillLevel  option:selected").val();
				params.fameValue = $(".fameClass option:selected").val();
				params.av_scor = [ me.rating_min, me.rating_max ];
				trySearch(params);
			} else {
				var params = {};
				basicSearchPutOption(params);
				trySearch(params);
			}
		});
		$('.btn_search').trigger('click');
	})
	// ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// 클래스 검색 폼
	$(function classSerchForm() {
		var season = [ {
			"seasonId" : 101,
			"className" : "ICON"
		}, {
			"seasonId" : 201,
			"className" : "NHD"
		}, {
			"seasonId" : 202,
			"className" : "TKI"
		}, {
			"seasonId" : 206,
			"className" : "TB"
		}, {
			"seasonId" : 207,
			"className" : "TT"
		}, {
			"seasonId" : 210,
			"className" : "GR"
		}, {
			"seasonId" : 211,
			"className" : "19TOTY"
		}, {
			"seasonId" : 212,
			"className" : "18TOTY"
		}, {
			"seasonId" : 213,
			"className" : "MCI"
		}, {
			"seasonId" : 214,
			"className" : "TC"
		}, {
			"seasonId" : 215,
			"className" : "19TOTS"
		}, {
			"seasonId" : 216,
			"className" : "HOT"
		}, {
			"seasonId" : 217,
			"className" : "COC"
		}, {
			"seasonId" : 218,
			"className" : "OTW"
		}, {
			"seasonId" : 295,
			"className" : "K19"
		}, {
			"seasonId" : 297,
			"className" : "MCC"
		},{
			"seasonId" : 298,
			"className" : "K18"
		}, {
			"seasonId" : 300,
			"className" : "LIVE"
		}, {
			"seasonId" : 317,
			"className" : "17"
		}, {
			"seasonId" : 318,
			"className" : "18"
		}, {
			"seasonId" : 500,
			"className" : "18A"
		}, {
			"seasonId" : 501,
			"className" : "18S"
		}, {
			"seasonId" : 502,
			"className" : "19A"
		} ]
		
		var classDiv = $("<div>").attr({
			"class" : "th"
		});
		classDiv.css("height", "100px");
		classDiv.append($("<div>").attr("class", "tag_name").text("클래스"));

		var classTag = $("<div>").attr("class", "class_tag tag");
		classTag.css("height", "100px");

		$('.main').append(classDiv);
		classDiv.after(classTag);

		$.each(season, function(index) {
			var seansonDiv = $("<div>").attr({
				"class" : "seansonDiv"
			});
			seansonDiv.css("opacity", 0.5);
			classTag.append(seansonDiv);
			
			var tdb = false;
			var cb = $('<input>');
			cb.attr({
				"class" : "classckb",
				"type" : "checkbox",
				"id" : season[index].className,
				"value" : season[index].seasonId
			})
			seansonDiv.append(cb);

			var lb = $('<label>');
			lb.attr({
				"class" : "classlb",
				"for" : season[index].className
			});
			seansonDiv.append(lb);

			var seasonName = $("<div>").attr("class", "tag_name");
			seasonName.text(season[index].className);
			
			lb.append(seasonName);
			lb.click(function() {
				if (tdb) {
					tdb = false;
					seansonDiv.css("opacity", 0.5);
				} else {
					tdb = true;
					seansonDiv.css("opacity", 1);
				}
			})
		})
	})
	// ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// 포지션
	$(function positionSerchForm() {
		
		var FW = [ "ST", "CF", "LW", "RW" ]
		var MF = [ "CM", "CAM", "CDM", "LM", "RM" ]
		var DF = [ "CB", "RB", "LB", "LWB", "RWB" ]
		var GK = [ "GK" ]
		
		var positionDiv = $("<div>").attr({
			"class" : "th"
		});
		positionDiv.css("height", "135px");
		positionDiv.append($("<div>").attr("class", "tag_name").text("포지션"));

		var positionTag = $("<div>").attr("class", "tag");
		positionTag.css("height", "135px");

		$('.main').append(positionDiv);
		positionDiv.after(positionTag);

		var positionTagId = [ "FW", "MF", "DF", "GK" ];
		var tdClassName = [ "fw_td", "mf_td", "df_td", "gk_td" ];
		var cbClassName = [ "position_fw", "position_mf", "position_df","position_gk" ]
		var tdId = [ "fw_id", "mf_id", "df_id", "gk_id" ];
		var classValueList = [ FW, MF, DF, GK ];

		for (var i = 0; i < 4; i++) {
			var ptp = $('<div>').attr({
				"class" : "pt",
				"id" : positionTagId[i]
			});
			ptp.css("height", "25%");

			var ptpName = $("<div>").attr({
				"class" : "th"
			});
			ptpName.css("height", "100%")
			ptpName.append($("<div>").attr("class", "tag_name").text(positionTagId[i]));
			ptp.append(ptpName);
			positionTag.append(ptp);

			madeAllPositionBotton('All', ptp, tdClassName[i], cbClassName[i],tdId[i]);
			$.each(classValueList[i], function(index) {
				madeButton(classValueList[i][index], ptp, tdClassName[i],cbClassName[i], tdId[i])
			})
		}
	})
	// ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// 버튼 생성 스크립트
	function madeButton(value, positionTagId, tdClassName, cdClassName, tdId) {
		var td = $('<div>');
		td.attr("class", tdClassName);

		var cb = $('<input>');
		cb.attr({
			"class" : cdClassName,
			"type" : "checkbox",
			"id" : value,
			"value" : value
		})

		var lb = $('<label>');
		lb.attr("class", "classlb th");
		lb.append($("<div>").attr("class", "tag_name").text(value));
		lb.click(function() {
			if (cb.is(":checked")) {
				td.css("opacity", 0.5);
				cb.prop("checked", false);
				$('#' + tdId + '').css("opacity", 0.5);
				$("#" + tdId + "").prop("checked", false);
			} else {
				td.css("opacity", 1);
				cb.prop("checked", true);
			}

		})
		td.append(cb);
		td.append(lb);
		positionTagId.append(td);
	}
	// ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// 포지션 all button 생성 스크립트
	function madeAllPositionBotton(value, positionTagId, tdClassName, cbClassName, tdId) {
		var td = $('<div>');
		td.attr({
			"class" : tdClassName,
			"id" : tdId
		});

		var cb = $('<input>');
		cb.attr({
			"class" : cbClassName,
			"type" : "checkbox",
			"id" : value,
			"value" : value
		})

		var lb = $('<label>');
		lb.attr("class", "classlb th");
		lb.append($("<div>").attr("class", "tag_name").text(value));

		var me = this;
		lb.click(function() {
			if (cb.is(":checked")) {
				$("." + tdClassName + "").css("opacity", 0.5);
				$("." + cbClassName + "").prop("checked", false);
			} else {
				$("." + tdClassName + "").css("opacity", 1);
				$("." + cbClassName + "").prop("checked", true);
			}
		})
		td.append(cb);
		td.append(lb);
		positionTagId.append(td);
	}
	// ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// 오버롤 스크롤 생성 스크립트
	$(function ovrAndPaySearchForm() {
		var ovr = $("<div>").attr("class", "th");
		ovr.css("height", "60px");
		ovr.append($("<div>").attr("class", "tag_name").text("OVR"));

		var ovrTag = $("<div>").attr("class", "sliderTag");
		$('.main').append(ovr);
		ovr.after(ovrTag);

		var sliderDiv = $('<div>');
		sliderDiv.attr("class", "sliderDiv")

		var min = $('<div>');
		var max = $('<div>');

		this.ovr_min = 0;
		this.ovr_max = 150;

		min.text(this.ovr_min);
		max.text(this.ovr_max);

		var slider_range = $('<div>');
		slider_range.attr({
			"id" : "slider-range-ovr",
			"class" : "slider"
		});

		ovrTag.append(min);
		ovrTag.append(slider_range);
		ovrTag.append(max);

		var pay = $("<div>").attr("class", "th");
		pay.css("height", "60px");
		pay.append($("<div>").attr("class", "tag_name").text("급여"));

		var payTag = $("<div>").attr("class", "sliderTag");
		$('.main').append(pay);
		pay.after(payTag);

		var min1 = $('<div>');
		var max1 = $('<div>');

		this.pay_min = 0;
		this.pay_max = 34;

		min1.text(this.pay_min);
		max1.text(this.pay_max);

		var slider_range1 = $('<div>');
		slider_range1.attr({
			"id" : "slider-range-pay",
			"class" : "slider"
		});

		payTag.append(min1);
		payTag.append(slider_range1);
		payTag.append(max1);

		var me = this;
		$(function() {
			$("#slider-range-ovr").slider({
				range : true,
				min : 0,
				max : 150,
				values : [ 0, 150 ],
				slide : function(event, ui) {
					me.ovr_min = ui.values[0]
					me.ovr_max = ui.values[1]
					min.text(ui.values[0]);
					max.text(ui.values[1]);
				}
			});
		});
		
		$(function() {
			$("#slider-range-pay").slider({
				range : true,
				min : 0,
				max : 34,
				values : [ 0, 34 ],
				slide : function(event, ui) {
					me.pay_min = ui.values[0]
					me.pay_max = ui.values[1]
					min1.text(ui.values[0]);
					max1.text(ui.values[1]);
				}
			});
		});
	});
	// ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// 팀 국적 팀컬러 검색 폼
	
	$(function() {
		var teamColor = [ "팀 컬러 선택", "2002 대한민국", "2006 잉글랜드", "2019 U-20 대한민국",
			"AC 밀란", "FC 바르셀로나", "FC 서울", "HOT 클래스 출시 기념", "LOSC 릴", "PSV",
			"RB 라이프치히", "RCD 에스파뇰", "VfL 볼프스부르크", "강원 FC", "경남 FC",
			"광저우 R&F FC", "광저우 에버그란데 타오바오", "나폴리", "네덜란드 황금세대", "네덜란드",
			"대구 FC", "대한민국", "독일 황금세대", "독일", "라치오", "러시아", "레스터 시티",
			"레알 마드리드", "로마", "리버풀", "맨체스터 시티", "맨체스터 유나이티드", "멕시코", "미국",
			"바이에른 뮌헨", "바이엘 04 레버쿠젠", "발렌시아 CF", "베이징 런허 FC", "벨기에 황금세대",
			"벨기에", "보루시아 도르트문트", "북아일랜드", "브라질 황금세대", "브라질", "산둥 루넝 타이산",
			"상주 상무", "상하이 SIPG FC", "상하이 그린랜드 선화", "성남 FC", "수원 삼성 블루윙즈",
			"스웨덴", "스위스", "스페인 황금세대", "스페인", "아르헨티나 황금세대", "아르헨티나", "아스널",
			"아약스", "아이슬란드", "아틀레티코 마드리드", "에버턴", "올랭피크 리옹", "올랭피크 마르세유", "왓퍼드",
			"우루과이", "울버햄프턴 원더러스", "울산 현대 FC", "웨일스", "이탈리아 황금세대", "이탈리아",
			"인천 유나이티드", "인테르", "일본", "잉글랜드", "장쑤 쑤닝 FC4", "전북 현대 모터스",
			"제주 유나이티드", "중국", "첼시", "충칭 리판", "칠레 황금세대", "콜롬비아", "톈진 테다 FC",
			"토트넘 홋스퍼", "파리 생제르맹", "포르투갈", "포항 스틸러스", "폴란드", "프랑스 1기 황금세대",
			"프랑스 2기 황금세대", "프랑스", "프랑크푸르트", "피에몬테 칼초", "호주" ]
		
		teamAndNationalitySerchForm("팀 검색", "inputTeam", "팀명을 입력하세요.");
		teamAndNationalitySerchForm("국적 검색", "inputNationality", "국적을 입력하세요");
		inputTeamColor(teamColor, "inputTeamColor", "팀 컬러");
	})

	function inputTeamColor(value, className, text) {
		
		var inputDiv = $("<div>").attr("class", "th detail");
		inputDiv.css("height", "60px");
		inputDiv.append($("<div>").attr("class", "tag_name").text(text));
		$('.main').append(inputDiv);

		var inputTag = $("<div>").attr("class", "sliderTag detail");
		inputTag.css({
			"height" : "60px",
			"width" : "23%"
		});
		inputDiv.after(inputTag);

		var inputs = $("<select>").attr("class", className).css("width", "80%");
		$.each(value, function(index) {
			var position = $("<option>").attr("value", value[index]).text(value[index]);
			inputs.append(position);
		})
		inputTag.append(inputs);
	}
		
	function teamAndNationalitySerchForm(text, inputId, placeholder) {
		var inputDiv = $("<div>").attr("class", "th detail");
		inputDiv.css("height", "60px");
		inputDiv.append($("<div>").attr("class", "tag_name").text(text));
		$('.main').append(inputDiv);

		var inputTag = $("<div>").attr("class", "sliderTag detail");
		inputTag.css({
			"height" : "60px",
			"width" : "23%"
		});
		inputDiv.after(inputTag);

		var inputTeam = $("<input>").attr({
			"id" : inputId,
			"class" : "itn",
			"placeholder" : placeholder
		}).css("width", "80%");

		inputTag.append(inputTeam);
	}
	
	// ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// 세부 능력 폼
	$(function() {
		detailSearchForm(detailStatValue, detailStatText, "세부능력", "classDetail");
	})

	function detailSearchForm(value, texts, te, className) {
		var Div = $("<div>").attr("class", "th detail");
		Div.css("height", "100px");
		Div.append($("<div>").attr("class", "tag_name").text(te));

		var Tag = $("<div>").attr("class",
				"class_tag tag retentionCharacterTag detail ");
		Tag.css("height", "100px");

		$('.main').append(Div);
		Div.after(Tag);

		for (var i = 0; i < 3; i++) {
			var Div1 = $("<div>").css("width", "30%").attr("class", "detailVale");
			var inputs = $("<select>").attr("class", className).css("width","100%");
			for (var j = 0; j < value.length; j++) {
				var option = $("<option>").attr("value", value[j]);
				option.text(texts[j]);
				inputs.append(option);
			}

			Div1.append(inputs);
			Tag.append(Div1);
			madeSlider(Div1, 0, 150, "slider-range-value" + i, "detailMin" + i, "detailMax" + i);

		}
	}

	function madeSlider(tag, min_val, max_val, sliderId, minId, maxId) {
		var min = $('<div>').attr("id", minId);
		var max = $('<div>').attr("id", maxId);

		this.min = min_val;
		this.max = max_val;

		min.text(this.min);
		max.text(this.max);

		var slider_range = $('<div>');
		slider_range.attr({
			"id" : sliderId,
			"class" : "slider"
		});

		tag.append(min);
		tag.append(slider_range);
		tag.append(max);

		var me = this;
		$(function() {
			$("#" + sliderId).slider({
				range : true,
				min : min_val,
				max : max_val,
				values : [ min_val, max_val ],
				slide : function(event, ui) {
					me.min = ui.values[0]
					me.max = ui.values[1]
					min.text(ui.values[0]);
					max.text(ui.values[1]);
				}
			});

		});
	}
	// ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// 보유특성 폼
	$(function() {
		characterSearchForm(character, "retentionCharacter", "보유 특성")
		characterSearchForm(character, "unretentionCharacter", "제외 특성")
	})

	function characterSearchForm(value, className, text) {
		value[0] = text;
		var Div = $("<div>").attr("class", "th detail");
		Div.css("height", "60px");
		Div.append($("<div>").attr("class", "tag_name").text(text));

		var Tag = $("<div>").attr("class", "class_tag tag retentionCharacterTag detail ");
		Tag.css("height", "60px");

		$('.main').append(Div);
		Div.after(Tag);
		for (var i = 0; i < 3; i++) {
			var Div1 = $("<div>").attr("class", "inputCharactersDiv").css("width", "30%");

			var inputs = $("<select>").attr("class", className).css("width", "100%");

			$.each(value, function(index) {
				var position = $("<option>").attr("value", value[index]).text(value[index]);
				inputs.append(position);
			})
			Div1.append(inputs);
			Tag.append(Div1);

		}

	}
	// ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// 출생검색
	$(function birthSearchForm() {
		var year = $("<div>").attr("class", "th detail");
		year.css("height", "60px");
		year.append($("<div>").attr("class", "tag_name").text("출생년도"));

		var yearTag = $("<div>").attr("class", "sliderTag detail");
		$('.main').append(year);
		year.after(yearTag);

		var min = $('<div>');
		var max = $('<div>');

		this.year_min = 1900;
		this.year_max = 2019;

		min.text(this.year_min);
		max.text(this.year_max);

		var slider_range = $('<div>');
		slider_range.attr({
			"id" : "slider-range-year",
			"class" : "slider"
		});

		yearTag.append(min);
		yearTag.append(slider_range);
		yearTag.append(max);

		var me = this;
		$(function() {
			$("#slider-range-year").slider({
				range : true,
				min : 1900,
				max : 2019,
				values : [ 1900, 2019 ],
				slide : function(event, ui) {
					me.year_min = ui.values[0]
					me.year_max = ui.values[1]
					min.text(ui.values[0]);
					max.text(ui.values[1]);
				}
			});

		});

		var mad = $("<div>").attr("class", "th detail");
		mad.css("height", "60px");
		mad.append($("<div>").attr("class", "tag_name").text("출생월일"));

		var madTag = $("<div>").attr("class", "sliderTag detail");
		$('.main').append(mad);
		mad.after(madTag);

		function createMad(className, value, value2) {
			var selectDiv = $("<div>").attr("class", "inputCharactersDiv").css("width", "45%");
			var selectTag = $("<select>").attr("class", className).css("width", "100%");
			selectDiv.append(selectTag);
			selectTag.append($("<option>").attr("value", 0).text(value2 + " 선택"));
			for (var i = 1; i < value + 1; i++) {
				var option = $("<option>").attr("value", i).text(i + value2);
				selectTag.append(option);
			}
			madTag.append(selectDiv);
		}

		createMad("month", 12, "월");
		createMad("date", 31, "일");

	})
	// ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

	$(function heightAndWeightSearchForm() {
		var height = $("<div>").attr("class", "th detail");
		height.css("height", "60px");
		height.append($("<div>").attr("class", "tag_name").text("키"));

		var heightTag = $("<div>").attr("class", "sliderTag detail");
		$('.main').append(height);
		height.after(heightTag);

		var min = $('<div>');
		var max = $('<div>');

		this.height_min = 150;
		this.height_max = 210;

		min.text(this.height_min);
		max.text(this.height_max);

		var slider_range = $('<div>');
		slider_range.attr({
			"id" : "slider-range-height",
			"class" : "slider"
		});

		heightTag.append(min);
		heightTag.append(slider_range);
		heightTag.append(max);

		var me = this;
		$(function() {
			$("#slider-range-height").slider({
				range : true,
				min : 150,
				max : 210,
				values : [ 150, 210 ],
				slide : function(event, ui) {
					me.height_min = ui.values[0]
					me.height_max = ui.values[1]
					min.text(ui.values[0]);
					max.text(ui.values[1]);
				}
			});

		});

		var weight = $("<div>").attr("class", "th detail");
		weight.css("height", "60px");
		weight.append($("<div>").attr("class", "tag_name").text("몸무게"));

		var weightTag = $("<div>").attr("class", "sliderTag detail");
		$('.main').append(weight);
		weight.after(weightTag);

		var min1 = $('<div>');
		var max1 = $('<div>');

		this.weight_min = 50;
		this.weight_max = 110;

		min1.text(this.weight_min);
		max1.text(this.weight_max);

		var slider_range1 = $('<div>');
		slider_range1.attr({
			"id" : "slider-range-weight",
			"class" : "slider"
		});

		weightTag.append(min1);
		weightTag.append(slider_range1);
		weightTag.append(max1);

		var me = this;
		$(function() {
			$("#slider-range-weight").slider({
				range : true,
				min : 50,
				max : 110,
				values : [ 50, 110 ],
				slide : function(event, ui) {
					me.weight_min = ui.values[0]
					me.weight_max = ui.values[1]
					min1.text(ui.values[0]);
					max1.text(ui.values[1]);
				}
			});

		});
	})
	// ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// 체격,양발 능력
	$(function physicalAndFootSearchForm() {
		var physicalDiv = $("<div>").attr("class", "th detail");
		physicalDiv.css("height", "60px");
		physicalDiv.append($("<div>").attr("class", "tag_name").text("체격"));

		var physicalTag = $("<div>").attr("class", "sliderTag detail");
		$('.main').append(physicalDiv);
		physicalDiv.after(physicalTag);

		var physicalValue = [ "마름", "보통", "건장" ];
		for (var i = 0; i < physicalValue.length; i++)
			madeButton(physicalValue[i], physicalTag, "physical_td", "physical_cb", "physical_id");

		var footDiv = $("<div>").attr("class", "th detail");
		footDiv.css("height", "60px");
		footDiv.append($("<div>").attr("class", "tag_name").text("양발 능력"));

		var footTag = $("<div>").attr("class", "sliderTag detail");
		$('.main').append(footDiv);
		footDiv.after(footTag);

		var footValue = [ 5, 4, 3, 2, 1 ];
		function createFoot(className, value, value2) {
			var selectDiv = $("<div>").attr("class", "inputCharactersDiv").css("width", "45%");
			var selectTag = $("<select>").attr("class", className).css("width", "100%");
			selectDiv.append(selectTag);
			selectTag.append($("<option>").attr("value", 0).text(value2));
			for (var i = 0; i < value.length; i++) {
				var option = $("<option>").attr("value", value[i]).text(value[i]);
				selectTag.append(option);
			}
			footTag.append(selectDiv);
		}
		createFoot("L_footValue", footValue, "왼발");
		createFoot("R_footValue", footValue, "오른발");
	})
	// ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	function create_skill_fame(tag, className, value, value2) {
		var selectDiv = $("<div>").attr("class", "inputCharactersDiv").css("width", "80%");
		var selectTag = $("<select>").attr("class", className).css("width", "100%");
		selectDiv.append(selectTag);
		selectTag.append($("<option>").attr("value", 0).text(value2));
		for (var i = 0; i < value.length; i++) {
			var option = $("<option>").attr("value", value[i]).text(value[i]);
			selectTag.append(option);
		}
		tag.append(selectDiv);
	}

	// 게인기, 명성, 평점
	$(function skillAndRatingSearchForm() {
		var skillLevel = [ "★★★★★★", "★★★★★☆", "★★★★☆☆", "★★★☆☆☆", "★★☆☆☆☆", "★☆☆☆☆☆" ];
		var fameList = [ "레전더리", "월드클래스", "탑클래스", "유명선수", "일반선수" ];
		var skillDiv = $("<div>").attr("class", "th detail");
		skillDiv.css("height", "60px");
		skillDiv.append($("<div>").attr("class", "tag_name").text("개인기"));
		$('.main').append(skillDiv);

		var skillTag = $("<div>").attr("class", "sliderTag detail");
		skillTag.css({
			"height" : "60px",
			"width" : "23%"
		});
		skillDiv.after(skillTag);
		create_skill_fame(skillTag, "skillLevel", skillLevel, "전체");

		var fameDiv = $("<div>").attr("class", "th detail");
		fameDiv.css("height", "60px");
		fameDiv.append($("<div>").attr("class", "tag_name").text("명성"));
		$('.main').append(fameDiv);

		var fameTag = $("<div>").attr("class", "sliderTag detail");
		fameTag.css({
			"height" : "60px",
			"width" : "23%"
		});
		fameDiv.after(fameTag);
		create_skill_fame(fameTag, "fameClass", fameList, "전체");

		var ratingDiv = $("<div>").attr("class", "th detail");
		ratingDiv.css("height", "60px");
		ratingDiv.append($("<div>").attr("class", "tag_name").text("평점"));
		$('.main').append(ratingDiv);

		var ratingTag = $("<div>").attr("class", "sliderTag detail");
		ratingTag.css({
			"height" : "60px",
			"width" : "23%"
		});
		ratingDiv.after(ratingTag);

		var min = $('<div>');
		var max = $('<div>');

		this.rating_min = 0;
		this.rating_max = 10;

		min.text(this.rating_min);
		max.text(this.rating_max);

		var slider_range = $('<div>');
		slider_range.attr({
			"id" : "slider-range-rating",
			"class" : "slider"
		});

		ratingTag.append(min);
		ratingTag.append(slider_range);
		ratingTag.append(max);

		var me = this;
		$(function() {
			$("#slider-range-rating").slider({
				range : true,
				min : 0,
				max : 10,
				values : [ 0, 10 ],
				slide : function(event, ui) {
					me.weight_min = ui.values[0]
					me.weight_max = ui.values[1]
					min.text(ui.values[0]);
					max.text(ui.values[1]);
				}
			});
		});
	})
	// ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	$(function() {
		this.detailSearchCkeck = false;
		var me = this;
		$('.btn_search_detail').click(function() {
			if (me.detailSearchCkeck) {
				$(".detail").css("display", "none");
				me.detailSearchCkeck = false;
			} else {
				$(".detail").css("display", "inherit");
				me.detailSearchCkeck = true;
			}
			return false;
		})
	})
};