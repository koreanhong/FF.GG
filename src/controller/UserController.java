package controller;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import model.UserInfo;
import service.UserService;

@Controller
public class UserController {
	@Autowired
	private UserService us;

	@RequestMapping(value = "GetInfo.do", method = RequestMethod.GET)
	@ResponseBody
	public void getInfo(HttpServletRequest req, HttpServletResponse resp) {
		String nickname = req.getParameter("nickname");
		int limit = Integer.parseInt(req.getParameter("limit"));
		UserInfo u = us.getAccessID(nickname);
		String accessid = u.getAccessId();
		String[] MatchID = us.getMatchID(accessid, limit);
		String[] MatchInfo = new String[MatchID.length];
		String resultstr = "";
		resultstr += "{\"MatchInfo\":[";
		for (int i = 0; i < MatchID.length; i++) {
			MatchInfo[i] = us.getInfo(MatchID[i]);
			MatchInfo[i] = MatchInfo[i].substring(1, MatchInfo[i].length() - 1);
			resultstr += MatchInfo[i];
			if (i != MatchInfo.length - 1)
				resultstr += ",";
		}
		resultstr += "]}";

		resp.setContentType("text/html; charset=UTF-8"); // 해줘야 한글 제대로 날아감
		PrintWriter pw;
		try {
			pw = resp.getWriter();
			pw.println(resultstr);
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

	}

	@RequestMapping(value = "GetLevel.do", method = RequestMethod.GET)
	@ResponseBody
	public void getLevel(HttpServletRequest req, HttpServletResponse resp) {

		String nickname = req.getParameter("nickname");
		UserInfo u = us.getAccessID(nickname);
		int level = u.getLevel();
		String resultstr = "";
		resultstr += "{\"level\":";
		resultstr += "\"" + level + "\"}";

		resp.setContentType("text/html; charset=UTF-8"); // 해줘야 한글 제대로 날아감
		PrintWriter pw;
		try {
			pw = resp.getWriter();
			pw.println(resultstr);
		} catch (IOException e) {

			e.printStackTrace();
		}
	}

	@RequestMapping(value = "GetDivision.do", method = RequestMethod.GET)
	@ResponseBody
	public void getDivisionnum(HttpServletRequest req, HttpServletResponse resp) {
		String nickname = req.getParameter("nickname");
		UserInfo u = us.getAccessID(nickname);
		String accessid = u.getAccessId();

		String result = us.getDivision(accessid);
		if (result.length() == 2) {
			result = "{\"division\":1}";
		} else if (result.length() == 74) {
			result = result.substring(1, result.length() - 1);
		} else {
			String[] arr = result.split("}");
			result = arr[0].substring(1);
			result += "}";
		}

		resp.setContentType("text/html; charset=UTF-8"); // 해줘야 한글 제대로 날아감
		PrintWriter pw;
		try {
			pw = resp.getWriter();
			pw.println(result);
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}

	@RequestMapping(value = "GetTrade.do", method = RequestMethod.GET)
	@ResponseBody
	public void getTrade(HttpServletRequest req, HttpServletResponse resp) {
		String nickname = req.getParameter("nickname");
		String tradetype = req.getParameter("tradetype");
		UserInfo u = us.getAccessID(nickname);
		String accessid = u.getAccessId();

		String result = us.getTrade(accessid, tradetype);

		resp.setContentType("text/html; charset=UTF-8"); // 해줘야 한글 제대로 날아감
		PrintWriter pw;
		try {
			pw = resp.getWriter();
			pw.println(result);
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}

	@RequestMapping(value = "GetRanking.do", method = RequestMethod.GET)
	@ResponseBody
	public void getRanking(HttpServletRequest req, HttpServletResponse resp) {

		String result = us.getRanking();
		resp.setContentType("text/html; charset=UTF-8");
		PrintWriter pw;
		try {
			pw = resp.getWriter();
			pw.println(result);
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}


	@RequestMapping("UserInfo.do")
	public void UserInfo() {

	}

	@RequestMapping("RankingInfo.do")
	public void RankingInfo() {

	}
	
	@RequestMapping("squadMaker.do")
	public void squadMaker() {
		
	}
	@RequestMapping("NoId.do")
	public void NoId() {
		
	}
	@RequestMapping("NoInfo.do")
	public void NoInfo() {
		
	}

}