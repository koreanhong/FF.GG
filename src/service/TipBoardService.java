package service;

import java.util.HashMap;
import java.util.List;

import model.TipUpcheck;
import model.Tip_Board;

public interface TipBoardService {

	public int writeBoard(Tip_Board board);

	public int updateBoard(Tip_Board board);

	public int deleteBoard(int num, String pass);

	public Tip_Board readBoard(int num);

	public HashMap<String, Object> getBoardList();

	public HashMap<String, Object> getBoardListup();

	public HashMap<String, Object> getBoardListPage(HashMap<String, Object> params, int page);

	public int getStartPage(int num);

	public int getEndPage(int num);

	public int getLastPage(HashMap<String, Object> params);

	public int getSkip(int num);

	public Tip_Board getBoard(int num);

	public List<Tip_Board> selectboard_pwd(String pwd);

	public List<Tip_Board> selectboard_id(String name);
	
	public int AllUpdate(Tip_Board board);
	
	public void insert(TipUpcheck upcheck);
	public int getUp(String id, int num);
}
