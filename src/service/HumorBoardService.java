package service;

import java.util.HashMap;

import java.util.List;

import model.HumorUpcheck;
import model.Humor_Board;

public interface HumorBoardService {
	public int writeBoard(Humor_Board board);

	public int updateBoard(Humor_Board board);

	public int deleteBoard(int num, String pass);

	public Humor_Board readBoard(int num);

	public HashMap<String, Object> getBoardList();

	public HashMap<String, Object> getBoardListup();

	public HashMap<String, Object> getBoardListPage(HashMap<String, Object> params, int page);

	public int getStartPage(int num);

	public int getEndPage(int num);

	public int getLastPage(HashMap<String, Object> params);

	public int getSkip(int num);

	public Humor_Board getBoard(int num);

	public List<Humor_Board> selectboard_pwd(String pwd);

	public List<Humor_Board> selectboard_id(String name);
	
	public int AllUpdate(Humor_Board board);
	
	public void insert(HumorUpcheck upcheck);
	public int getUp(String id, int num);
}
