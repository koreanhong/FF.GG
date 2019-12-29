/**
 * 포지션 select테그의 기능입니다.
 */

$(function() {
	var threeBack = [ "포지션을 선택하세요.", "3-4-3", "3-4-3(2)", "3-4-1-2", "3-2-3-2",
			"3-2-2-1-2", "3-1-2-1-3", "3-1-4-2" ];
	var fourBack = [ "포지션을 선택하세요.", "4-5-1", "4-4-2", "4-4-2(2)", "4-4-1-1",
			"4-3-3", "4-3-3(2)", "4-3-2-1", "4-3-1-2", "4-2-4", "4-2-3-1",
			"4-2-2-2", "4-2-2-1-1", "4-2-1-3", "4-2-1-3(2)", "4-1-4-1",
			"4-1-3-2", "4-1-2-3", "4-1-2-3(2)", "4-1-2-1-2", "4-1-2-1-2(2)" ];
	var fiveBack = [ "포지션을 선택하세요.", "5-4-1", "5-3-2", "5-2-3", "5-2-1-2",
			"5-1-2-1-1" ];

	var jsonBack = {
		"포지션을 선택하세요." : "===============",
		"3Back" : threeBack,
		"4Back" : fourBack,
		"5Back" : fiveBack,
	};

	$('#selectBack').click(function() {
				var changeItem = jsonBack[$("#selectBack").val()];

				var selectPosition = $('#selectPosition');
				selectPosition.empty();


				if (changeItem == "===============") {
					selectPosition.append($("<option>" + changeItem
							+ "</option>"));
				} else {
					for (var i = 0; i < changeItem.length; i++) {
						selectPosition.append($("<option>" + changeItem[i]
								+ "</option>"));
					}
				}
			})
})
