package dao;

import java.util.HashMap;
import java.util.List;

import model.TipCocomment;
import model.TipComment;

public interface TipCommentDao {

	public void insertComment(TipComment comment);
	public int deleteComment(int num);
	public List<TipComment> selectAll(int boardnum);
	public void insertCocommenet(TipCocomment cocomment);
	public int deleteCocomment(int cocomment);
	public List<TipCocomment> selectAll2(int boardnum);
}
