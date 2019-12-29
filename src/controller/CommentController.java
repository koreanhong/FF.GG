package controller;

import java.util.HashMap;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

import model.HumorCocomment;
import model.HumorComment;
import model.ReportCocomment;
import model.ReportComment;
import model.TipCocomment;
import model.TipComment;
import service.HumorCommentService;
import service.ReportCommentService;
import service.TipCommentService;

@Controller
public class CommentController {

	@Autowired
	HumorCommentService hservice;
	@Autowired
	TipCommentService tservice;
	@Autowired
	ReportCommentService rservice;

	@RequestMapping("Humor_comment.do")
	public String humor_comment(HttpSession session, String text, int num, Model model) {
		HumorComment comment = new HumorComment();
		String id = (String) session.getAttribute("userid");
		comment.setId(id);
		comment.setContent(text);
		comment.setBoardnum(num);
		hservice.insertComment(comment);

		return "redirect:Humor_view.do?num=" + num;
	}

	@RequestMapping("Humor_commentdel.do")
	public String humor_commentdel(int boardnum, int num) {

		hservice.deleteComment(num);
		return "redirect:Humor_view.do?num=" + boardnum;
	}

	@RequestMapping("Tip_comment.do")
	public String tip_comment(HttpSession session, String text, int num, Model model) {
		TipComment comment = new TipComment();
		String id = (String) session.getAttribute("userid");

		comment.setId(id);
		comment.setContent(text);
		comment.setBoardnum(num);
		tservice.insertComment(comment);

		return "redirect:Tip_view.do?num=" + num;
	}

	@RequestMapping("Tip_commentdel.do")
	public String tip_commentdel(int boardnum, int num) {

		tservice.deleteComment(num);
		return "redirect:Tip_view.do?num=" + boardnum;
	}
	
	@RequestMapping("Humor_cocomment.do")
	public String humor_cocomment(HttpSession session, String content, int humorboardNum, int commentNum) {
		String userid = (String)session.getAttribute("userid");
		HumorCocomment cocomment = new HumorCocomment();
		cocomment.setUserid(userid);
		cocomment.setContent(content);
		cocomment.setHumorboardNum(humorboardNum);
		cocomment.setCommentNum(commentNum);
		hservice.insertCocomment(cocomment);
		
		
		return "redirect:Humor_view.do?num=" + humorboardNum;
	}
	
	@RequestMapping("Humor_cocommentdelete.do")
	public String humor_cocommentdelete(int num,int boardnum) {
		hservice.deleteCocomment(num);
		return "redirect:Humor_view.do?num=" + boardnum;
	}
	
	@RequestMapping("Tip_cocomment.do")
	public String tip_cocomment(HttpSession session, String content, int tipboardNum, int commentNum) {
		String userid = (String)session.getAttribute("userid");
		TipCocomment cocomment = new TipCocomment();
		cocomment.setUserid(userid);
		cocomment.setContent(content);
		cocomment.setTipboardNum(tipboardNum);
		cocomment.setCommentNum(commentNum);
		
		tservice.insertCocomment(cocomment);
		
		return "redirect:Tip_view.do?num=" + tipboardNum;
	}
	
	@RequestMapping("Tip_cocommentdelete.do")
	public String tip_cocommentdelete(int num,int boardnum) {
		tservice.deleteCocomment(num);
		return "redirect:Tip_view.do?num=" + boardnum;
	}
	
	@RequestMapping("Report_comment.do")
	public String report_comment(HttpSession session, String text, int num, Model model) {
		ReportComment comment = new ReportComment();
		String id = (String) session.getAttribute("userid");
		comment.setId(id);
		comment.setContent(text);
		comment.setBoardnum(num);
		rservice.insertComment(comment);

		return "redirect:Report_view.do?num=" + num;
	}

	@RequestMapping("Report_commentdel.do")
	public String report_commentdel(int boardnum, int num) {

		rservice.deleteComment(num);
		return "redirect:Report_view.do?num=" + boardnum;
	}
	@RequestMapping("Report_cocomment.do")
	public String report_cocomment(HttpSession session, String content, int reportboardNum, int commentNum) {
		String userid = (String)session.getAttribute("userid");
		ReportCocomment cocomment = new ReportCocomment();
		cocomment.setUserid(userid);
		cocomment.setContent(content);
		cocomment.setReportboardNum(reportboardNum);
		cocomment.setCommentNum(commentNum);
		
		rservice.insertCocomment(cocomment);
		
		return "redirect:Report_view.do?num=" + reportboardNum;
	}
	
	@RequestMapping("Report_cocommentdelete.do")
	public String report_cocommentdelete(int num,int boardnum) {
		rservice.deleteCocomment(num);
		return "redirect:Report_view.do?num=" + boardnum;
	}

}