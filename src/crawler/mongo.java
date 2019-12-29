package crawler;

import com.mongodb.MongoClient;
import com.mongodb.ServerAddress;
import com.mongodb.client.MongoDatabase;
import com.mongodb.client.MongoIterable;

public class mongo {
	
	public static void main(String[] args) {
		
        String MongoDB_IP = "127.0.0.1";
        int MongoDB_PORT = 27017;
        String DB_NAME = "fifaplayers";
 
        //Connect to MongoDB
        MongoClient  mongoClient = new MongoClient(new ServerAddress(MongoDB_IP, MongoDB_PORT));
     
        //View Database List
        MongoIterable<String> databases = mongoClient.listDatabaseNames();
    
        System.out.println("=====Database List===== ");
        int num =1 ;
        for (String dbName : databases) {
            System.out.println( num  + ". " + dbName);
            num++;
        }
      
        System.out.println();
        
        //Connect Database and Show Collection List in Database
        MongoDatabase db = mongoClient.getDatabase(DB_NAME);
        MongoIterable<String> collections = db.listCollectionNames();
    
        System.out.println("Database : " + DB_NAME);
        for (String colName : collections) {
            System.out.println(" + Collection: " + colName);
        }
        
        mongoClient.close();

	}

}