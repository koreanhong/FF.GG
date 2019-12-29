package service;

import model.HumorCocomment;
import model.Humor_Board;
import model.Report_Board;
import model.TipCocomment;
import model.Tip_Board;

public interface AdminService {

   public void adminHumorCommentDelete(int num);
   public void adminHumorCocommentDelete(int num);
   public void adminHumorBoardDelete(int num);
   public void adminHumorBoardUpdate(Humor_Board board);
   
   public void adminTipCommentDelete(int num);
   public void adminTipCocommentDelete(int num);
   public void adminTipBoardDelete(int num);
   public void adminTipBoardUpdate(Tip_Board board);
   
   public void adminReportCommentDelete(int num);
   public void adminReportCocommentDelete(int num);
   public void adminReportBoardDelete(int num);
   public void adminReportBoardUpdate(Report_Board board);
}
