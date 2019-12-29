package controller;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import model.searchOption;
import mongo.mongoDao;
import service.mongoService;

@Controller
public class serchContoller {

	@Autowired
	private mongoService service = new mongoService();

	// 선수검색 페이지 이동
	@RequestMapping(value = "playerList.do")
	public void playerList() {
	}

	// 선수상세페이지 이동
	// json타입의 문자열을 받아서 모델에 담아줌
	@RequestMapping(value = "playerDetailView.do", method = RequestMethod.POST)
	public void playerDetailView(@RequestParam String param, int id, Model Model, HttpSession session) {
		Model.addAttribute("rs", param);
		Model.addAttribute("comments", service.outputComments(id).toString());
		Model.addAttribute("userId", session.getAttribute("userid"));
	}
	
	@RequestMapping(value = "attentionPlayers.do", method = RequestMethod.POST)
	public @ResponseBody String attentionPlayers(@RequestBody Map<String, Object> map) {
		List<Integer> list = (List<Integer>) map.get("spid");
		return service.searchSpid(list).toString();
	}

	// 선수검색시 검색 결과를 리턴
	// 모델 클래스로 데이터 받아서 서비스의 searchPlayer로 결과 값을 리턴
	@RequestMapping(value = "searchPlayers.do", method = RequestMethod.POST)
	public @ResponseBody String searchBasic(@RequestBody searchOption so, Model model) {
		return service.searchPlayers(so).toString();
	}

	// 플레이서 간략 상세페이지이동
	// 프론트에서 사용시에 비동기통신을 사용함으로 페이지 문서자체를 리턴하게 됨
	@RequestMapping(value = "playerView.do")
	public void playerView(@RequestBody Map<String, Object> map, Model Model) {
		ObjectMapper objectMapper = new ObjectMapper();
		String rs;
		System.out.println(map.toString());
		try {
			rs = objectMapper.writeValueAsString(map);
			Model.addAttribute("rs", rs);
		} catch (JsonProcessingException e) {
			System.out.println("파싱안됨");
			e.printStackTrace();
		}
	}

	@RequestMapping(value = "insertPlayerComments.do", method = RequestMethod.POST)
	public @ResponseBody String insertPlayerComments(@RequestBody Map<String, Object> map, HttpSession session) {
		String userId = (String) session.getAttribute("userid");
		if (userId != null) {
			map.put("userId", userId);
			return service.insertComments(map);
		} else {
			return null;
		}
	}

	@RequestMapping(value = "modifyComments.do", method = RequestMethod.POST)
	public @ResponseBody String modifyComments(@RequestBody Map<String, Object> map, HttpSession session, Model model) {
		String userId = (String) session.getAttribute("userid");
		if (userId != null) {
			model.addAttribute("userId", userId);
			return service.modifyComments(map).toString();
		} else {
			return null;
		}
	}

	@RequestMapping(value = "deleteComments.do", method = RequestMethod.POST)
	public @ResponseBody String deleteComments(String checkId, HttpSession session) {
		String userId = (String) session.getAttribute("userid");
		if (userId.equals(checkId)) {
			return service.deleteComments(userId).toString();
		} else {
			return null;
		}
	}

	@RequestMapping(value = "getPlayerName.do", method = RequestMethod.POST)
	@ResponseBody
	public String test(@RequestBody String[] list) {
		ArrayList<Integer> pId = new ArrayList<>();
		mongoDao md = mongoDao.getInstance();

		for (String data : list) {
			int data1 = Integer.parseInt(data);
			pId.add(data1);
		}

		String dataSet = md.findPlayerName(pId).toString();
		return dataSet;
	}

}