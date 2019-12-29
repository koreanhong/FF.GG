package model;


public class UserInfo {
	String accessId;
	String nickname;
	int level;
	
	public String getAccessId() {
		return accessId;
	}
	public void setAccessId(String accessId) {
		this.accessId = accessId;
	}
	public String getNickname() {
		return nickname;
	}
	public void setNickname(String nickname) {
		this.nickname = nickname;
	}
	public int getLevel() {
		return level;
	}
	public void setLevel(int level) {
		this.level = level;
	}
	@Override
	public String toString() {
		return "UserInfo [accessId=" + accessId + ", nickname=" + nickname + ", level=" + level + "]";
	}
	
}
