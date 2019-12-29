package dao;

import java.util.HashMap;
import java.util.List;

import model.HumorCocomment;
import model.HumorComment;

public interface HumorCommentDao {

	public void insertComment(HumorComment comment);
	public int deleteComment(int num);
	public List<HumorComment> selectAll(int boardnum);
	public void insertCocomment(HumorCocomment cocomment);
	public int deleteCocomment(int cocommentNum);
	public List<HumorCocomment>selectAll2(int boardnum);
	
}
