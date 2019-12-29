package dao;

import java.util.List;

import model.ReportCocomment;
import model.ReportComment;


public interface ReportCommentDao {

	public void insertComment(ReportComment comment);
	public int deleteComment(int num);
	public List<ReportComment> selectAll(int boardnum);
	public void insertCocomment(ReportCocomment cocomment);
	public int deleteCocomment(int cocommentNum);
	public List<ReportCocomment>selectAll2(int boardnum);
}
