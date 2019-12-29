package service;

import java.util.HashMap;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import dao.ReportCommentDao;
import model.ReportCocomment;
import model.ReportComment;

@Service
public class ReportCommentServiceImpl implements ReportCommentService{

	@Autowired
	ReportCommentDao dao;
	
	@Override
	public void insertComment(ReportComment comment) {
		dao.insertComment(comment);
	}

	@Override
	public void deleteComment(int num) {
		dao.deleteComment(num);
	}

	@Override
	public HashMap<String, Object> selectAll(int boardnum) {
		HashMap<String, Object> result = new HashMap<String, Object>();
		result.put("rcomment", dao.selectAll(boardnum));
		return result;
	}
	@Override
	public void insertCocomment(ReportCocomment cocomment) {
		dao.insertCocomment(cocomment);
	}

	@Override
	public void deleteCocomment(int cocommentNum) {
		dao.deleteCocomment(cocommentNum);
	}

	@Override
	public HashMap<String, Object> selectAll2(int boardnum) {
		HashMap<String, Object> result = new HashMap<String, Object>();
		result.put("rcocomment", dao.selectAll2(boardnum));
		return result;
	}
}
