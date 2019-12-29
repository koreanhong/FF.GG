package service;

import java.util.HashMap;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import dao.HumorCommentDao;
import model.HumorCocomment;
import model.HumorComment;

@Service
public class HumorCommentServiceImpl implements HumorCommentService{

	@Autowired
	HumorCommentDao dao;
	
	@Override
	public void insertComment(HumorComment comment) {
		dao.insertComment(comment);
	}

	@Override
	public void deleteComment(int num) {
		dao.deleteComment(num);
	}

	@Override
	public HashMap<String, Object> selectAll(int boardnum) {
		HashMap<String, Object> result = new HashMap<String, Object>();
		result.put("hcomment", dao.selectAll(boardnum));
		return result;
	}
	@Override
	public void insertCocomment(HumorCocomment cocomment) {
		dao.insertCocomment(cocomment);
		
	}

	@Override
	public void deleteCocomment(int cocommentNum) {
		dao.deleteCocomment(cocommentNum);
	}

	@Override
	public HashMap<String, Object> selectAll2(int boardnum) {
		HashMap<String, Object> result = new HashMap<String, Object>();
		result.put("hcocomment", dao.selectAll2(boardnum));
		return result;
	}
	
}
