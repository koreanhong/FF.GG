package model;

public class PlayerInfo {

	int spid;
	int spPosition;
	int spGrade;
	// --status
	int shoot;
	int effectiveShoot;
	int assist;
	int goal;
	int dribble;
	int passTry;
	int passSuccess;
	int block;
	int tackle;
	float spRating;

	public int getSpid() {
		return spid;
	}

	public void setSpid(int spid) {
		this.spid = spid;
	}

	public int getSpPosition() {
		return spPosition;
	}

	public void setSpPosition(int spPosition) {
		this.spPosition = spPosition;
	}

	public int getSpGrade() {
		return spGrade;
	}

	public void setSpGrade(int spGrade) {
		this.spGrade = spGrade;
	}

	public int getShoot() {
		return shoot;
	}

	public void setShoot(int shoot) {
		this.shoot = shoot;
	}

	public int getEffectiveShoot() {
		return effectiveShoot;
	}

	public void setEffectiveShoot(int effectiveShoot) {
		this.effectiveShoot = effectiveShoot;
	}

	public int getAssist() {
		return assist;
	}

	public void setAssist(int assist) {
		this.assist = assist;
	}

	public int getGoal() {
		return goal;
	}

	public void setGoal(int goal) {
		this.goal = goal;
	}

	public int getDribble() {
		return dribble;
	}

	public void setDribble(int dribble) {
		this.dribble = dribble;
	}

	public int getPassTry() {
		return passTry;
	}

	public void setPassTry(int passTry) {
		this.passTry = passTry;
	}

	public int getPassSuccess() {
		return passSuccess;
	}

	public void setPassSuccess(int passSuccess) {
		this.passSuccess = passSuccess;
	}

	public int getBlock() {
		return block;
	}

	public void setBlock(int block) {
		this.block = block;
	}

	public int getTackle() {
		return tackle;
	}

	public void setTackle(int tackle) {
		this.tackle = tackle;
	}

	public float getSpRating() {
		return spRating;
	}

	public void setSpRating(float spRating) {
		this.spRating = spRating;
	}

	@Override
	public String toString() {
		return "PlayerInfo [spid=" + spid + ", spPosition=" + spPosition + ", spGrade=" + spGrade + ", shoot=" + shoot
				+ ", effectiveShoot=" + effectiveShoot + ", assist=" + assist + ", goal=" + goal + ", dribble="
				+ dribble + ", passTry=" + passTry + ", passSuccess=" + passSuccess + ", block=" + block + ", tackle="
				+ tackle + ", spRating=" + spRating + "]";
	}

}
