package service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import dao.LoginCheckDao;
import model.LoginCheck;

@Service
public class LoginCheckService {

	@Autowired
	LoginCheckDao dao;
	
	public String getDate(String id) {
		return dao.getDate(id);
	}
	public void insertLoginCheck(LoginCheck lc) {
		dao.insertLoginCheck(lc);
	}
	
	public void updateLoginCheck(LoginCheck lc) {
		dao.updateLoginCheck(lc);
	}
	
	public void deleteLoginCheck(String userid) {
        dao.deleteLoginCheck(userid);
     }
	
}
