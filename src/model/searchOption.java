package model;

import java.util.List;

public class searchOption {

	private String name;
	private List<String> classes;
	private List<String> main_positions;
	private List<Integer> position_ovr;
	private List<Integer> pay_side;

	private String team;
	private String nationality;
	private String teamColor;
	private List<String> detailInfoKey;
	private List<Integer> detailInfovlaue;
	private List<String> retentionCharacter;
	private List<String> unretentionCharacter;
	private List<Integer> year;
	private Integer month;
	private Integer date;
	private List<Integer> height;
	private List<Integer> weight;
	private List<String> physical;
	private List<Integer> footValue;
	private String skillLevel;
	private String fameValue;
	private List<Integer> av_scor;
	
	
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public List<String> getClasses() {
		return classes;
	}
	public void setClasses(List<String> classes) {
		this.classes = classes;
	}
	public List<String> getMain_positions() {
		return main_positions;
	}
	public void setMain_positions(List<String> main_positions) {
		this.main_positions = main_positions;
	}
	public List<Integer> getPosition_ovr() {
		return position_ovr;
	}
	public void setPosition_ovr(List<Integer> position_ovr) {
		this.position_ovr = position_ovr;
	}
	public List<Integer> getPay_side() {
		return pay_side;
	}
	public void setPay_side(List<Integer> pay_side) {
		this.pay_side = pay_side;
	}
	public String getTeam() {
		return team;
	}
	public void setTeam(String team) {
		this.team = team;
	}
	public String getNationality() {
		return nationality;
	}
	public void setNationality(String nationality) {
		this.nationality = nationality;
	}
	public String getTeamColor() {
		return teamColor;
	}
	public void setTeamColor(String teamColor) {
		this.teamColor = teamColor;
	}
	public List<String> getDetailInfoKey() {
		return detailInfoKey;
	}
	public void setDetailInfoKey(List<String> detailInfoKey) {
		this.detailInfoKey = detailInfoKey;
	}
	public List<Integer> getDetailInfovlaue() {
		return detailInfovlaue;
	}
	public void setDetailInfovlaue(List<Integer> detailInfovlaue) {
		this.detailInfovlaue = detailInfovlaue;
	}
	public List<String> getRetentionCharacter() {
		return retentionCharacter;
	}
	public void setRetentionCharacter(List<String> retentionCharacter) {
		this.retentionCharacter = retentionCharacter;
	}
	public List<String> getUnretentionCharacter() {
		return unretentionCharacter;
	}
	public void setUnretentionCharacter(List<String> unretentionCharacter) {
		this.unretentionCharacter = unretentionCharacter;
	}
	public List<Integer> getYear() {
		return year;
	}
	public void setYear(List<Integer> year) {
		this.year = year;
	}
	public Integer getMonth() {
		return month;
	}
	public void setMonth(Integer month) {
		this.month = month;
	}
	public Integer getDate() {
		return date;
	}
	public void setDate(Integer date) {
		this.date = date;
	}
	public List<Integer> getHeight() {
		return height;
	}
	public void setHeight(List<Integer> height) {
		this.height = height;
	}
	public List<Integer> getWeight() {
		return weight;
	}
	public void setWeight(List<Integer> weight) {
		this.weight = weight;
	}
	public List<String> getPhysical() {
		return physical;
	}
	public void setPhysical(List<String> physical) {
		this.physical = physical;
	}
	public List<Integer> getFootValue() {
		return footValue;
	}
	public void setFootValue(List<Integer> footValue) {
		this.footValue = footValue;
	}
	public String getSkillLevel() {
		return skillLevel;
	}
	public void setSkillLevel(String skillLevel) {
		this.skillLevel = skillLevel;
	}
	public String getFameValue() {
		return fameValue;
	}
	public void setFameValue(String fame) {
		this.fameValue = fame;
	}
	public List<Integer> getAv_scor() {
		return av_scor;
	}
	public void setAv_scor(List<Integer> av_scor) {
		this.av_scor = av_scor;
	}
	@Override
	public String toString() {
		return "searchOption [name=" + name + ", classes=" + classes + ", main_positions=" + main_positions
				+ ", position_ovr=" + position_ovr + ", pay_side=" + pay_side + ", team=" + team + ", nationality="
				+ nationality + ", teamColor=" + teamColor + ", detailInfoKey=" + detailInfoKey + ", detailInfovlaue="
				+ detailInfovlaue + ", retentionCharacter=" + retentionCharacter + ", unretentionCharacter="
				+ unretentionCharacter + ", year=" + year + ", month=" + month + ", date=" + date + ", height=" + height
				+ ", weight=" + weight + ", physical=" + physical + ", footValue=" + footValue + ", skillLevel="
				+ skillLevel + ", fameValue=" + fameValue + ", av_scor=" + av_scor + "]";
	}
	
	
	

}
