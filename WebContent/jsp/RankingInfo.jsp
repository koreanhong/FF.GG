<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
<link rel="icon" href="data:;base64,iVBORw0KGgo=">
<script src="https://code.jquery.com/jquery-2.2.4.js"
	integrity="sha256-iT6Q9iMJYuQiMWNd9lDyBUStIq/8PuOW33aOqmvFpqI="
	crossorigin="anonymous"></script>
<link rel="stylesheet" type="text/css" href="../css/rankstyle.css">
<script type="text/javascript" src="../js/Userajaxfunction.js"></script>
<script type="text/javascript" src="../js/Rankfunction.js"></script>

<script type="text/javascript">
	index = 0;

	$(document).ready(function() {
		var List = new Array;
		List = getRanking();
		makerank(List, index);
		paging(List);
	});
	
</script>
</head>
<body class="default">
	<div id="wrapper" class="sub">
		<header id="header" class="after_1102">
			<jsp:include page="header.jsp" />
		</header>
		<main id="middle" class="sub">
		<div class="datacenter">
<!-- 			<div id="wrapper"> -->
				<div class="wrap">
					<table class="tableSet table-hover">
						<tr class="table table-primary">
							<th>순위</th>
							<th>레벨</th>
							<th>구단주명</th>
							<th>전적(승|무|패)</th>
							<th>승률</th>
							<th>랭킹점수</th>
						</tr>
					</table>
					<div class="btn-group btn-group-lg">
						<button type="button" id="btn1" class="btn btn-primary"
							onclick="return false;">1</button>
						<button type="button" id="btn2" class="btn btn-primary"
							onclick="return false;">2</button>
						<button type="button" id="btn3" class="btn btn-primary"
							onclick="return false;">3</button>
						<button type="button" id="btn4" class="btn btn-primary"
							onclick="return false;">4</button>
						<button type="button" id="btn5" class="btn btn-primary"
							onclick="return false;">5</button>
					</div>
				</div>
<!-- 			</div> -->
		</div>
		</main>
		<footer id="footer" role="contentinfo">
			<jsp:include page="footer.jsp" />
		</footer>
	</div>
</body>
</html>