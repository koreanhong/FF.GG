package service;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.stereotype.Service;

import dao.HumorBoardDao;
import dao.HumorCommentDao;
import dao.MemberDao;
import dao.ReportBoardDao;
import dao.ReportCommentDao;
import dao.TipBoardDao;
import dao.TipCommentDao;
import model.Humor_Board;
import model.Report_Board;
import model.TipCocomment;
import model.Tip_Board;

@Service
public class AdminServiceImpl implements AdminService {

	@Autowired
	private HumorBoardDao hdao;
	@Autowired
	private HumorCommentDao hcdao;
	@Autowired
	private MemberDao mdao;
	@Autowired
	private TipBoardDao tdao;
	@Autowired
	private TipCommentDao tcdao;
	@Autowired
	private ReportBoardDao rdao;
	@Autowired
	private ReportCommentDao rcdao;

	@Override
	public void adminTipCommentDelete(int num) {
		tdao.deleteBoard(num);
	}

	@Override
	public void adminTipCocommentDelete(int num) {
		tcdao.deleteCocomment(num);
	}

	@Override
	public void adminTipBoardDelete(int num) {
		tdao.deleteBoard(num);
	}

	@Override
	public void adminTipBoardUpdate(Tip_Board board) {
		
		tdao.updateBoard(board);
	}

	@Override
	public void adminHumorBoardUpdate(Humor_Board board) {
		hdao.updateBoard(board);
	}

	@Override
	public void adminHumorCommentDelete(int num) {
		hcdao.deleteComment(num);
	}

	@Override
	public void adminHumorCocommentDelete(int num) {
		hcdao.deleteCocomment(num);
	}

	@Override
	public void adminHumorBoardDelete(int num) {
		hdao.deleteBoard(num);

	}

	@Override
	public void adminReportBoardUpdate(Report_Board board) {
		rdao.updateBoard(board);
	}

	@Override
	public void adminReportCommentDelete(int num) {
		rcdao.deleteComment(num);
	}

	@Override
	public void adminReportCocommentDelete(int num) {
		rcdao.deleteCocomment(num);
	}

	@Override
	public void adminReportBoardDelete(int num) {
		rdao.deleteBoard(num);
	}
}