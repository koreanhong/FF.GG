function getDivision(divisionnum) { //등급 번호를 기준으로 등급 반환
	var division = "";
	if (divisionnum == 1)
		division = "정보없음";
	if (divisionnum == 800)
		division = "슈퍼챔피언스";
	if (divisionnum == 900)
		division = "챔피언스";
	if (divisionnum == 1100)
		division = "챌린지";
	if (divisionnum == 2000)
		division = "월드클래스1";
	if (divisionnum == 2100)
		division = "월드클래스2";
	if (divisionnum == 2200)
		division = "월드클래스3";
	if (divisionnum == 2300)
		division = "프로1";
	if (divisionnum == 2400)
		division = "프로2";
	if (divisionnum == 2500)
		division = "프로3";
	if (divisionnum == 2600)
		division = "세미프로1";
	if (divisionnum == 2700)
		division = "세미프로2";
	if (divisionnum == 2800)
		division = "세미프로3";
	if (divisionnum == 2900)
		division = "아마1";
	if (divisionnum == 3000)
		division = "아마2";
	if (divisionnum == 3100)
		division = "아마3";
	return division;
}
function getgradeImg(divisionnum) { //등급 번호를 기준으로 등급 반환
	var img = "";
	if (divisionnum == 1)
		img = "../images/정보없음.PNG";
	if (divisionnum == 800)
		img = "../images/슈퍼챔피언스.PNG";
	if (divisionnum == 900)
		img ="../images/챔피언스.PNG";
	if (divisionnum == 1100)
		img = "../images/챌린지.PNG";
	if (divisionnum == 2000)
		img = "../images/월드클래스1.PNG";
	if (divisionnum == 2100)
		img = "../images/월드클래스2.PNG";
	if (divisionnum == 2200)
		img = "../images/월드클래스3.PNG";
	if (divisionnum == 2300)
		img = "../images/프로1.PNG";
	if (divisionnum == 2400)
		img = "../images/프로2.PNG";
	if (divisionnum == 2500)
		img = "../images/프로3.PNG";
	if (divisionnum == 2600)
		img = "../images/세미프로1.PNG";
	if (divisionnum == 2700)
		img = "../images/세미프로2.PNG";
	if (divisionnum == 2800)
		img = "../images/세미프로3.PNG";
	if (divisionnum == 2900)
		img = "../images/아마추어1.PNG";
	if (divisionnum == 3000)
		img = "../images/아마추어2.PNG";
	if (divisionnum == 3100)
		img = "../images/아마추어3.PNG";
	
	return img;
}

function getPosition(pnum) { //포지션 번호로 포지션 이름 받아오는 함수
	var position = "";
	if (pnum == 0) {
		position = "GK";
	}
	if (pnum == 1) {
		position = "SW";
	}
	if (pnum == 2) {
		position = "RWB";
	}
	if (pnum == 3) {
		position = "RB";
	}
	if (pnum == 4) {
		position = "RCB";
	}
	if (pnum == 5) {
		position = "CB";
	}
	if (pnum == 6) {
		position = "LCB";
	}
	if (pnum == 7) {
		position = "LB";
	}
	if (pnum == 8) {
		position = "LWB";
	}
	if (pnum == 9) {
		position = "RDM";
	}
	if (pnum == 10) {
		position = "CDM";
	}
	if (pnum == 11) {
		position = "LDM";
	}
	if (pnum == 12) {
		position = "RM";
	}
	if (pnum == 13) {
		position = "RCM";
	}
	if (pnum == 14) {
		position = "CM";
	}
	if (pnum == 15) {
		position = "LCM";
	}
	if (pnum == 16) {
		position = "LM";
	}
	if (pnum == 17) {
		position = "RAM";
	}
	if (pnum == 18) {
		position = "CAM";
	}
	if (pnum == 19) {
		position = "LAM";
	}
	if (pnum == 20) {
		position = "RF";
	}
	if (pnum == 21) {
		position = "CF";
	}
	if (pnum == 22) {
		position = "LF";
	}
	if (pnum == 23) {
		position = "RW";
	}
	if (pnum == 24) {
		position = "RS";
	}
	if (pnum == 25) {
		position = "ST";
	}
	if (pnum == 26) {
		position = "LS";
	}
	if (pnum == 27) {
		position = "LW";
	}
	if (pnum == 28) {
		position = "SUB";
	}
	return position;
}