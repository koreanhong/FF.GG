package service;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Map;

import org.bson.Document;
import org.bson.conversions.Bson;
import org.springframework.stereotype.Service;

import com.mongodb.client.result.DeleteResult;
import com.mongodb.client.result.UpdateResult;

import model.searchOption;

import static com.mongodb.client.model.Filters.*;

import mongo.mongoDao;

@Service
public class mongoService {

	private mongoDao dao = mongoDao.getInstance();

	public List<String> getList() {
		return dao.playerFindAll();
	}
	
	public List<String> searchSpid(List<Integer> list) {
		Bson bson = in("id", list);
		return dao.playerFind(bson);
	}
	

	public int inputSquad(Map<String, Object> map) {
		String id = map.get("id").toString();
		String sq_name = map.get("squad_name").toString();

		List<String> list = null;
		Document document = new Document("id", id);

		list = dao.outSquadList(document);

		if (list.size() >= 10) {
			return 2;
		} else {
			list = dao.findSquad(and(eq("id", id), eq("squad_name", sq_name)));
			if (list.size() == 0) {
//				Document document = new Document("id", id);
				document.append("squad_name", sq_name).append("squad_formation", map.get("squad_formation"))
						.append("squad_info", map.get("squad_info"));
				return dao.inputSquadMade(document); // 1 성공
			} else {
				return 3; // name 중복
			}
		}
	}

	public List<String> outPutSquad(String userId) {
		Document document = new Document("id", userId);
		return dao.outSquadList(document);
	}

	public DeleteResult deleteSquad(String userId, String squadName) {
		Document document = new Document("id", userId).append("squad_name", squadName);
		return dao.deleteSquad(document);
	}

	public String insertComments(Map<String, Object> map) {
		SimpleDateFormat format = new SimpleDateFormat("yyyy-mm-dd");
		String formatDate = format.format(new Date());
		System.out.println(format);
		Document document = new Document("id", map.get("id"));
		document.append("user_id", map.get("userId")).append("comments", map.get("comments"))
				.append("score", map.get("score")).append("input_date", formatDate);
		dao.commentsInsert(document);
		return formatDate;
	}

	public UpdateResult modifyComments(Map<String, Object> map) {
		Document document = new Document();
		document.append("comments", map.get("comments")).append("score", map.get("score"));
		return dao.commentsUpdate(and(eq("id", map.get("id")), eq("user_id", map.get("userId"))),
				new Document("$set", document));
	}

	public DeleteResult deleteComments(String userId) {
		Document document = new Document("user_id", userId);
		return dao.commentsDelete(document);
	}

	public List<String> outputComments(int id) {
		Document document = new Document("id", id);
		return dao.outCommentsList(document);
	}

//	public List<String> outputRating() {
//		
//	}

