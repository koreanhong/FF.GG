package service;

import java.util.HashMap;

import model.ReportCocomment;
import model.ReportComment;


public interface ReportCommentService {

	public void insertComment(ReportComment comment);
	public void deleteComment(int num);
	public HashMap<String, Object> selectAll(int boardnum);
	public void insertCocomment(ReportCocomment cocomment);
	public void deleteCocomment(int cocommentNum);
	public HashMap<String , Object> selectAll2(int boardnum);
}
