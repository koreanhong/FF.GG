package controller;

import java.io.UnsupportedEncodingException;


import java.net.URLEncoder;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

import model.Humor_Board;
import model.Report_Board;
import model.Tip_Board;
import service.AdminService;
import service.HumorBoardService;
import service.HumorCommentService;
import service.MemberService;
import service.ReportBoardService;
import service.ReportCommentService;
import service.TipBoardService;
import service.TipCommentService;

@Controller
public class AdminController {

   @Autowired
   AdminService service;
   @Autowired
   HumorBoardService hservice;
   @Autowired
   TipBoardService tservice;
   @Autowired
   HumorCommentService hcservice;
   @Autowired
   TipCommentService tcservice;
   @Autowired
   ReportBoardService rservice;
   @Autowired
   ReportCommentService rcservice;
   @Autowired
   MemberService mservice;

   @RequestMapping("adminHumorBoardDelete.do")
   public String adminHumorBoardDelete(Model model, int num, String password, HttpSession session) {
      service.adminHumorBoardDelete(num);
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

   @RequestMapping("adminHumorBoardUpdate.do")
   public String adminHumorBoardUpdate(int num, String password, String name, String title, String content, int readCount, String writedate, int up) {
	   SimpleDateFormat transFormat = new SimpleDateFormat("yyyy-MM-dd");
	   Date date = null;
	   try {
		date = transFormat.parse(writedate);
	} catch (ParseException e) {
		// TODO Auto-generated catch block
		e.printStackTrace();
	}
	   Humor_Board board = new Humor_Board();
	   board.setNum(num);
	   board.setPassword(password);
	   board.setName(name);
	   board.setTitle(title);
	   board.setContent(content);
	   board.setReadCount(readCount);
	   board.setWritedate(date);
	   board.setUp(up);
	   
	   service.adminHumorBoardUpdate(board);
      return "redirect:Humor_view.do?num="+ board.getNum();
   }
   
   
   @RequestMapping("adminHumorBoardUpdateForm.do")
   public String adminHumorBoardUpdateForm(Model model, int num, HttpSession session) {
      session.setAttribute("url", "Humor_updateForm.do");
      model.addAttribute("humorboard", hservice.getBoard(num));
      String userid = (String) session.getAttribute("userid");
      if (userid == null) {
         model.addAttribute("result", "2");
      } else {
         //여기수정함
         model.addAttribute("userid", userid);
         model.addAttribute("result", "1");
      }
      return "HumorUpdateForm";
   }

   @RequestMapping("adminTipBoardDelete.do")
   public String adminTipBoardDelete(Model model, int num, String password, HttpSession session) {
      service.adminTipBoardDelete(num);
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
   @RequestMapping("adminTipBoardUpdateForm.do")
   public String adminTipBoardUpdateForm(Model model, int num, HttpSession session) {
      session.setAttribute("url", "Tip_updateForm.do");
      model.addAttribute("tipboard", tservice.getBoard(num));
      String userid = (String) session.getAttribute("userid");
      if (userid == null) {
         model.addAttribute("result", "2");
      } else {
         //여기수정함
         model.addAttribute("userid", userid);
         model.addAttribute("result", "1");
      }
      return "TipUpdateForm";
   }

   @RequestMapping("adminTipBoardUpdate")
   public String  adminTipBoardUpdate(int num, String password, String name, String title, String content, int readCount, String writedate, int up) {
	   SimpleDateFormat transFormat = new SimpleDateFormat("yyyy-MM-dd");
	   Date date = null;
	   try {
		date = transFormat.parse(writedate);
	} catch (ParseException e) {
		// TODO Auto-generated catch block
		e.printStackTrace();
	}
	   Tip_Board board = new Tip_Board();
	   board.setNum(num);
	   board.setPassword(password);
	   board.setName(name);
	   board.setTitle(title);
	   board.setContent(content);
	   board.setWritedate(date);
	   board.setReadCount(readCount);
	   board.setUp(up);
	   
	   service.adminTipBoardUpdate(board);
	   return "redirect:Tip_view.do?num=" + board.getNum();
   }
   

   @RequestMapping("adminReportBoardUpdateForm.do")
   public String adminReportBoardUpdateForm(Model model, int num, HttpSession session) {
      session.setAttribute("url", "Report_updateForm.do");
      model.addAttribute("reportboard", rservice.getBoard(num));
      String userid = (String) session.getAttribute("userid");
      if (userid == null) {
         model.addAttribute("result", "2");
      } else {
         //여기수정함
         model.addAttribute("userid", userid);
         model.addAttribute("result", "1");
      }
      return "ReportUpdateForm";
   }

   @RequestMapping("adminReportBoardUpdate.do")
   public String  adminReportBoardUpdate(int num, String password, String name, String title, String content, int readCount, String writedate, int up) {
	   SimpleDateFormat transFormat = new SimpleDateFormat("yyyy-MM-dd");
	   Date date = null;
	   try {
		date = transFormat.parse(writedate);
	} catch (ParseException e) {
		// TODO Auto-generated catch block
		e.printStackTrace();
	}
	   Report_Board board = new Report_Board();
	   board.setNum(num);
	   board.setPassword(password);
	   board.setName(name);
	   board.setTitle(title);
	   board.setContent(content);
	   board.setWritedate(date);
	   board.setReadCount(readCount);
	   board.setUp(up);
	   
	   service.adminReportBoardUpdate(board);
      return "redirect:Report_view.do?num=" + board.getNum();
   }
   @RequestMapping("adminReportBoardDelete.do")
   public String adminReportBoardDelete(Model model, int num, String password, HttpSession session) {
      service.adminReportBoardDelete(num);
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
}