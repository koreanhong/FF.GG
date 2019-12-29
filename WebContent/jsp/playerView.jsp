<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html id="info_html">
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
<script src="https://code.jquery.com/jquery-2.2.4.js"
	integrity="sha256-iT6Q9iMJYuQiMWNd9lDyBUStIq/8PuOW33aOqmvFpqI="
	crossorigin="anonymous"></script>
<!-- <script src="https://code.jquery.com/jquery-1.12.4.js"></script> -->
<!-- <script src="https://code.jquery.com/ui/1.12.1/jquery-ui.js"></script> -->
<script
	src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.4/jquery.min.js"></script>
<script
	src="https://ajax.googleapis.com/ajax/libs/jqueryui/1.11.4/jquery-ui.min.js"></script>	
	
<link rel="stylesheet" type="text/css"
	href="../css/playerView.css">
<script type="text/javascript" src="../js/playerSearch/playerView.js"></script>	

<script type="text/javascript">
	$(document).ready(function() {
		//컨트롤러 에서 보낸 모델값을 json.parse로 받아줍니다.
		var rs = JSON.parse('${rs}');
		input_value(rs)
	})
</script>


</head>
<body id="info_body">
	<div class="player_info">
		<div class="image_area">
			<img id="imgs">
			<div class="enhance_area">
				<select id="enhance">
					<option value="0">1</option>
					<option value="1">2</option>
					<option value="2">3</option>
					<option value="4">4</option>
					<option value="6">5</option>
					<option value="8">6</option>
					<option value="11">7</option>
					<option value="15">8</option>
					<option value="19">9</option>
					<option value="24">10</option>
				</select> <select id="adaptation">
					<option value="0">+1</option>
					<option value="1">+2</option>
					<option value="2">+3</option>
					<option value="3">+4</option>
					<option value="4">+5</option>
				</select>
			</div>

		</div>

		<div class="info">
			<div class="class_area">
				<div id="class">
					<div>
						<img>
					</div>
				</div>
				<div id="name"></div>
				<div id="pay"></div>
			</div>
			<div class="mainOvr_area"></div>
			<div class="etc_area1">
				<div id="skill"></div>
				<div id="foot"></div>
				<div id="fame"></div>
			</div>
			<div class="etc_area2">
				<div id="birth"></div>
				<div id="height"></div>
				<div id="weight"></div>
				<div id="bodytype"></div>

			</div>
			<div class="team_area">
				<div id="team"></div>
			</div>
			<div class="characteristic_area">
				<div id="characteristic"></div>
			</div>
		</div>
		<div class="positionValue_area">
			<div class="positionBox">
				<img id="pan" src="images/pan.png">
			</div>
			<span class="position_fw">
				<div class="circle">
					<span></span>
				</div>
			</span> <span class="position_fw">
				<div class="circle">
					<span></span>
				</div>
				<div class="circle">
					<span></span>
				</div>
				<div class="circle">
					<span></span>
				</div>
			</span> <span class="position_mf">
				<div class="circle">
					<span></span>
				</div>
			</span> <span class="position_mf">
				<div class="circle">
					<span></span>
				</div>
				<div class="circle">
					<span></span>
				</div>
				<div class="circle">
					<span></span>
				</div>
			</span> <span class="position_mf">
				<div class="circle">
					<span></span>
				</div>
			</span> <span class="position_df">
				<div class="circle">
					<span></span>
				</div>
				<div class="circle">
					<span></span>
				</div>
				<div class="circle">
					<span></span>
				</div>
			</span> <span class="position_df" id="df2">
				<div class="circle">
					<span></span>
				</div>
				<div class="circle">
					<span></span>
				</div>
				<div class="circle">
					<span></span>
				</div>
			</span> <span class="position_gk">
				<div class="circle">
					<span></span>
				</div>
			</span>
		</div>
		<div class="player_value">
			<div class="av_value">
				<span>
					<div>스피드</div>
					<div id="av_speed"></div>
				</span> <span>
					<div>슛</div>
					<div id="av_shoot"></div>
				</span> <span>
					<div>패스</div>
					<div id="av_pass"></div>
				</span> <span>
					<div>드리블</div>
					<div id="av_dribble"></div>
				</span> <span>
					<div>수비</div>
					<div id="av_defense"></div>
				</span> <span>
					<div>피지컬</div>
					<div id="av_physical"></div>
				</span>
			</div>
			<div class="detail_vlaue">
				<ul>
					<li>
						<div class="value_name">속력</div>
						<div id="speed"></div>
					</li>
					<li>
						<div class="value_name">가속력</div>
						<div id="acceleration"></div>
					</li>
					<li>
						<div class="value_name">골 결정결</div>
						<div id="determinative"></div>
					</li>
					<li>
						<div class="value_name">슛 파워</div>
						<div id="shoot_power"></div>
					</li>
					<li>
						<div class="value_name">중거리 슛</div>
						<div id="range_shoot"></div>
					</li>
					<li>
						<div class="value_name">위치 선정</div>
						<div id="location_selection"></div>
					</li>
					<li>
						<div class="value_name">발리 슛</div>
						<div id="volley_shoot"></div>
					</li>
				</ul>
				<ul>
					<li>
						<div class="value_name">패널티 킥</div>
						<div id="penalty_kick"></div>
					</li>
					<li>
						<div class="value_name">짧은 패스</div>
						<div id="short_pass"></div>
					</li>
					<li>
						<div class="value_name">시야</div>
						<div id="visual_range"></div>
					</li>
					<li>
						<div class="value_name">크로스</div>
						<div id="crossing"></div>
					</li>
					<li>
						<div class="value_name">긴 패스</div>
						<div id="long_pass"></div>
					</li>
					<li>
						<div class="value_name">프리킥</div>
						<div id="free_kick"></div>
					</li>
					<li>
						<div class="value_name">커브</div>
						<div id="curve"></div>
					</li>
				</ul>
				<ul>
					<li>
						<div class="value_name">드리블</div>
						<div id="dribble"></div>
					</li>
					<li>
						<div class="value_name">볼 컨트롤</div>
						<div id="ball_control"></div>
					</li>
					<li>
						<div class="value_name">민첩성</div>
						<div id="agility"></div>
					</li>
					<li>
						<div class="value_name">밸런스</div>
						<div id="balance"></div>
					</li>
					<li>
						<div class="value_name">반응 속도</div>
						<div id="reaction_velocity"></div>
					</li>
					<li>
						<div class="value_name">대인 수비</div>
						<div id="mantoman_defense"></div>
					</li>
					<li>
						<div class="value_name">태클</div>
						<div id="tackle"></div>
					</li>
				</ul>
				<ul>
					<li>
						<div class="value_name">가로채기</div>
						<div id="Interception"></div>
					</li>
					<li>
						<div class="value_name">헤더</div>
						<div id="hader"></div>
					</li>
					<li>
						<div class="value_name">슬라이딩 태클</div>
						<div id="sliding_tackle"></div>
					</li>
					<li>
						<div class="value_name">몸싸움</div>
						<div id="physical_fight"></div>
					</li>
					<li>
						<div class="value_name">스태미너</div>
						<div id="staminer"></div>
					</li>
					<li>
						<div class="value_name">적긍성</div>
						<div id="hostility"></div>
					</li>
					<li>
						<div class="value_name">점프</div>
						<div id="jump"></div>
					</li>
				</ul>
				<ul>
					<li>
						<div class="value_name">침착성</div>
						<div id="calmness"></div>
					</li>
					<li>
						<div class="value_name">GK 다이빙</div>
						<div id="gk_diving"></div>
					</li>
					<li>
						<div class="value_name">GK 핸들링</div>
						<div id="gk_handling"></div>
					</li>
					<li>
						<div class="value_name">GK 킥</div>
						<div id="gk_kick"></div>
					</li>
					<li>
						<div class="value_name">GK 반응속도</div>
						<div id="gk_reaction_velocity"></div>
					</li>
					<li>
						<div class="value_name">GK위치 선정</div>
						<div id="gk_location_selection"></div>
					</li>
					<li style="visibility: hidden;">
						<div class="value_name">빈칸</div>
						<div id="value"></div>
					</li>
				</ul>

			</div>

		</div>
	</div>


</body>
</html>