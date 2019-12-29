package controller;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Map;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.mongodb.client.result.DeleteResult;
import com.sun.org.apache.regexp.internal.RE;

import model.LoginCheck;
import model.Member;
import service.LoginCheckService;
import service.MemberService;
import service.mongoService;

@Controller
public class SquadMakerController {

	@Autowired
	private mongoService mongoService = new mongoService();
	@Autowired
	MemberService service;
	@Autowired
	LoginCheckService lservice;

	// 스쿼드 db에 넣기 리턴 값이 0이면 성공 1이면 실패
	@RequestMapping(value = "inputSquadMade.do", method = RequestMethod.POST)
	@ResponseBody
	public int inputSquadMade(@RequestBody Map<String, Object> map, HttpSession session) {
		String userId = (String) session.getAttribute("userid");
		if (userId != null) {
			map.put("id", userId);
			return mongoService.inputSquad(map);
		} else {
			return 4;
		}
	}

	// 스쿼드 불러오기
	@RequestMapping(value = "showUserSquad.do", method = RequestMethod.GET, produces = "application/text; charset=utf8")
	@ResponseBody
	public String showUserSquad(HttpSession session) {
		String userId = (String) session.getAttribute("userid");
		if (session.getAttribute("userid") != null) {
			return mongoService.outPutSquad(userId).toString();
		} else {
			return null;
		}
	}

	@RequestMapping(value = "deleteSquad.do", method = RequestMethod.POST)
	@ResponseBody
	public DeleteResult deleteSquad(String userId, String squadName) {
		System.out.println(userId);
		return mongoService.deleteSquad(userId, squadName);

	}

	@RequestMapping(value = "SquadLogin.do", method = RequestMethod.POST, produces = "application/text; charset=utf8")
	@ResponseBody
	public String SquadLogin(String id, String pwd, String check, HttpSession session) {

		String hashpw = service.getHashpw(pwd);
		SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd");
		String date = format.format(new Date());
		LoginCheck lc = new LoginCheck();

		if (service.login(id, hashpw)) { // 로그인 성공
			String datecheck = lservice.getDate(id);
			if (datecheck == null) {
				lc.setId(id);
				lc.setDate(date);
				Member m = service.getMemberInfo(id);
				m.setPoint(m.getPoint() + 10);
				service.memberUpdatepoint(m);
				lservice.insertLoginCheck(lc);
			} else if (!date.equals(lservice.getDate(id))) {
				lc.setId(id);
				lc.setDate(date);
				lservice.updateLoginCheck(lc);
				Member m = service.getMemberInfo(id);
				m.setPoint(m.getPoint() + 10);
				service.memberUpdatepoint(m);
			}
			Member m = service.getMemberInfo(id);
			session.setAttribute("member", m);
			session.setAttribute("userid", id); // 로그인성공시 session에 저장해주기
			session.setAttribute("point", m.getPoint());
			if (check.equals("1")) {
				return "1";
			} else {
				return mongoService.outPutSquad(id).toString();
			}
		} else {
			return "0";
		}
	}

	@RequestMapping("SquadLoginForm.do")
	public String squadLoginForm(HttpSession session) {
		return "SquadLoginForm";
	}

	@RequestMapping("SquadJoinForm.do")
	public String squadJoinForm(HttpSession session) {
		return "SquadJoinForm";
	}

	@RequestMapping("SquadIdFindForm.do")
	public String squadIdFindForm(HttpSession session) {
		return "SquadIdFindForm";
	}

	@RequestMapping("SquadPwFindForm.do")
	public String squadPwFindForm(HttpSession session) {
		return "SquadPwFindForm";
	}

}
