package crawler;

import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.IOException;
import java.util.ArrayList;

import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.select.Elements;

import com.google.gson.JsonArray;
import com.google.gson.JsonIOException;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import com.google.gson.JsonSyntaxException;
import com.mongodb.MongoClient;
import com.mongodb.ServerAddress;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;

public class crawler {
	
	public static void main(String[] args) {
		
//		MongoDB 연결
		String MongoDB_IP = "127.0.0.1";
		int MongoDB_PORT = 27017;
		String DB_NAME = "fifaplayers";
		
		MongoClient mongoClient = new MongoClient(new ServerAddress(MongoDB_IP, MongoDB_PORT));
		MongoDatabase db = mongoClient.getDatabase(DB_NAME);
		MongoCollection<org.bson.Document> collection = db.getCollection("players1");
		
		try {
			
//			선수들 고유 아이디값 불러오기
			JsonParser parser = new JsonParser();
			JsonArray idList = (JsonArray) parser.parse(new FileReader("C:\\Users\\ysk21\\Desktop\\Programming\\gukbi\\ACBaloHam\\spid.json")).getAsJsonArray();
			String url = "http://fifaonline4.nexon.com/DataCenter/PlayerInfo?spid=";
			
			for (int i = 0; i < idList.size(); i++) {
				JsonObject idObj = (JsonObject) idList.get(i);
				String id = idObj.get("id").getAsString();
				Document doc = Jsoup.connect(url + id).get();
				
//				info_ab 따로 빼냄
				org.bson.Document info_ab = new org.bson.Document();
				Elements eles = doc.select(".info_ab").select("span");
				if (eles.size() == 0) continue;
				
				for (int j = 1; j < eles.size() - 1; j += 2) {
					info_ab.append(eles.get(j).text(), eles.get(j + 1).text());
				}
				
//				키, 몸무게 등 기본 정보
				org.bson.Document basic_Info = new org.bson.Document(
						"pay_side", doc.select(".pay_side").get(0).text())
						.append("info_ab", info_ab)
						.append("birth", doc.select(".birth").text())
						.append("height", doc.select(".height").text())
						.append("weight", doc.select(".weight").text())
						.append("bodytype", doc.select(".physical").text())
						.append("skill", doc.select(".skill").text())
						.append("foot", doc.select(".foot").text())
						.append("season", doc.select(".season").text().trim())
						.append("team", doc.select(".info_team").text())
						.append("character", doc.select(".skill_wrap").text());

//				스피드, 슛 등 기본 스탯
				org.bson.Document average_Stat = new org.bson.Document(
						"speed", doc.select(".ab").select(".value").get(0).text())
						.append("av_shoot", doc.select(".ab").select(".value").get(1).text())
						.append("av_pass", doc.select(".ab").select(".value").get(2).text())
						.append("av_dribble", doc.select(".ab").select(".value").get(3).text())
						.append("av_defense", doc.select(".ab").select(".value").get(4).text())
						.append("av_physical", doc.select(".ab").select(".value").get(5).text());

//				상세 스탯
				org.bson.Document detail_Set = null;
				String[] stat_Name = { "spped", "acceleration", "determinative", "shot_power", "range_shot",
						"location_selection", "balinese_shot",
						"penalty_kick", "short_pass", "visual_range", "crossing", "long_pass", "free_kick", "curve",
						"dribble", "ball_control", "agility", "balance", "reaction_velocity", "mantoman_defense", "tackle",
						"Interception", "hader", "sliding_tackle", "physical_fight", "staminer", "hostility", "jump",
						"calmness", "gk_diving", "gk_handling", "gk_kick", "gk_reaction_velocity", "gk_location_selection", };
				
				Elements rs = doc.select(".ab");
				detail_Set = new org.bson.Document(stat_Name[0], rs.get(6).select("div").get(1).text());
				for (int j = 7; j < 40; j++) {
					detail_Set.append(stat_Name[j-6], rs.get(j).select("div").get(1).text());
				}
				
//				포지션 별 점수
				ArrayList<String> position_Value = new ArrayList<String>();
				int size = doc.select(".ovr_set").select(".value").size();
				for (int j = 0; j < size; j++) {
					position_Value.add(doc.select(".ovr_set").select(".value").get(j).text());
				}

//				전체 한 번에 담는 부분임
				org.bson.Document documentAll = new org.bson.Document("id", id)
						.append("name", doc.select(".name").get(0).text())
						.append("basic_info", basic_Info)
						.append("average_stat", average_Stat)
						.append("detail_set", detail_Set)
						.append("position_value", position_Value);
				
				System.out.println(i);
				
				collection.insertOne(documentAll);
				
			}//for end
			
			mongoClient.close();
			System.out.println("끝");
			
		} catch (JsonIOException e) {
			e.printStackTrace();
		} catch (JsonSyntaxException e) {
			e.printStackTrace();
		} catch (FileNotFoundException e) {
			e.printStackTrace();
		}  catch (IOException e) {
			e.printStackTrace();
		}// try end
		
	}// main end
	
}// class end