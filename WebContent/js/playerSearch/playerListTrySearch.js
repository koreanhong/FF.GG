/**
 * 플레이어리스트에서의 ajax
 */

var trySearch = function(jsonType) {
	$.ajax({
		url : "searchPlayers.do",
		type : "post",
		data : JSON.stringify(jsonType),
		dataType : "json",
		contentType : "application/json",
		success : function(data) {
			$('.player_list_wrap').find($('#divPlayerList')).empty();
			$.each(data, function(index, player) {
				$('#loading').show();
				setListTable(index, player);
				$('#loading').hide();
			})
		}
	})
}
