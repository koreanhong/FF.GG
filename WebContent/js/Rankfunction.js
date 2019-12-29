function makerank(List, index) {
	for (var i = index; i < index + 20; i++) {
		$('.tableSet').append(
				'<tr id=ranktr' + i + ' class="td">' + '<td>' + (i + 1) + '</td>' + '<td>'
						+ List[i].level + '</td>'
						+ '<td><p style=CURSOR:pointer class=id id=id' + i
						+ '>' + List[i].id + '</p></td>' + '<td>'
						+ List[i].game + '</td>' + '<td>' + List[i].rate
						+ '</td>' + '<td>' + List[i].point + '</td>')
	}
}
$(document).on('click', ".id", function() { // 랭킹페이지에서 아이디 누른 경우
	var id = $(this).attr("id");
	var nickname = $('#' + id).text();
	sessionStorage.setItem("nickname", nickname);
	location.href = "UserInfo.do";
});

var paging = function(List){
   $('.btn.btn-primary').click(function() {
      $('.tableSet td').remove();
      if ($(this).attr("id") == "btn1") {
         index = 0
      }
      if ($(this).attr("id") == "btn2") {
         index = 20
      }
      if ($(this).attr("id") == "btn3") {
         index = 40
      }
      if ($(this).attr("id") == "btn4") {
         index = 60
      }
      if ($(this).attr("id") == "btn5") {
         index = 80
      }
      makerank(List, index);
   });
}