	public List<String> searchPlayers(searchOption option) {

		List<Bson> filterList = new ArrayList<Bson>();

		try {
			// 이름 디폴트 값인지 확인
			if (!option.getName().equals("")) {
				filterList.add(regex("name", option.getName()));
			}

			// 클래스 확인, 디폴트 값이면 검색 조건에 넣지 않음
			List<Bson> classList = new ArrayList<Bson>();
			for (int i = 0; i < option.getClasses().size(); i++) {
				int sp = Integer.parseInt(option.getClasses().get(i)) * 1000000;
				classList.add(and(gte("id", sp), lt("id", sp + 1000000)));
			}
			if (option.getClasses().size() != 0) {
				filterList.add(and(or(classList)));
			}

			// 포지션 선택 확인, 디폴트 값이면 검색 조건에 넣지 않음
			if (option.getMain_positions().size() != 0) {
				filterList.add(in("main_position.positions", option.getMain_positions()));
			}

			// 선택한 ovr 범위 확인, 디폴트 값이면 검색 조건에 넣지 않음
			if (option.getPosition_ovr().get(0) != 0 || option.getPosition_ovr().get(1) != 150) {
				filterList.add(gte("main_position.positions_ovr", option.getPosition_ovr().get(0) + 3));
				filterList.add(lte("main_position.positions_ovr", option.getPosition_ovr().get(1) + 3));
			}

			// 선택한 급여 범위 확인, 디폴트 값이면 검색 조건에 넣지 않음
			if (option.getPay_side().get(0) != 0 || option.getPay_side().get(0) != 150) {
				filterList.add(gte("basic_info.pay_side", option.getPay_side().get(0) + 3));
				filterList.add(lte("basic_info.pay_side", option.getPay_side().get(1) + 3));
			}

			// 팀 검색 확인, 디폴트 값이면 검색 조건에 넣지 않음
			if (!option.getTeam().equals("")) {
				filterList.add(regex("basic_info.team", option.getTeam()));
			}

			// 국적 검색 확인, 디폴트 값이면 검색 조건에 넣지 않음
			if (!option.getNationality().equals("")) {
				filterList.add(regex("basic_info.team", option.getNationality()));
			}
			// 팀 컬러 검색 디비 수정후 추가 예정
			if (!option.getTeamColor().equals("팀 컬러 선택")) {
				filterList.add(eq("team_color.", option.getTeamColor()));
			}

			// 상세벨류 검색 확인, 디폴트 값이면 검색 조건에 넣지 않음
			int j = 0;
			for (int i = 0; i < option.getDetailInfoKey().size(); i++) {
				if (!option.getDetailInfoKey().get(i).equals("")) {
					filterList.add(and(
							gte("detail_stat." + option.getDetailInfoKey().get(i),
									option.getDetailInfovlaue().get(j) + 3),
							lte("detail_stat." + option.getDetailInfoKey().get(i),
									option.getDetailInfovlaue().get(j + 1) + 3)));
				}
				j += 2;
			}

			// 보유 특성 확인, 디폴트 값이면 검색 조건에 넣지 않음
			for (String keyword : option.getRetentionCharacter()) {
				if (!keyword.equals("보유 특성")) {
					filterList.add(regex("basic_info.character", keyword));
				}
			}

			// 제외 특성 확인, , 디폴트 값이면 검색 조건에 넣지 않음
			for (String keyword : option.getUnretentionCharacter()) {
				if (!keyword.equals("제외 특성")) {
					filterList.add(not(regex("basic_info.character", keyword)));
				}
			}

			// 출생연도 범위 확인, 디폴트 값이면 검색 조건에 넣지 않음
			if (option.getYear().get(0) != 1900 || option.getYear().get(1) != 2019) {
				List<Bson> yearList = new ArrayList<Bson>();
				for (int i = option.getYear().get(0); i <= option.getYear().get(1); i++) {
					yearList.add(regex("basic_info.birth", "^" + i));
				}
				filterList.add(or(yearList));
			}

			// 출생월일 확인, 디폴트 값이면 검색 조건에 넣지 않음
			String item_month = (option.getMonth() == 0) ? null
					: (option.getMonth() < 10) ? ".0" + option.getMonth() + "." : "." + option.getMonth() + ".";
			String item_date = (option.getDate() == 0) ? null
					: (option.getDate() < 10) ? "0" + option.getDate() + "$" : option.getDate() + "$";
			if (item_month != null) {
				filterList.add(regex("basic_info.birth", item_month));
			}

			if (item_date != null) {
				filterList.add(regex("basic_info.birth", item_date));
			}

			// 선택 키 범위 확인, 디폴트 값이면 검색 조건에 넣지 않음
			if (option.getHeight().get(0) != 150 || option.getHeight().get(0) != 210) {
				filterList.add(and(gte("basic_info.height", option.getHeight().get(0)),
						lte("basic_info.height", option.getHeight().get(1))));
			}
			// 선택 몸무게 범위 확인,, 디폴트 값이면 검색 조건에 넣지 않음
			if (option.getWeight().get(0) != 50 || option.getWeight().get(1) != 110) {
				filterList.add(gte("basic_info.weight", option.getWeight().get(0)));
				filterList.add(lte("basic_info.weight", option.getWeight().get(1)));
			}
			// 선택 채형 확인, 디폴트 값이면 검색 조건에 넣지 않음
			if (option.getPhysical().size() != 0) {
				filterList.add(in("basic_info.bodytype", option.getPhysical()));
			}
			// 스킬레벨 확인, 디폴트 값이면 검색 조건에 넣지 않음
			if (!option.getSkillLevel().equals("0")) {
				filterList.add(eq("basic_info.skill", option.getSkillLevel()));
			}
			if (option.getFootValue().get(0) != 0) {
				filterList.add(eq("basic.info.lfoot", option.getFootValue().get(0)));
			}
			// 발능력치 확인, 디폴트 값이면 검색 조건에 넣지 않음ㅊ
			if (option.getFootValue().get(1) != 0) {
				filterList.add(eq("basic.info.rfoot", option.getFootValue().get(1)));
			}
			// 명성 확인, 디폴트 값이면 검색 조건에 넣지 않음
			if (!option.getFameValue().equals("0")) {
				filterList.add(eq("basic_info.season"));
			}

			// 상세 검색이라면 익셉션이 떠서 기본 조건만 리스트에 담겨 dao에서 결과값을 리턴받게됨
		} catch (NullPointerException e) {
		}

		return dao.filterFind(filterList);
	}

}
