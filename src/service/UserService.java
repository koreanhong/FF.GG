package service;

import java.io.IOException;



import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;
import java.util.Iterator;
import java.util.List;

import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;
import org.springframework.stereotype.Service;

import com.fasterxml.jackson.core.JsonParseException;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.mashape.unirest.http.HttpResponse;
import com.mashape.unirest.http.JsonNode;
import com.mashape.unirest.http.Unirest;
import com.mashape.unirest.http.exceptions.UnirestException;

import model.MatchID;
import model.UserInfo;

@Service
public class UserService {

	public static String key = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhY2NvdW50X2lkIjoiNTcwNDI2MDU1IiwiYXV0aF9pZCI6IjIiLCJ0b2tlbl90eXBlIjoiQWNjZXNzVG9rZW4iLCJzZXJ2aWNlX2lkIjoiNDMwMDExNDgxIiwiWC1BcHAtUmF0ZS1MaW1pdCI6IjIwMDAwOjEwIiwibmJmIjoxNTcxMjAwNjgwLCJleHAiOjE2MzQyNzI2ODAsImlhdCI6MTU3MTIwMDY4MH0.abasMAu8g9C55RCSBh-VN7yayf56lAq0OwncnYo4He4";

	// 닉네임으로 accessID , level 가져옴
	public UserInfo getAccessID(String nickname) {
		UserInfo u = null;
		try {
			String url = "https://api.nexon.co.kr/fifaonline4/v1.0/users?nickname="
					+ URLEncoder.encode(nickname, "UTF-8");

			HttpResponse<JsonNode> respone = Unirest.get(url).header("Authorization", key).asJson();

			ObjectMapper objectMapper = new ObjectMapper();

			u = objectMapper.readValue(respone.getBody().toString(), UserInfo.class);
			return u;

		} catch (UnsupportedEncodingException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (UnirestException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (JsonParseException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (JsonMappingException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return u;
	}

	// accessid와 matchtype으로 MatchID 가져옴
	public String[] getMatchID(String accessid, int limit) {
		MatchID m = new MatchID();
		try {
			String url = "https://api.nexon.co.kr/fifaonline4/v1.0/users/" + accessid
					+ "/matches?matchtype=50&offset=0&limit="+limit;

			HttpResponse<JsonNode> respone = Unirest.get(url).header("Authorization", key).asJson();

			ObjectMapper objectMapper = new ObjectMapper();

			objectMapper.configure(DeserializationFeature.ACCEPT_SINGLE_VALUE_AS_ARRAY, true);
			String result = objectMapper.readValue(respone.getBody().toString(), Object.class).toString();
			String result2 = result.substring(1, result.length() - 1);

			m.setMatchid(result2.split(", "));
			return m.getMatchid();

		} catch (UnsupportedEncodingException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (UnirestException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (JsonParseException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (JsonMappingException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return m.getMatchid();
	}

	// matchID로 MatchInfo 가져옴
	public String getInfo(String MatchID) {
		List<Object> ab = null;
		String result = null;
		try {
			String url = "https://api.nexon.co.kr/fifaonline4/v1.0/matches/" + MatchID;

			HttpResponse<JsonNode> respone = Unirest.get(url).header("Authorization", key).asJson();

			ObjectMapper objectMapper = new ObjectMapper();

			objectMapper.configure(DeserializationFeature.ACCEPT_SINGLE_VALUE_AS_ARRAY, true);
			ab = objectMapper.readValue(respone.getBody().toString(), List.class);
			result = objectMapper.writeValueAsString(ab);
			return result;

		} catch (UnsupportedEncodingException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (UnirestException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (JsonParseException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (JsonMappingException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return result;
	}
	
	public String getDivision(String accessid) {
		List<Object> ab = null;
		String result = null;
		try {
			
			String url = "https://api.nexon.co.kr/fifaonline4/v1.0/users/" + accessid
					+ "/maxdivision";
			
			HttpResponse<JsonNode> respone = Unirest.get(url).header("Authorization", key).asJson();
			
			ObjectMapper objectMapper = new ObjectMapper();
			
			objectMapper.configure(DeserializationFeature.ACCEPT_SINGLE_VALUE_AS_ARRAY, true);
			ab = objectMapper.readValue(respone.getBody().toString(), List.class);
			result = objectMapper.writeValueAsString(ab);
						
			return result;
		} catch (UnsupportedEncodingException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (UnirestException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (JsonParseException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (JsonMappingException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return result;
	}
	
	public String getTrade(String accessid, String tradetype) {
		List<Object> ab = null;
		String result = null;
		try {
			String url = "https://api.nexon.co.kr/fifaonline4/v1.0/users/"+accessid+"/markets?tradetype="+tradetype+"&offset=0&limit=5";

			HttpResponse<JsonNode> respone = Unirest.get(url).header("Authorization", key).asJson();

			ObjectMapper objectMapper = new ObjectMapper();

			objectMapper.configure(DeserializationFeature.ACCEPT_SINGLE_VALUE_AS_ARRAY, true);
			ab = objectMapper.readValue(respone.getBody().toString(), List.class);
			result = objectMapper.writeValueAsString(ab);
			return result;

		} catch (UnsupportedEncodingException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (UnirestException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (JsonParseException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (JsonMappingException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return result;
	}
	
	public String getRanking() {
		String result = "";
		
		result +="{\"ranker\":[";
		for(int i=1; i<6; i++) {
	         String url = "http://fifaonline4.nexon.com/datacenter/rank?n4pageno=" + i;
	         Document doc = null;
	         
	         try {
	            doc = Jsoup.connect(url).get();
	         } catch (IOException e) {
	            // TODO Auto-generated catch block
	            e.printStackTrace();
	         }
	         
	         Elements element = doc.select("div.tbody");
	         
	         Iterator<Element> ie1 = element.select("span.name.profile_pointer").iterator();
	         Iterator<Element> ie2 = element.select("span.txt").iterator();
	         Iterator<Element> ie3 = element.select("span.td.rank_before").iterator();
	         Iterator<Element> ie4 = element.select("span.td.rank_r_rate").iterator();
	         Iterator<Element> ie5 = element.select("span.td.rank_r_win_point").iterator();
	         while (ie1.hasNext()) {
	        	result+="{\"id\":\""+ie1.next().text()+"\",";
	        	result+="\"level\":\""+ie2.next().text()+"\",";
	        	result+="\"game\":\""+ie3.next().text()+"\",";
	        	result+="\"rate\":\""+ie4.next().text()+"\",";
	        	result+="\"point\":\""+ie5.next().text()+"\"},";
	         }
	      }
		result = result.substring(0, result.length()-1);
		result+="]}";
		
		return result;
	}
}
