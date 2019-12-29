package controller;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Random;

import javax.mail.internet.MimeMessage;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSenderImpl;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.mail.javamail.MimeMessagePreparator;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import model.Humor_Board;
import model.LoginCheck;
import model.Member;
import model.Tip_Board;
import service.HumorBoardService;
import service.LoginCheckService;
import service.MemberService;
import service.TipBoardService;

@Controller
public class MemberController {

	@Autowired
	HumorBoardService hservice;
	@Autowired
	TipBoardService tservice;
	@Autowired
	MemberService service;
	@Autowired
	LoginCheckService lservice;
	@Autowired
	private JavaMailSenderImpl mailSender;

	@RequestMapping("LoginForm.do")
	public String LoginForm(HttpSession session) {
		if (session.getAttribute("userid") == null) {
			return "LoginForm";
		} else {
			return "redirect:Community_main.do";
		}
	}

	@RequestMapping("Login.do")
	public String login(Model model, HttpSession session, String id, String pwd) {
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
			} else {
				if (date.equals(lservice.getDate(id))) {
				} else {
					lc.setId(id);
					lc.setDate(date);
					lservice.updateLoginCheck(lc);
					Member m = service.getMemberInfo(id);
					m.setPoint(m.getPoint() + 10);
					service.memberUpdatepoint(m);
				}
			}
			Member m = service.getMemberInfo(id);
			session.setAttribute("member", m);
			session.setAttribute("userid", id); // 로그인성공시 session에 저장해주기
			session.setAttribute("point", m.getPoint());
			model.addAttribute("result", "1");
			return "redirect:" + session.getAttribute("url");
		} else {
			model.addAttribute("result", "2");
			return "LoginForm"; // 로그인 실패시 로그인 창으로 다시 이동
		}
	}

	@RequestMapping("JoinForm.do")
	public String JoinForm() {
		return "JoinForm";
	}

	@RequestMapping("Join.do")
	public String join(Member member) {
		service.joinMember(member);
		return "redirect:LoginForm.do";
	}

	//////////////////////////////////
	@RequestMapping("IdFindForm.do") // 추가
	public String idFindForm() {
		return "IdFindForm";
	}

	@RequestMapping(value = "Getauth.do", method = RequestMethod.POST)
	@ResponseBody
	public String mailsending(HttpServletRequest req, String email, HttpServletResponse response_email) {
		Random r = new Random();
		String authnum = String.valueOf(r.nextInt(4589362) + 49311);

		final MimeMessagePreparator preparator = new MimeMessagePreparator() {
			@Override
			public void prepare(MimeMessage mimeMessage) throws Exception {
				final MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, true, "UTF-8");
				helper.setSubject("ff.gg 인증번호 입니다.");
				helper.setFrom("cck0610@naver.com");
				helper.setTo(email);
				helper.setText("인증 번호는 " + authnum + "입니다.", true);
			}
		};
		mailSender.send(preparator);
		return authnum;
	}

	@RequestMapping(value = "IdFind.do", method = RequestMethod.POST, produces = "text/html; charset=utf8")
	@ResponseBody
	public String authcheck(String email, String userauthnum, String authnum) {
		String result = "";
		if (userauthnum.equals(authnum)) { // 입력한 번호와 보낸 인증번호가 일치할 경우
			String id = service.getId(email);
			if (id == null) { // 해당 id가 없는 경우
				result = "일치하는 id가 없습니다";
			} else {
				result = "회원님의 id는 " + id + " 입니다.";
			}
		} else {// 인증 안된 경우
			result = "false";
		}
		return result;
	}

	@RequestMapping(value = "AuthnumCheck.do", method = RequestMethod.POST)
	@ResponseBody
	public String AuthnumCheck(String userauthnum, String authnum) {
		String result = "";
		if (userauthnum.equals(authnum)) { // 입력한 번호와 보낸 인증번호가 일치할 경우
			result = "true";
		} else {// 인증 안된 경우
			result = "false";
		}
		return result;
	}

	@RequestMapping("PwFindForm.do") // 추가
	public String pwFindForm() {
		return "PwFindForm";
	}

	@RequestMapping(value = "PwFind.do", method = RequestMethod.POST, produces = "text/html; charset=utf8")
	@ResponseBody
	public String pwFind(String id, String email, String userauthnum, String authnum) {

		String result = "";
		if (userauthnum.equals(authnum)) { // 입력한 번호와 보낸 인증번호가 일치할 경우
			HashMap<String, Object> params = new HashMap<String, Object>();
			params.put("id", id);
			params.put("email", email);
			Member member = service.getuseIdEmail(params); // id와 email로 멤버 정보를 가져옴
			if (member == null)
				result = "해당하는 정보가 없습니다."; // 인증번호는 맞으나 해당 정보가 없는 경우
			else
				result = "true";
		} else {// 인증 안된 경우
			result = "false";
		}
		return result;
	}

	@RequestMapping(value = "Getpwd.do", method = RequestMethod.POST)
	@ResponseBody
	public String getpwd(String password) {
		String result = service.getHashpw(password);
		return result;
	}

	@RequestMapping("PwdChange.do")
	public String pwdChange(String id, String pwd, String pwd_check) { // 비밀번호 변경
		Member member = service.getMemberInfo(id);
		String pass = member.getPwd();

		// 아이디와 일치하는 게시물 다 가져옴
		List<Humor_Board> result1 = hservice.selectboard_id(id);
		List<Tip_Board> result2 = tservice.selectboard_id(id);
		// 게시물에 비밀번호를 바꿔줌
		for (Humor_Board hboard : result1) {
			hboard.setPassword(pwd);
			hservice.AllUpdate(hboard);
		}
		for (Tip_Board tBoard : result2) {
			tBoard.setPassword(pwd);
			tservice.AllUpdate(tBoard);
		}

		////////////////////////////////////////////
		member.setPwd(pwd);
		member.setPwd_check(pwd_check);
		service.memberUpdate(member);

		return "redirect:LoginForm.do";
	}

	@RequestMapping("Pointup.do")
	public String pointup(String id) {
		Member member = service.getMemberInfo(id);
		member.setPoint(member.getPoint() + 10);
		service.memberUpdatepoint(member);
		return "redirect:AdminManage.do";
	}

	@RequestMapping("Pointdown.do")
	public String pointdown(String id) {
		Member member = service.getMemberInfo(id);
		int point = member.getPoint() - 10;
		if (point < 0)
			point = 0;
		member.setPoint(point);
		service.memberUpdatepoint(member);
		return "redirect:AdminManage.do";
	}

	///////////////////////////////////
	@RequestMapping("Logout.do")
	public String logout(HttpSession session) {
		String id = (String) session.getAttribute("userid");
		if (id == null) {
			return "redirect:Community_main.do";
		} else {
			session.removeAttribute("userid");
		}
		String url = (String) session.getAttribute("url");
		if (url.contains("Form") || url.contains("Chat")) {
			return "redirect:Community_main.do";
		}
		return "redirect:" + session.getAttribute("url");
	}

	@RequestMapping(value = "Idcheck.do", method = RequestMethod.POST)
	@ResponseBody
	public String idcheck(HttpServletRequest req) {
		String id = req.getParameter("id");
		String idcheck = id.replaceAll("\\p{Z}", ""); // 공백 제거
		if (idcheck.length() == 0) { // 빈공백이면 false
			return "false";
		} else {
			Member member = service.getMemberInfo(idcheck);
			String result = member == null ? "true" : "false";
			return result;
		}
	}

	@RequestMapping(value = "Pwdcheck.do", method = RequestMethod.POST)
	@ResponseBody
	public String pwdcheck(HttpServletRequest req) {
		String pwd = req.getParameter("pwd");
		String pwd_check = req.getParameter("pwd_check");
		String result = pwd.equals(pwd_check) ? "true" : "false";

		return result;
	}

	@RequestMapping(value = "Emailcheck.do", method = RequestMethod.POST)
	@ResponseBody
	public String emailcheck(HttpServletRequest req, HttpSession session) {
		String id = (String) session.getAttribute("userid");
		String email = req.getParameter("email");
		String result = "true";
		List<Member> test = service.getMemberList();
		for (Member m : test) {
			if (m.getEmail().equals(email)) {
				if (m.getId().equals(id)) {
					result = "true";
				} else {
					result = "false";
				}
			}
		}
		return result;
	}

	@RequestMapping("Withdrawal.do")
	public String withthdrawal(HttpSession session, String id) {
		String idcheck = (String) session.getAttribute("userid");
		List<Humor_Board> hboard = hservice.selectboard_id(id);
		List<Tip_Board> tboard = tservice.selectboard_id(id);

		for (Humor_Board humor_Board : hboard) {
			hservice.deleteBoard(humor_Board.getNum(), humor_Board.getPassword());
		}
		for (Tip_Board tip_Board : tboard) {
			tservice.deleteBoard(tip_Board.getNum(), tip_Board.getPassword());
		}

		service.memberDelete(id);
		lservice.deleteLoginCheck(id);

		if (idcheck.equals("admin"))
			return "redirect:AdminManage.do";
		else {
			session.removeAttribute("userid");
			return "redirect:Community_main.do";
		}
	}
}