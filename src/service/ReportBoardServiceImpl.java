package service;

import java.util.HashMap;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import dao.ReportBoardDao;
import model.ReportUpcheck;
import model.Report_Board;

@Service
public class ReportBoardServiceImpl implements ReportBoardService{

	@Autowired
	private ReportBoardDao dao;

	@Override
	public int writeBoard(Report_Board board) {
		dao.insertBoard(board);
		return board.getNum();
	}

	@Override
	public int updateBoard(Report_Board board) {
		Report_Board originboard = dao.selectOne(board.getNum());
		if (originboard.getPassword().equals(board.getPassword())) // 비밀번호가 일치하면
			return dao.updateBoard(board); // 수정
		else
			return 0;
	}

	@Override
	public int deleteBoard(int num, String pass) {
		return dao.deleteBoard(num); // 삭제
	}

	@Override
	public Report_Board readBoard(int num) {
		Report_Board b = dao.selectOne(num); // 해당 게시물 가져와서
		b.setReadCount(b.getReadCount() + 1); // readcount +1 해주고
		dao.updateBoard(b); // 그 정보로 업데이트
		return b;
	}

	@Override
	public HashMap<String, Object> getBoardListPage(HashMap<String, Object> params, int page) {
		HashMap<String, Object> result = new HashMap<String, Object>();
		result.put("current", page);
		result.put("start", getStartPage(page));
		if (getEndPage(page) > getLastPage(params)) {
			result.put("end", getLastPage(params));
		} else {
			result.put("end", getEndPage(page));
		}
		result.put("last", getLastPage(params));

		params.put("skip", getSkip(page));
		params.put("qty", 10); // 한페이지에서 볼 게시판 글 수
		result.put("rboardList", dao.selectBoardPage(params));

		return result;
	}

	@Override
	public HashMap<String, Object> getBoardList() {
		HashMap<String, Object> result = new HashMap<String, Object>();
		result.put("rboardList", dao.selectTen());
		return result;
	}

	@Override
	public HashMap<String, Object> getBoardListup() {
		HashMap<String, Object> result = new HashMap<String, Object>();
		result.put("rboardList", dao.selectUp());
		return result;
	}

	@Override
	public int getStartPage(int num) {
		return (num - 1) / 10 * 10 + 1;
	}

	@Override
	public int getEndPage(int num) {
		return getStartPage(num) + 9;
	}

	@Override
	public int getLastPage(HashMap<String, Object> params) {
		return (dao.getCount(params) - 1) / 10 + 1;
	}

	@Override
	public int getSkip(int num) {
		return (num - 1) * 10;
	}

	@Override
	public Report_Board getBoard(int num) {
		return dao.selectOne(num);
	}

	@Override
	public List<Report_Board> selectboard_pwd(String pwd) {
		return dao.selectboard_pwd(pwd);
	}

	@Override
	public List<Report_Board> selectboard_id(String name) {
		return dao.selectboard_id(name);
	}

	@Override
	public void insert(ReportUpcheck upcheck) {
		dao.insert(upcheck);		
	}

	@Override
	public int getUp(String id, int num) {
		HashMap<String, Object> params = new HashMap<String, Object>();
		params.put("num", num);
		params.put("id", id);
		Object resultOb = dao.getUp(params);
		int result = 0;
		if(resultOb==null) { //없는 경우
			return 10;
		}
		else {
			result = dao.getUp(params);
		}
		return result;
	}
}
