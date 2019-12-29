package model;

public class TipCocomment {

	String userid;
	String content;
	int tipboardNum;
	int commentNum;
	int cocommentNum;
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
	public int getTipboardNum() {
		return tipboardNum;
	}
	public void setTipboardNum(int tipboardNum) {
		this.tipboardNum = tipboardNum;
	}
	public int getCommentNum() {
		return commentNum;
	}
	public void setCommentNum(int commentNum) {
		this.commentNum = commentNum;
	}
	public int getCocommentNum() {
		return cocommentNum;
	}
	public void setCocommentNum(int cocommentNum) {
		this.cocommentNum = cocommentNum;
	}
	@Override
	public String toString() {
		return "TipCocomment [userid=" + userid + ", content=" + content + ", tipboardNum=" + tipboardNum
				+ ", commentNum=" + commentNum + ", cocommentNum=" + cocommentNum + "]";
	}
}
