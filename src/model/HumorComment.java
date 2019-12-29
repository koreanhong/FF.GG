package model;

public class HumorComment {
	int num;
	String id;
	String content;
	int boardnum;
	public int getNum() {
		return num;
	}
	public void setNum(int num) {
		this.num = num;
	}
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public String getContent() {
		return content;
	}
	public void setContent(String content) {
		this.content = content;
	}
	public int getBoardnum() {
		return boardnum;
	}
	public void setBoardnum(int boardnum) {
		this.boardnum = boardnum;
	}
	
	@Override
	public String toString() {
		return "HumorComment [num=" + num + ", id=" + id + ", content=" + content + ", boardnum=" + boardnum + "]";
	}
	
}
