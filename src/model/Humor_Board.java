package model;

import java.util.Date;

public class Humor_Board {
	private int num;
	private String password;
	private String name;
	private String title;
	private String content;
	private int readCount;
	private Date writedate;
	private int up;
	
	public int getUp() {
		return up;
	}
	public void setUp(int up) {
		this.up = up;
	}
	public int getNum() {
		return num;
	}
	public void setNum(int num) {
		this.num = num;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getTitle() {
		return title;
	}
	public void setTitle(String title) {
		this.title = title;
	}
	public String getContent() {
		return content;
	}
	public void setContent(String content) {
		this.content = content;
	}
	public int getReadCount() {
		return readCount;
	}
	public void setReadCount(int readCount) {
		this.readCount = readCount;
	}
	public Date getWritedate() {
		return writedate;
	}
	public void setWritedate(Date writedate) {
		this.writedate = writedate;
	}
	@Override
	public String toString() {
		return "Humor_Board [num=" + num + ", password=" + password + ", name=" + name + ", title=" + title
				+ ", content=" + content + ", readCount=" + readCount + ", writedate=" + writedate + ", up=" + up + "]";
	}
}
