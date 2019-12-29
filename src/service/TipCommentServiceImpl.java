package service;

import java.util.HashMap;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import dao.TipCommentDao;
import model.TipCocomment;
import model.TipComment;

@Service
public class TipCommentServiceImpl implements TipCommentService{

	@Autowired
	TipCommentDao dao;
	
	@Override
	public void insertComment(TipComment comment) {
		dao.insertComment(comment);
	}

	@Override
	public void deleteComment(int num) {
		dao.deleteComment(num);
	}

	@Override
	public HashMap<String, Object> selectAll(int boardnum) {
		HashMap<String, Object> result = new HashMap<String, Object>();
		result.put("tcomment", dao.selectAll(boardnum));
		return result;
	}
	@Override
	public void insertCocomment(TipCocomment cocomment) {
		dao.insertCocommenet(cocomment);		
	}

	@Override
	public void deleteCocomment(int cocommentNum) {
		dao.deleteCocomment(cocommentNum);	
	}

	@Override
	public HashMap<String, Object> selectAll2(int boardnum) {
		HashMap<String , Object> result = new HashMap<String, Object>();
		result.put("tcocomment", dao.selectAll2(boardnum));
		return result;
	}
}
