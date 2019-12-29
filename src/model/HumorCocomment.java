package model;

public class HumorCocomment {

	String userid;
	String content;
	int humorboardNum;
	int commentNum;
	int cocommentNum;
	
	
	public int getCocommentNum() {
		return cocommentNum;
	}
	public void setCocommentNum(int cocommentNum) {
		this.cocommentNum = cocommentNum;
	}
	public String getUserid() {
		return userid;
	}
	public void setUserid(String userid) {
		this.userid = userid;
	}
	public String getContent() {
		return content;
	}
	public void setContent(String content) {
		this.content = content;
	}
	public int getHumorboardNum() {
		return humorboardNum;
	}
	public void setHumorboardNum(int humorboardNum) {
		this.humorboardNum = humorboardNum;
	}
	public int getCommentNum() {
		return commentNum;
	}
	public void setCommentNum(int commentNum) {
		this.commentNum = commentNum;
	}
	@Override
	public String toString() {
		return "HumorCocomment [userid=" + userid + ", content=" + content + ", humorboardNum=" + humorboardNum
				+ ", commentNum=" + commentNum + ", cocommentNum=" + cocommentNum + "]";
	}

}
