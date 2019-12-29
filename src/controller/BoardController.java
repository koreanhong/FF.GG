package controller;

import java.io.UnsupportedEncodingException;

import java.net.URLEncoder;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.propertyeditors.CustomDateEditor;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.WebDataBinder;
import org.springframework.web.bind.annotation.InitBinder;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import model.HumorUpcheck;
import model.Humor_Board;
import model.Member;
import model.ReportUpcheck;
import model.Report_Board;
import model.TipUpcheck;
import model.Tip_Board;
import service.HumorBoardService;
import service.HumorCommentService;
import service.MemberService;
import service.ReportBoardService;
import service.ReportCommentService;
import service.TipBoardService;
import service.TipCommentService;

@Controller
public class BoardController {

	@Autowired
	HumorBoardService hservice;
	@Autowired
	TipBoardService tservice;
	@Autowired
	ReportBoardService rservice;
	@Autowired
	HumorCommentService hcservice;
	@Autowired
	TipCommentService tcservice;
	@Autowired
	ReportCommentService rcservice;
	@Autowired
	MemberService mservice;

	@RequestMapping("Main.do")
	public ModelAndView Main(HttpSession session) {
		session.setAttribute("url", "Main.do");
		session.setAttribute("num", "1");
		ModelAndView mav = new ModelAndView();

		HashMap<String, Object> hresult = hservice.getBoardListup();
		mav.addAllObjects(hresult);

		HashMap<String, Object> tresult = tservice.getBoardListup();
		mav.addAllObjects(tresult);
		String userid = (String) session.getAttribute("userid");
		mav.setViewName("Main");
		return mav;
	}

	@RequestMapping("Community_main.do")
	public ModelAndView community_main(HttpSession session) {
		session.setAttribute("url", "Community_main.do");
		session.setAttribute("num", "2");

		ModelAndView mav = new ModelAndView();

		HashMap<String, Object> hresult = hservice.getBoardList();
		mav.addAllObjects(hresult);

		HashMap<String, Object> tresult = tservice.getBoardList();
		mav.addAllObjects(tresult);
		String userid = (String) session.getAttribute("userid");
		if (userid == null) {
			mav.addObject("result", "2");
		} else {
			mav.addObject("result", "1");
		}
		mav.setViewName("CommunityMain");
		return mav;
	}

	@RequestMapping("Mypage.do")
	public String Mypage(HttpSession session, Model model) {
		String userid = (String) session.getAttribute("userid");

		List<Humor_Board> hboard = hservice.selectboard_id(userid);
		model.addAttribute("hboard", hboard);
		List<Tip_Board> tboard = tservice.selectboard_id(userid);
		model.addAttribute("tboard", tboard);

		Member member = mservice.getMemberInfo(userid);
		if (userid == null) {
			model.addAttribute("result", "2");
		} else {
			model.addAttribute("result", "1");
			model.addAttribute("member", member);
		}
		return "Mypage";
	}

	@RequestMapping("MypageUpdateForm.do")
	public String MypageUpdateForm(HttpSession session, Model model) {
		String userid = (String) session.getAttribute("userid");
		Member member = mservice.getMemberInfo(userid);

		if (userid == null) {
			model.addAttribute("result", "2");
		} else {
			model.addAttribute("member", member);
			model.addAttribute("result", "1");
		}
		return "MypageUpdateForm";
	}

	@RequestMapping("MypageUpdate.do")
	public String MypageUpdate(String name, String id, String pwd, String email, int point, Model model) {
		String hashpwd = mservice.getHashpw(pwd);
		Member member = new Member();
		member.setName(name);
		member.setId(id);
		member.setPwd(pwd);
		member.setEmail(email);
		member.setPoint(point);
		member.setPwd_check(pwd);

		mservice.memberUpdate(member);
		model.addAttribute(member);
		model.addAttribute("result", "1");

		// 아이디와 일치하는 게시물 다 가져옴
		List<Humor_Board> result1 = hservice.selectboard_id(id);
		List<Tip_Board> result2 = tservice.selectboard_id(id);
		// 게시물에 비밀번호를 바꿔줌
		for (Humor_Board hboard : result1) {
			hboard.setPassword(hashpwd);
			hservice.AllUpdate(hboard);
		}
		for (Tip_Board tBoard : result2) {
			tBoard.setPassword(hashpwd);
			tservice.AllUpdate(tBoard);
		}

		return "redirect:Mypage.do";
	}

