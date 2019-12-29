package mongo;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import org.bson.Document;
import org.bson.conversions.Bson;

import com.mongodb.client.FindIterable;
import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoClients;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;
import com.mongodb.client.result.DeleteResult;
import com.mongodb.client.result.UpdateResult;

import static com.mongodb.client.model.Filters.*;

public class mongoDao {
	
	private MongoCollection<Document> playerCollection;
	private MongoCollection<Document> commentCollection;
	private MongoCollection<Document> squadMadeCollection;
	private static mongoDao instance;
	
	public mongoDao() {
		MongoClient mongoClient = MongoClients.create();
		MongoDatabase database = mongoClient.getDatabase("fifaplayers");
		playerCollection = database.getCollection("players");
		commentCollection = database.getCollection("comments");
		squadMadeCollection = database.getCollection("squadmade");
	}
	
	public static mongoDao getInstance() {
		if(instance == null) 
			instance = new mongoDao();	
		return instance;
	}
	
	public List<String> playerFind(Bson bson) {
		List<String> result = new ArrayList<String>();
		FindIterable<Document> doc = playerCollection.find(bson);
		for(Document document : doc) {
			result.add(document.toJson());
		}
		return result;
	}

	public List<String> playerFindAll() {
		List<String> result = new ArrayList<String>();
		FindIterable<Document> doc = playerCollection.find().limit(200);
		
		for(Document document : doc) {
			result.add(document.toJson());
		}
		return result;
	}

	
	public List<String> filterFind(List<Bson> filterList) {
		List<String> rs = new ArrayList<String>();
		FindIterable<Document> doc = null;
		if(filterList.size() != 0) {
			doc = playerCollection.find(and(filterList)).limit(200);			
		}else {
			doc = playerCollection.find().limit(200); 
		}
		for(Document document : doc) {
			document.append("rating", averageRatingFind(document.get("id")));
			rs.add(document.toJson());
		}
		
		return rs;
	}
	
	public List<String> findSquad(Bson bson) {
		List<String> rs = new ArrayList<String>();
		FindIterable<Document> doc = squadMadeCollection.find(bson);
		for(Document documentRs : doc) {
			rs.add(documentRs.toJson());
		}
		return rs; 
	}
	
	//몽고 특정상 서버 연결에 하자없으면 일단 넣고 봅니다
	//리턴값은 서비스 로직 처리 때문에 넣었습니다
	public int inputSquadMade(Document document) {
		squadMadeCollection.insertOne(document);
		return 1;
	}
	
	public List<String> outSquadList(Document document){
		List<String> rs = new ArrayList<String>();
		FindIterable<Document> doc = squadMadeCollection.find(document);
		
		for(Document documentRs : doc) {
			rs.add(documentRs.toJson());
		}
		return rs;
	}
	
	
	public DeleteResult deleteSquad(Document document){
		return squadMadeCollection.deleteOne(document);
	}
	
	//뎃글 인설트
	public int commentsInsert(Document document) {
		commentCollection.insertOne(document);
		return 1;
	}
	
	//뎃글 업데이트
	public UpdateResult commentsUpdate(Bson bson, Document document) {
		return commentCollection.updateOne(bson, document);
	}
	
	//뎃글 삭제
	public DeleteResult commentsDelete(Document document) {
		return commentCollection.deleteOne(document);
	}
	
	public List<String> outCommentsList(Document document) {
		List<String> rs = new ArrayList<String>();
		FindIterable<Document> doc = commentCollection.find(document);
		for(Document documentRs : doc) {
			rs.add(documentRs.toJson());
		}
		return rs;
	}
	
	//해당 뎃글의 모든 댓글을 읽어서 평점을 계산 해서 리턴해주는 메소드
	public int averageRatingFind(Object object) {
		int allScore = 0;
		int commentsNumber = 0;
		FindIterable<Document> doc = commentCollection.find(new Document("id", object)).projection(new Document("score", true).append("_id", false));
		for(Document document : doc) {
			allScore += (int)document.get("score");
			commentsNumber ++;
		}
		if(commentsNumber == 0) {
			return 0;
		}else {
			return Math.round(allScore/commentsNumber);			
		}
	}
	
	public List<String> findPlayerName(List<Integer> integers) {
	      // 리턴을 위한 리스트입니다.
	      List<String> rs = new ArrayList<String>();
	      List<Bson> bsons = new ArrayList<Bson>();
	      
	      for (int i = 0; i < integers.size(); i++) {
	         bsons.add(new Document("id", integers.get(i)));
	      }
	      
	      FindIterable<Document> doc = playerCollection.find(or(bsons))
	            .projection(new Document("name", true).append("id", true).append("_id", false));
	      
	      for (Document document : doc) {
	         rs.add(document.toJson());
	      }
	      return rs;
	   }
	
	//선수 팀컬러 추가 기능입니다. 일단 무시하세요.
	public void setTeamColor(List<Integer> integers, HashMap<Integer, List<String>> hashMap) {
		for(int i = 0 ; i<integers.size(); i++) {
			System.out.println(integers.get(i) + ":"+hashMap.get(integers.get(i)));
			playerCollection.updateOne(
					eq("id", integers.get(i)), 
					new Document("$set", new Document("team_color",hashMap.get(integers.get(i)))));
		}
	}
	
	
}