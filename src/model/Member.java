package model;

public class Member {
	String name;
	String id;
	String pwd;
	String pwd_check;
	int point;
	String email;

	public int getPoint() {
		return point;
	}

	public void setPoint(int point) {
		this.point = point;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getPwd() {
		return pwd;
	}

	public void setPwd(String pwd) {
		this.pwd = pwd;
	}

	public String getPwd_check() {
		return pwd_check;
	}

	public void setPwd_check(String pwd_check) {
		this.pwd_check = pwd_check;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	@Override
	public String toString() {
		return "Member [name=" + name + ", id=" + id + ", pwd=" + pwd + ", pwd_check=" + pwd_check + ", point=" + point
				+ ", email=" + email + "]";
	}
}