	@RequestMapping("AdminManage.do")
	public String adminManage(HttpSession session, Model model) {
		String userid = (String) session.getAttribute("userid");
		if (userid == null) {
			model.addAttribute("result", "2");
		} else {
			model.addAttribute("result", "1");
		}

		model.addAttribute("memberList", mservice.getMemberList());
		return "AdminManage";
	}

	@RequestMapping("Humor_view.do")
	public String humor_view(Model model, int num, HttpSession session) {
		session.setAttribute("url", "Humor_view.do?num=" + num);
		if (session.getAttribute("hstring") == null) {
			model.addAttribute("hstring", "");
		} else {

			model.addAttribute("hstring", session.getAttribute("hstring") + "page=" + session.getAttribute("page")); // 뒤로가기용
		}
		String userid = (String) session.getAttribute("userid");
		if (userid == null) {
			model.addAttribute("result", "2");
		} else {
			model.addAttribute("result", "1");
		}

		HashMap<String, Object> result = hcservice.selectAll(num);
		model.addAllAttributes(result);
		HashMap<String, Object> result2 = hcservice.selectAll2(num);
		model.addAllAttributes(result2);
		model.addAttribute("humorboard", hservice.readBoard(num));
		return "HumorView";
	}

	@RequestMapping("Humor_Up.do")
	public String humor_Up(HttpSession session, int num, Model model) {
		Humor_Board board = hservice.getBoard(num);
		board.setUp(board.getUp() + 1);
		board.setReadCount(board.getReadCount() - 1);
		hservice.updateBoard(board);

		HumorUpcheck u = new HumorUpcheck();
		String userid = (String) session.getAttribute("userid");
		u.setId(userid);
		u.setNum(num);
		u.setUp(1);
		hservice.insert(u);

		if (userid == null) {
			model.addAttribute("result", "2");
		} else {
			model.addAttribute("result", "1");
		}

		return "redirect:" + session.getAttribute("url");
	}

	@RequestMapping("Humor_Main.do")
	public ModelAndView humor_boardList(@RequestParam(defaultValue = "1") int page,
			@RequestParam(required = false) String keyword, @RequestParam(defaultValue = "0") int type,
			@RequestParam(required = false) String startdate, @RequestParam(required = false) String enddate,
			HttpSession session) {
		session.setAttribute("num", "3");

		ModelAndView mav = new ModelAndView();
		HashMap<String, Object> params = new HashMap<String, Object>();
		params.put("type", type);

		String str = "?";// 처음엔 ?만
		String datestr = ""; // 날짜용 str

		if ((startdate == "" && enddate == "") || (startdate == null && enddate == null)) {
			// 날짜 입력 없는 경우 아무처리도 하지 않음
		} else { // 날짜 입력 있을 경우
			params.put("startdate", startdate);
			params.put("enddate", enddate);
			datestr = "startdate=" + startdate + "&enddate=" + enddate + "&"; // string만들기 위한 문자열
		}

		// type이
		// 1이면 title검색
		// 2면 content검색
		// 3이면 title과 content모두 검색
		// 4면 작성자(name) 검색
		if (type == 1) {
			params.put("title", keyword);
		} else if (type == 2) {
			params.put("content", keyword);
		} else if (type == 3) {
			params.put("title", keyword);
			params.put("content", keyword);
		} else if (type == 4) {
			params.put("name", keyword);
		}
		// 뒤로가기용 string,page --> session에 저장
		session.setAttribute("hstring", str + datestr + "type=" + type + "&keyword=" + keyword + "&");
		session.setAttribute("page", page);

		HashMap<String, Object> result = hservice.getBoardListPage(params, page);
		mav.addAllObjects(result);
		mav.addAllObjects(params);
		mav.addObject("hstring", session.getAttribute("hstring"));

		session.setAttribute("url", "Humor_Main.do" + session.getAttribute("hstring"));
		String userid = (String) session.getAttribute("userid"); // 로그인 확인
		//////////// 수정본///////////////

		if (userid == null) {
			mav.addObject("result", "2");
		} else {
			mav.addObject("result", "1");
		}
		mav.setViewName("HumorMain");

		return mav;
	}

