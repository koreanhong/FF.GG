package dao;

import model.LoginCheck;

public interface LoginCheckDao {

	public String getDate(String userid);
	public int insertLoginCheck(LoginCheck lc);
	public int updateLoginCheck(LoginCheck lc);
	public int deleteLoginCheck(String userid);
}
