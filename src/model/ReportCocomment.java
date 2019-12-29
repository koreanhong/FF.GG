package model;

public class ReportCocomment {

	String userid;
	String content;
	int reportboardNum;
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
	public int getReportboardNum() {
		return reportboardNum;
	}
	public void setReportboardNum(int reportboardNum) {
		this.reportboardNum = reportboardNum;
	}
	public int getCommentNum() {
		return commentNum;
	}
	public void setCommentNum(int commentNum) {
		this.commentNum = commentNum;
	}
	@Override
	public String toString() {
		return "ReportCocomment [userid=" + userid + ", content=" + content + ", humorboardNum=" + reportboardNum
				+ ", commentNum=" + commentNum + ", cocommentNum=" + cocommentNum + "]";
	}
}
