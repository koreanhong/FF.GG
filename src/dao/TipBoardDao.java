package dao;

import java.util.HashMap;
import java.util.List;

import model.TipUpcheck;
import model.Tip_Board;

public interface TipBoardDao {
	public int insertBoard(Tip_Board board);
	public int updateBoard(Tip_Board board);
	public int deleteBoard(int num);
	public Tip_Board selectOne(int num);
	public List<Tip_Board> selectTen();
	public List<Tip_Board> selectUp();
	public List<Tip_Board> selectboard_id(String name);
    public List<Tip_Board> selectboard_pwd(String pwd);
	
	//params : 넘길 레코드의 갯수, 조회할 레코드 갯수
	public List<Tip_Board> selectBoardPage(HashMap<String, Object> params);
	//params : 제목,내용, 넘길 레코드의 갯수, 조회할 레코드 갯수
	public List<Tip_Board> selectSearchTitleContent(HashMap<String, Object> params);
	//params : 글쓴이 조회, 넘길 레코드의 갯수, 조회할 레코드 갯수
	public List<Tip_Board> selectSearchName(HashMap<String, Object> params);
	//params : 게시물 글쓴 시작일, 종료일, 넘길 레코드의 갯수, 조회할 레코드 갯수
	public List<Tip_Board> selectSearchPeriod(HashMap<String, Object> params);
	
	//전체 게시물 레코드 갯수 조회
	public int getCount(HashMap<String, Object> params);
	public void insert(TipUpcheck upcheck); //id,게시물num,up횟수 넣는 함수
	public Integer getUp(HashMap<String, Object> params); //id와 게시물num을 이용해 up횟수 가져오는 함수
}
