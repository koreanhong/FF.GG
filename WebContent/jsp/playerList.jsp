<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="en">

<head>
	<meta charset="UTF-8">
	<title>선수 정보 리스트</title>
	<link rel="icon" href="data:;base64,iVBORw0KGgo=">
	<link rel="stylesheet" href="//code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css">
	<script src="https://code.jquery.com/jquery-2.2.4.js"></script>
	<script src="https://code.jquery.com/ui/1.12.1/jquery-ui.js"></script>
	<script src="https://ajax.googleapis.com/ajax/libs/jqueryui/1.11.4/jquery-ui.min.js"></script>

	<link rel="stylesheet" type="text/css" href="../css/playerList.css">
	<link rel="stylesheet" type="text/css" href="../css/searchForm.css">
	<script type="text/javascript" src="../js/playerSearch/searchForm.js"></script>
	<script type="text/javascript" src="../js/playerSearch/playerListTrySearch.js"></script>
	<script type="text/javascript" src="../js/playerList.js"></script>
</head>

<script type="text/javascript">
	make();
	$(document).ready(function() {
		scrollButton(); // 위아래 이동 버튼
		sort(); // 정렬 버튼
	})
</script>

<body class="default">
	<!-- header 부분 -->
	<div id="wrapper" class="sub">
		<header id="header" class="after_1102">
			<jsp:include page="header.jsp" />
		</header>
		<!-- 우리가 쓰면 되는 몸통 -->
		<main id="middle" class="sub">
			<div class="datacenter">
				<input type="hidden" id="PlayerVs1" value="">
				<div class="wrap">
					<!-- 맨 위에 선수검색, 상세 검색 부분 나눌 탭부분 -->
					<div class="player_view"></div>
					<!-- 검색 조건들 들어올 자리 -->
					<form id="form1" onsubmit="return false;">
						<!-- 검색단 default값 들어가야 하는 장소 -->
						<!--  -->
						<div class="search_panel">
							<div class="search_input_name">
								<input type="text" id="searchName" name="strPlayerName" placeholder="선수명을 입력해주세요.">
							</div>
							<div class="search_input_submit">
								<button class="btn_search">검색</button>
								<button class="btn_reset" onclick="location.href='/playerList.do'">초기화</button>
							</div>
							<div class="search_input_submit_adder">
								<a href="#" class="btn_search_detail">
									<span class="txt">상세 검색 </span>
									<span class="arr"></span>
								</a>
							</div>
						</div>
						<div class="search_choice_sort">
							<!-- 개노가다;; 아이콘들 넣어주는 부분 -->
							<div class="search_class search_sort">
								<div class="main">
									<!-- 상규 코드 시작 -->
								</div>
							</div>
						</div>
					</form>

					<!-- 리스트 바디 -->
					<div class="player_list">
						<div class="selector_wrap">
							<p class="advice">
								선수 리스트는 <strong>최대 200명</strong>까지 제공 / 선수 가치는 매일 오전 1회 업데이트
							</p>
						</div>
						<div class="player_list_wrap">
							<div class="thead">
								<div class="tr">
									<div class="th default">기본 정보</div>
									<div class="th th_ar ovr">
										<span>OVR<br> <em>(기본OVR)</em>
										</span>
										<div class="ar_warp">
											<a href="#" class="btn_down" id=".main_position.positions_ovr[0]" onclick="return false;">
											<span><i class='fas fa-arrow-down'></i></span></a>
											<a href="#" class="btn_up" id=".main_position.positions_ovr[0]" onclick="return false;">
											<span><i class='fas fa-arrow-up'></i></span></a>
										</div>
									</div>
									<div class="th th_ar pay">
										급여
										<div class="ar_warp">
											<a href="#" class="btn_down" id=".basic_info.pay_side" onclick="return false;">
											<span><i class='fas fa-arrow-down'></i></span></a>
											<a href="#" class="btn_up" id=".basic_info.pay_side" onclick="return false;">
											<span><i class='fas fa-arrow-up'></i></span></a>
										</div>
									</div>
									<div class="th th_ar">
										<span>속력</span>
										<div class="ar_warp">
											<a href="#" class="btn_down" id=".average_stat.av_speed" onclick="return false;">
											<span><i class='fas fa-arrow-down'></i></span></a>
											<a href="#" class="btn_up" id=".average_stat.av_speed" onclick="return false;">
											<span><i class='fas fa-arrow-up'></i></span></a>
										</div>
									</div>
									<div class="th th_ar">
										<span>드리블</span>
										<div class="ar_warp">
											<a href="#" class="btn_down" onclick="return false;"> <span><i
														class='fas fa-arrow-down'></i></span></a> <a href="#"
												class="btn_up" onclick="return false;"> <span><i
														class='fas fa-arrow-up'></i></span></a>
										</div>
									</div>
									<div class="th th_ar">
										<span>패스</span>
										<div class="ar_warp">
											<a href="#" class="btn_down" onclick="return false;"> <span><i
														class='fas fa-arrow-down'></i></span></a> <a href="#"
												class="btn_up" onclick="return false;"> <span><i
														class='fas fa-arrow-up'></i></span></a>
										</div>
									</div>
									<div class="th th_ar">
										<span>피지컬</span>
										<div class="ar_warp">
											<a href="#" class="btn_down" onclick="return false;"> <span><i
														class='fas fa-arrow-down'></i></span></a> <a href="#"
												class="btn_up" onclick="return false;"> <span><i
														class='fas fa-arrow-up'></i></span></a>
										</div>
									</div>
									<div class="th th_ar_bp">
										<span>평점 (★★★★★)</span>
										<div class="ar_warp">
											<a href="#" class="btn_down" onclick="return false;">
												<span>
													<i class='fas fa-arrow-down'></i>
												</span>
											</a>
											<a href="#" class="btn_up" onclick="return false;">
												<span>
													<i class='fas fa-arrow-up'></i>
												</span>
											</a>
										</div>
									</div>
								</div>
								<!-- tr end -->
							</div>
							<!-- thead end -->
							<!-- 테이블 들어가면 되는 자리  -->
							<div class="tbody">
								<div id="divPlayerList">
									<!-- 데이터가 동적으로 들어올 자리 -->
								</div>
								<div id="loading">
									<img id="loading-image"
										src="../images/ajax-loader.gif"
										alt="Loading..." />
								</div>
							</div>
							<!-- tbody end -->
						</div>
						<!--player_list_wrap end -->
					</div>
					<!--player_list end -->
				</div>
				<!--wrap end -->
			</div>
			<!--datacenter end-->
		</main>
		<!-- footer 부분  -->
		<footer id="footer" role="contentinfo">
			<jsp:include page="footer.jsp" />
		</footer>
		<!-- 위아래 버튼 -->
		<div class="list_aside">
			<ul>
				<li><a style="cursor: pointer;" class="btn_list_top"> <span class="ico ico_btn_top">위로</span>
					</a></li>
				<li><a style="cursor: pointer;" class="btn_list_bottom"> <span class="ico ico_btn_down">목록으로</span>
					</a></li>
			</ul>
		</div>
	</div>
	<!--wrapper end -->
</body>

</html>