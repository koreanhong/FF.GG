package service;

import java.util.HashMap;

import model.TipCocomment;
import model.TipComment;

public interface TipCommentService {

	public void insertComment(TipComment comment);
	public void deleteComment(int num);
	public HashMap<String, Object> selectAll(int boardnum);
	public void insertCocomment(TipCocomment cocomment);
	public void deleteCocomment(int cocommentNum);
	public HashMap<String , Object> selectAll2(int boardnum);
}
