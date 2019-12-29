package service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import dao.MemberDao;
import model.Member;

@Service
public class MemberService {

	@Autowired
	private MemberDao dao;
	
	public void joinMember(Member member) {

			dao.insertMember(member);				
			
	}
	
	public List<Member> getMemberList(){
		return dao.selectAll();
	}
	
	public boolean login(String id, String pwd) {
	
		Member m = dao.selectOne(id);
		if(m==null)
			return false;
		else {
			String oPwd = m.getPwd();
			if(oPwd == null)
				return false;
			else {
				if(oPwd.equals(pwd))
					return true;
				else
					return false;
			}
		}
	}
	
	public Member getMemberInfo(String id){
		return dao.selectOne(id);
	}
	
	public void memberUpdate(Member member) {
		if(member.getPwd().equals(member.getPwd_check()))
			dao.updateMember(member);
	}
	public void memberUpdatepoint(Member member) {
        dao.updatePoint(member);
  }
	public String getPw(String id) {
		return dao.getpw(id);	
	}
	public String getHashpw(String pwd) {
		return dao.getHashpw(pwd);
	}
	
	public void memberDelete(String id) {
		dao.deleteMember(id);
	}
	public String getId(String email) {
		return dao.getId(email);
	}
	
	public Member getuseIdEmail(HashMap<String, Object> params){
		return dao.getuseIdEmail(params);
		 
	}
}