	@RequestMapping("Humor_updateForm.do")
	public String humor_updateForm(Model model, int num, HttpSession session) {
		session.setAttribute("url", "Humor_updateForm.do");
		Humor_Board board = hservice.getBoard(num);
		board.setContent(board.getContent().replace("<br />", "\n"));
		model.addAttribute("humorboard", board);
		
		String userid = (String) session.getAttribute("userid");
		if (userid == null) {
			model.addAttribute("result", "2");
		} else {
			model.addAttribute("result", "1");
		}
		return "HumorUpdateForm";
	}

	@RequestMapping("Humor_update.do")
	public String humor_update(Humor_Board board) {
		board.setPassword(mservice.getHashpw(board.getPassword()));
		hservice.updateBoard(board);
		return "redirect:Humor_view.do?num=" + board.getNum();
	}

	@RequestMapping("Humor_insertForm.do")
	public String humor_insertForm(Model model, HttpSession session) {
		session.setAttribute("url", "Humor_insertForm.do");

		model.addAttribute("hstring", session.getAttribute("hstring") + "page=" + session.getAttribute("page")); // 뒤로가기용

		model.addAttribute("userid", session.getAttribute("userid")); // 로그인한 유저의 아이디 사용하기 위함
		String userid = (String) session.getAttribute("userid");
		if (userid == null) {
			model.addAttribute("result", "2");
		} else {
			model.addAttribute("result", "1");
		}

		return "HumorInsertForm";
	}

	@RequestMapping("Humor_insert.do")
	public String humor_insert(Humor_Board board, HttpSession session) {

		// 띄어쓰기 수정하기
		int count = board.getContent().length() / 150;
		int index = 150;
		for (int i = 0; i < count; i++) {
			String content = board.getContent();
			String sub = content.substring(0, index);
			board.setContent(sub + "<br>" + content.substring(sub.length(), content.length()));
			index += 154;
		}
		String userid = (String) session.getAttribute("userid");
		String pwd = mservice.getPw(userid);
		board.setPassword(pwd);

		hservice.writeBoard(board);
		return "redirect:Humor_view.do?num=" + board.getNum();
	}

