package dao;

import java.util.HashMap;
import java.util.List;

import model.Member;

public interface MemberDao {
	public int insertMember(Member member);

	public int updateMember(Member member);

	public int deleteMember(String id);

	public Member selectOne(String id);

	public List<Member> selectAll();

	public String getId(String email);

	public String getpw(String id);

	public String getHashpw(String pwd);

	public Member getuseIdEmail(HashMap<String, Object> params);

	public int updatePoint(Member member);
}
