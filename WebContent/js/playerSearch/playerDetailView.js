/**
 * 
 */
$(function() {
	alert("gdgd")
})

var setting = function(requestParams, requestComments, commentsId) {
	$(function() {
		var career = $("#career");
		var teamColor = $("#teamColor");
		$.each(requestParams.affiliation, function(index, item) {
			career.append($("<div>").attr("class", "year_th").text(
					item.affiliation_year))
			career.append($("<div>").attr("class", "club_th").text(
					item.affiliation_team))
		})
		if (typeof requestParams.team_color != "undefined") {
			$.each(requestParams.team_color, function(index, item) {
				teamColor.append($("<div>").text(item))
			})

		}
	})

	var modifyCheck = false;
	var modifyTag = null;
	var insertComments = function(item) {
		var commentsBox = $(".comments")
		var commentsList = $("#commentsList");
		var textarea = $('#inputComments textarea')
		var selectScore = $('#selectScore select')
		var commentsTag = $("<div>").attr("id", "comments");
		var userId = $("<div>").attr("id", "userId").text(item.user_id);
		if (commentsId == item.user_id) {
			commentsBox.css("display", "none");
		}

		var comments = $("<div>").attr("id", "userComments")
				.text(item.comments);
		var commentsFunction = $("<div>").attr("id", "commentsFunction");
		var inputDate = $("<div>").attr("id", "inputDate")
				.text(item.input_date);
		var commentsDelete = $("<div>").attr("id", "commentsDelete");
		var deleteComments = $("<a href='#'>").text("삭제");

		deleteComments.click(function() {
			if (commentsId == item.user_id) {
				$.ajax({
					type : "post",
					url : "deleteComments.do",
					data : {
						"checkId" : item.user_id
					},
					dataType : "text",
					success : function(data) {
						if (data == "") {
							alert("회원 본인 댓글만 삭제할 수 있습니다.");
						} else {
							commentsBox.css("display", "flex");
							commentsTag.remove();
						}
					},
					error : function(xhr, status, error) {
						alert(xhr, status, error);
					}
				})
			} else {
				alert("회원 본인 댓글만 삭제할 수 있습니다.");
			}
		})

		var commentsmodify = $("<div>").attr("id", "commentsModify");
		var modifyComments = $("<a href='#'>").text("수정");
		modifyComments
				.click(function() {
					if (commentsId == item.user_id) {
						modifyTag = commentsTag;
						commentsTag.css("display", "none");
						commentsBox.css("display", "flex");
						modifyCheck = true;
						commentsBox.focus();
						commentsBox.blur();
						$('#inputComments textarea').val(item.comments)
						$('#selectScore select').val(item.score).prop(
								"selected", true);

					} else {
						alert("본인 댓글만 수정할 수 있습니다.")
					}
				})

		var score = $("<div>").attr("id", "score").text(item.score + "점");
		commentsDelete.append(deleteComments);
		commentsmodify.append(modifyComments);
		commentsFunction.append(inputDate, commentsDelete, commentsmodify,
				score);
		commentsTag.append(userId, comments, commentsFunction);
		commentsList.append(commentsTag);
	}

	$(function() {
		$.each(requestComments, function(index) {
			insertComments(requestComments[index]);
		})
	})

	$(function() {
		$("#insertButton").click(
				function() {
					if (commentsId != "") {
						var urlString;
						var comments = $('#inputComments textarea').val();
						var score = parseInt($('#selectScore select').val());
						var jsonData = {
							"id" : requestParams.id,
							"comments" : comments,
							"score" : score

						};
						if (modifyTag != null) {
							urlString = "modifyComments.do";
						} else {
							urlString = "insertPlayerComments.do";
						}
						$.ajax({
							type : "post",
							url : urlString,
							data : JSON.stringify(jsonData),
							dataType : "text",
							contentType : "application/json",
							success : function(data) {
								if (data == '') {
									alert("로그인 후 이용가능합니다.");
								} else {
									if (modifyTag != null) {
										modifyTag.children("#score").text(
												score + " 점");
										modifyTag.children("#comments").text(
												comments);
										modifyTag.css("display", "block");
										modifyTag = null;
									} else {
										// commentsId = '${userId}';
										jsonData.user_id = commentsId;
										jsonData.score = score;
										jsonData.input_date = data;
										insertComments(jsonData);
									}
								}
							},
							error : function(xhr, status, error) {
								alert(xhr, status, error);
							}
						})

					} else {
						alert("로그인 후 가능한 서비스입니다.");
					}
				})
	})
}