	@RequestMapping("Humor_delete.do")
	public String humor_delete(Model model, int num, String password, HttpSession session) {
		String hashpwd = mservice.getHashpw(password);
		hservice.deleteBoard(num, hashpwd);
		String str = (String) session.getAttribute("hstring");
		try {
			String[] strr = str.split("&"); // &을 기준으로 나눔
			for (int i = 0; i < strr.length; i++) {
				if (strr[i].charAt(0) == 'k') { // keyword인부분을 잘라서
					String[] strrr = strr[i].split("=");
					strr[i] = strrr[0] + "=" + URLEncoder.encode(strrr[1], "UTF-8"); // keyword부분을 UTF-8로 인코딩
				}
			}
			str = "";
			for (int i = 0; i < strr.length; i++) { // 다시 붙혀주기
				str += strr[i] + "&";
			}
		} catch (UnsupportedEncodingException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

		return "redirect:Humor_Main.do" + str;
		// 삭제 후 보던 페이지로 이동
	}

	@RequestMapping(value = "Humor_upcheck.do", method = RequestMethod.POST)
	@ResponseBody
	public String humor_upcheck(HttpSession session, HttpServletRequest req) {
		int num = Integer.parseInt(req.getParameter("num"));
		String userid = (String) session.getAttribute("userid");
		int upcnt = hservice.getUp(userid, num);
		if (upcnt == 1) {
			return "false";
		}
		return "true";
	}

	// ==================================================================================

	@RequestMapping("Tip_view.do")
	public String tip_view(Model model, int num, HttpSession session) {
		session.setAttribute("url", "Tip_view.do?num=" + num);
		if (session.getAttribute("tstring") == null) {
			model.addAttribute("tstring", "");
		} else {
			model.addAttribute("tstring", session.getAttribute("tstring") + "page=" + session.getAttribute("page")); // 뒤로가기용
		}
		String userid = (String) session.getAttribute("userid");
		if (userid == null) {
			model.addAttribute("result", "2");
		} else {
			model.addAttribute("result", "1");
		}
		HashMap<String, Object> result = tcservice.selectAll(num);
		model.addAllAttributes(result);
		HashMap<String, Object> result2 = tcservice.selectAll2(num);
		model.addAllAttributes(result2);
		model.addAttribute("tipboard", tservice.readBoard(num));

		return "TipView";
	}

	@RequestMapping("Tip_Up.do")
	public String tip_Up(HttpSession session, int num, Model model) {
		Tip_Board board = tservice.getBoard(num);
		board.setUp(board.getUp() + 1);
		board.setReadCount(board.getReadCount() - 1);
		tservice.updateBoard(board);
		TipUpcheck u = new TipUpcheck();
		String userid = (String) session.getAttribute("userid");
		u.setId(userid);
		u.setNum(num);
		u.setUp(1);
		tservice.insert(u);
		if (userid == null) {
			model.addAttribute("result", "2");
		} else {
			model.addAttribute("result", "1");
		}

		return "redirect:" + session.getAttribute("url");
	}

	@RequestMapping("Tip_Main.do")
	public ModelAndView tip_boardList(@RequestParam(defaultValue = "1") int page,
			@RequestParam(required = false) String keyword, @RequestParam(defaultValue = "0") int type,
			@RequestParam(required = false) String startdate, @RequestParam(required = false) String enddate,
			HttpSession session) {

		session.setAttribute("num", "3");
		ModelAndView mav = new ModelAndView();
		HashMap<String, Object> params = new HashMap<String, Object>();
		params.put("type", type);

		String str = "?";// 처음엔 ?만
		String datestr = ""; // 날짜용 str

		if ((startdate == "" && enddate == "") || (startdate == null && enddate == null)) {
			// 날짜 입력 없는 경우 아무처리도 하지 않음
		} else { // 날짜 입력 있을 경우
			params.put("startdate", startdate);
			params.put("enddate", enddate);
			datestr = "startdate=" + startdate + "&enddate=" + enddate + "&"; // string만들기 위한 문자열
		}

		// type이
		// 1이면 title검색
		// 2면 content검색
		// 3이면 title과 content모두 검색
		// 4면 작성자(name) 검색
		if (type == 1) {
			params.put("title", keyword);
		} else if (type == 2) {
			params.put("content", keyword);
		} else if (type == 3) {
			params.put("title", keyword);
			params.put("content", keyword);
		} else if (type == 4) {
			params.put("name", keyword);
		}
		// 뒤로가기용 string,page --> session에 저장
		session.setAttribute("tstring", str + datestr + "type=" + type + "&keyword=" + keyword + "&");
		session.setAttribute("page", page);

		HashMap<String, Object> result = tservice.getBoardListPage(params, page);
		mav.addAllObjects(result);
		mav.addAllObjects(params);
		mav.addObject("tstring", session.getAttribute("tstring"));

		String userid = (String) session.getAttribute("userid");

		if (userid == null) {
			mav.addObject("result", "2");
		} else {
			mav.addObject("result", "1");
			int point = mservice.getMemberInfo(userid).getPoint();
			mav.addObject("point", point);
		}
		session.setAttribute("url", "Tip_Main.do" + session.getAttribute("tstring"));
		mav.setViewName("TipMain");

		return mav;
	}

	@RequestMapping("Tip_updateForm.do")
	public String tip_updateForm(Model model, int num, HttpSession session) {
		session.setAttribute("url", "Tip_updateForm.do");
		Tip_Board board = tservice.getBoard(num);
		board.setContent(board.getContent().replace("<br />", "\n"));
		model.addAttribute("tipboard", board);

		String userid = (String) session.getAttribute("userid");
		if (userid == null) {
			model.addAttribute("result", "2");
		} else {
			model.addAttribute("result", "1");
		}

		return "TipUpdateForm";
	}

	@RequestMapping("Tip_update.do")
	public String tip_update(Tip_Board board) {
		board.setPassword(mservice.getHashpw(board.getPassword()));
		tservice.updateBoard(board);
		return "redirect:Tip_view.do?num=" + board.getNum();
	}

	@RequestMapping("Tip_insertForm.do")
	public String tip_insertForm(Model model, HttpSession session) {
		session.setAttribute("url", "Tip_insertForm.do");
		model.addAttribute("tstring", session.getAttribute("tstring") + "page=" + session.getAttribute("page")); // 뒤로가기용
		model.addAttribute("userid", session.getAttribute("userid")); // 로그인한 유저의 아이디와 이메일 사용하기 위함

		String userid = (String) session.getAttribute("userid");
		if (userid == null) {
			model.addAttribute("result", "2");
		} else {
			model.addAttribute("result", "1");
		}

		return "TipInsertForm";
	}

	@RequestMapping("Tip_insert.do")
	public String tip_insert(Tip_Board board, HttpSession session) {
		// 띄어쓰기 수정하기
		int count = board.getContent().length() / 150;
		int index = 150;
		for (int i = 0; i < count; i++) {
			String content = board.getContent();
			String sub = content.substring(0, index);
			board.setContent(sub + "<br>" + content.substring(sub.length(), content.length()));
			index += 154;
		}
		String userid = (String) session.getAttribute("userid");
		String pwd = mservice.getPw(userid);
		board.setPassword(pwd);

		tservice.writeBoard(board);
		return "redirect:Tip_view.do?num=" + board.getNum();
	}

	@RequestMapping("Tip_delete.do")
	public String tip_delete(Model model, int num, String password, HttpSession session) {
		String hashpwd = mservice.getHashpw(password);
		tservice.deleteBoard(num, hashpwd);
		String str = (String) session.getAttribute("tstring");
		try {
			String[] strr = str.split("&"); // &을 기준으로 나눔
			for (int i = 0; i < strr.length; i++) {
				if (strr[i].charAt(0) == 'k') { // keyword인부분을 잘라서
					String[] strrr = strr[i].split("=");
					strr[i] = strrr[0] + "=" + URLEncoder.encode(strrr[1], "UTF-8"); // keyword부분을 UTF-8로 인코딩
				}
			}
			str = "";
			for (int i = 0; i < strr.length; i++) { // 다시 붙혀주기
				str += strr[i] + "&";
			}

		} catch (UnsupportedEncodingException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

		return "redirect:Tip_Main.do" + str;
		// 삭제 후 보던 페이지로 이동
	}

	@RequestMapping(value = "Tip_upcheck.do")
	@ResponseBody
	public String tip_upcheck(HttpSession session, HttpServletRequest req) {

		int num = Integer.parseInt(req.getParameter("num"));
		String userid = (String) session.getAttribute("userid");
		int upcnt = tservice.getUp(userid, num);
		if (upcnt == 1) {
			return "false";
		}
		return "true";
	}

	// ==========================================================================

	@RequestMapping("Report_view.do")
	public String report_view(Model model, int num, HttpSession session) {
		session.setAttribute("url", "Report_view.do?num=" + num);
		if (session.getAttribute("rstring") == null) {
			model.addAttribute("rstring", "");
		} else {

			model.addAttribute("rstring", session.getAttribute("rstring") + "page=" + session.getAttribute("page")); // 뒤로가기용
		}
		String userid = (String) session.getAttribute("userid");
		if (userid == null) {
			model.addAttribute("result", "2");
		} else {
			model.addAttribute("result", "1");
		}

		HashMap<String, Object> result = rcservice.selectAll(num);
		model.addAllAttributes(result);
		HashMap<String, Object> result2 = rcservice.selectAll2(num);
		model.addAllAttributes(result2);
		model.addAttribute("reportboard", rservice.readBoard(num));
		return "ReportView";
	}

	@RequestMapping("Report_Up.do")
	public String report_Up(HttpSession session, int num, Model model) {
		Report_Board board = rservice.getBoard(num);
		board.setUp(board.getUp() + 1);
		board.setReadCount(board.getReadCount() - 1);
		rservice.updateBoard(board);

		ReportUpcheck u = new ReportUpcheck();
		String userid = (String) session.getAttribute("userid");
		u.setId(userid);
		u.setNum(num);
		u.setUp(1);
		rservice.insert(u);

		if (userid == null) {
			model.addAttribute("result", "2");
		} else {
			model.addAttribute("result", "1");
		}

		return "redirect:" + session.getAttribute("url");
	}

	@RequestMapping("Report_Main.do")
	public ModelAndView report_boardList(@RequestParam(defaultValue = "1") int page,
			@RequestParam(required = false) String keyword, @RequestParam(defaultValue = "0") int type,
			@RequestParam(required = false) String startdate, @RequestParam(required = false) String enddate,
			HttpSession session) {
		session.setAttribute("num", "3");

		ModelAndView mav = new ModelAndView();
		HashMap<String, Object> params = new HashMap<String, Object>();
		params.put("type", type);

		String str = "?";// 처음엔 ?만
		String datestr = ""; // 날짜용 str

		if ((startdate == "" && enddate == "") || (startdate == null && enddate == null)) {
			// 날짜 입력 없는 경우 아무처리도 하지 않음
		} else { // 날짜 입력 있을 경우
			params.put("startdate", startdate);
			params.put("enddate", enddate);
			datestr = "startdate=" + startdate + "&enddate=" + enddate + "&"; // string만들기 위한 문자열
		}

		// type이
		// 1이면 title검색
		// 2면 content검색
		// 3이면 title과 content모두 검색
		// 4면 작성자(name) 검색
		if (type == 1) {
			params.put("title", keyword);
		} else if (type == 2) {
			params.put("content", keyword);
		} else if (type == 3) {
			params.put("title", keyword);
			params.put("content", keyword);
		} else if (type == 4) {
			params.put("name", keyword);
		}
		// 뒤로가기용 string,page --> session에 저장
		session.setAttribute("rstring", str + datestr + "type=" + type + "&keyword=" + keyword + "&");
		session.setAttribute("page", page);

		HashMap<String, Object> result = rservice.getBoardListPage(params, page);
		mav.addAllObjects(result);
		mav.addAllObjects(params);
		mav.addObject("rstring", session.getAttribute("rstring"));

		session.setAttribute("url", "Report_Main.do" + session.getAttribute("rstring"));
		String userid = (String) session.getAttribute("userid"); // 로그인 확인
		//////////// 수정본///////////////

		if (userid == null) {
			mav.addObject("result", "2");
		} else {
			mav.addObject("result", "1");
		}
		mav.setViewName("ReportMain");

		return mav;
	}

	@RequestMapping("Report_updateForm.do")
	public String report_updateForm(Model model, int num, HttpSession session) {
		session.setAttribute("url", "Report_updateForm.do");
		Report_Board board = rservice.getBoard(num);
		board.setContent(board.getContent().replace("<br />", "\n"));
		model.addAttribute("reportboard", board);
		
		String userid = (String) session.getAttribute("userid");
		if (userid == null) {
			model.addAttribute("result", "2");
		} else {
			model.addAttribute("result", "1");
		}
		return "ReportUpdateForm";
	}

	@RequestMapping("Report_update.do")
	public String report_update(Report_Board board) {

		board.setPassword(mservice.getHashpw(board.getPassword()));
		rservice.updateBoard(board);
		return "redirect:Report_view.do?num=" + board.getNum();
	}

	@RequestMapping("Report_insertForm.do")
	public String report_insertForm(Model model, HttpSession session) {
		session.setAttribute("url", "Report_insertForm.do");

		model.addAttribute("rstring", session.getAttribute("rstring") + "page=" + session.getAttribute("page")); // 뒤로가기용

		model.addAttribute("userid", session.getAttribute("userid")); // 로그인한 유저의 아이디 사용하기 위함
		String userid = (String) session.getAttribute("userid");
		if (userid == null) {
			model.addAttribute("result", "2");
		} else {
			model.addAttribute("result", "1");
		}

		return "ReportInsertForm";
	}

	@RequestMapping("Report_insert.do")
	public String report_insert(Report_Board board, HttpSession session) {

		// 띄어쓰기 수정하기
		int count = board.getContent().length() / 150;
		int index = 150;
		for (int i = 0; i < count; i++) {
			String content = board.getContent();
			String sub = content.substring(0, index);
			board.setContent(sub + "<br>" + content.substring(sub.length(), content.length()));
			index += 154;
		}
		String userid = (String) session.getAttribute("userid");
		String pwd = mservice.getPw(userid);
		board.setPassword(pwd);

		rservice.writeBoard(board);
		return "redirect:Report_view.do?num=" + board.getNum();
	}

	@RequestMapping("Report_delete.do")
	public String report_delete(Model model, int num, String password, HttpSession session) {
		String hashpwd = mservice.getHashpw(password);
		rservice.deleteBoard(num, hashpwd);
		String str = (String) session.getAttribute("rstring");
		try {
			String[] strr = str.split("&"); // &을 기준으로 나눔
			for (int i = 0; i < strr.length; i++) {
				if (strr[i].charAt(0) == 'k') { // keyword인부분을 잘라서
					String[] strrr = strr[i].split("=");
					strr[i] = strrr[0] + "=" + URLEncoder.encode(strrr[1], "UTF-8"); // keyword부분을 UTF-8로 인코딩
				}
			}
			str = "";
			for (int i = 0; i < strr.length; i++) { // 다시 붙혀주기
				str += strr[i] + "&";
			}
		} catch (UnsupportedEncodingException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

		return "redirect:Report_Main.do" + str;
		// 삭제 후 보던 페이지로 이동
	}

	@RequestMapping("Chat.do")
	public String chat(String id, Model model, HttpSession session) {
		session.setAttribute("url", "Chat.do");
		String userid = (String) session.getAttribute("userid");
		if (userid == null) {
			model.addAttribute("result", 2);
		} else {
			model.addAttribute("result", 1);
		}
		model.addAttribute("userid", id);

		return "Chat";
	}

	@RequestMapping(value = "HashpwdCheck.do", method = RequestMethod.POST)
	@ResponseBody
	public String PwdCheck(String pwd, HttpSession session) {
		String result = "";
		String userid = (String) session.getAttribute("userid");
		String password = mservice.getHashpw(pwd);
		if (password.equals(mservice.getPw(userid))) {
			result = "true";
		} else {
			result = "false";
		}
		return result;
	}

	@RequestMapping(value = "Report_upcheck.do")
	@ResponseBody
	public String report_upcheck(HttpSession session, HttpServletRequest req) {

		int num = Integer.parseInt(req.getParameter("num"));
		String userid = (String) session.getAttribute("userid");
		int upcnt = rservice.getUp(userid, num);
		if (upcnt == 1) {
			return "false";
		}
		return "true";
	}

	@InitBinder
	public void initBinder(WebDataBinder binder) { // format을 yyyy-MM-dd 로 초기화 및 고정 시키기
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
		binder.registerCustomEditor(Date.class, new CustomDateEditor(sdf, true));
	}
}
