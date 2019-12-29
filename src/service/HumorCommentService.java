package service;

import java.util.HashMap;

import model.HumorCocomment;
import model.HumorComment;

public interface HumorCommentService {

	public void insertComment(HumorComment comment);
	public void deleteComment(int num);
	public HashMap<String, Object> selectAll(int boardnum);
	public void insertCocomment(HumorCocomment cocomment);
	public void deleteCocomment(int cocommentNum);
	public HashMap<String , Object> selectAll2(int boardnum);
}
