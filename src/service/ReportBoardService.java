package service;

import java.util.HashMap;
import java.util.List;

import model.ReportUpcheck;
import model.Report_Board;


public interface ReportBoardService {
	public int writeBoard(Report_Board board);

	public int updateBoard(Report_Board board);

	public int deleteBoard(int num, String pass);

	public Report_Board readBoard(int num);

	public HashMap<String, Object> getBoardList();

	public HashMap<String, Object> getBoardListup();

	public HashMap<String, Object> getBoardListPage(HashMap<String, Object> params, int page);

	public int getStartPage(int num);

	public int getEndPage(int num);

	public int getLastPage(HashMap<String, Object> params);

	public int getSkip(int num);

	public Report_Board getBoard(int num);

	public List<Report_Board> selectboard_pwd(String pwd);

	public List<Report_Board> selectboard_id(String name);
	
	public void insert(ReportUpcheck upcheck);
	public int getUp(String id, int num);
}
