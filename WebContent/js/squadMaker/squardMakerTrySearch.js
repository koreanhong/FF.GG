/**
 * 스쿼드 메이커에서의 ajax
 */


function trySearch(jsonType) {
	$.ajax({
		url : "searchPlayers.do",
		type : "post",
		data : JSON.stringify(jsonType),
		dataType : "json",
		contentType : "application/json",
		success : function(data) {
			var tagName = "tabs-1";
			if(data.length == 0){
				showSearchResult(tagName, null);
			}else{
				showSearchResult(tagName, data);
			}
		}
	})
}





