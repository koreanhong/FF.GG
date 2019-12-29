<%@ page language="java" contentType="text/html; charset=UTF-8"
   pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>

<script src="https://code.jquery.com/jquery-2.2.4.js"
   integrity="sha256-iT6Q9iMJYuQiMWNd9lDyBUStIq/8PuOW33aOqmvFpqI="
   crossorigin="anonymous"></script>

<link rel="stylesheet" href="../css/community.css">
<style type="text/css">
#mypageTtable,#mypageHtable{
	border-collapse: inherit;
}

</style>
<script type="text/javascript">
   $(document).ready(function() {
      var userName = "${member.name}"
      var userId = "${member.id}"
      var userPoint = '${member.point}'

      $('#nameInput').val(userName).attr("readonly", true)
      $('#idInput').val(userId).attr("readonly", true)
      $('#pointInput').val(userPoint).attr("redonly", true)

      $('#withbtn').click(function() {
         if (confirm("탈퇴하시겠습니까?")) {
            location.href = 'Withdrawal.do?id=' + userId
         }

      })

   });
</script>
</head>

<body class="default">
   <div id="wrapper" class="sub">
      <header id="header" class="after_1102">
         <jsp:include page="header.jsp" />
      </header>
      <main id="middle" class="sub">
      <div class="wrap">
         <div class="leftdiv">
            <div id="logindiv">
               <c:if test="${result == 2}">
                  <jsp:include page="NotLogin.jsp"></jsp:include>
               </c:if>
               <c:if test="${result == 1}">
                  <jsp:include page="Login.jsp"></jsp:include>
               </c:if>
            </div>
            <div id="categorydiv">
               <div class="CategoryDiv" onclick="location.href='Humor_Main.do'">-
                  유머 게시판</div>
               <br>
               <div class="CategoryDiv" onclick="location.href='Tip_Main.do'">-
                  팁 게시판</div>
               <br>
               <div class="CategoryDiv" onclick="location.href='Report_Main.do'">-
                  신고 게시판</div>
                  <br>
               <div class="CategoryDiv" onclick="location.href='Chat.do'">-
                  나랑 할사람</div>
            </div>
         </div>
         <div id="centerwrapper">

            <div id="myDiv">
               <table id="myTable1">
                  <tr>
                     <td>이름</td>
                     <td>${member.name }</td>
                  </tr>
                  <tr>
                     <td>아이디</td>
                     <td>${member.id }</td>
                  </tr>
                  <tr>
                     <td>이메일</td>
                     <td>${member.email }</td>
                  </tr>
                  <tr>
                     <td>포인트</td>
                     <td>${member.point }</td>
                  </tr>
               </table>
            </div>
            
            <div id="myPageboard">
               <table style="border: 1px black solid; width: 800px; height: 200px; margin-left: auto; margin-right: auto;" id="mypageHtable">
                  <tr>
                     <td colspan="6">유머 게시판</td>
                  </tr>
                  <tr align="center">
                     <td>제 목</td>
                     <td>작성일</td>
                     <td>조회수</td>
                     <td>추천수</td>
                  </tr>

                  <c:forEach items="${hboard }" var="h">
                        <tr align="center">
                           <td><a href="Humor_view.do?num=${h.num }">${h.title } </a></td>
                           <td><fmt:formatDate value="${h.writedate }"
                                 pattern="yyyy-MM-dd" /></td>
                           <td>${h.readCount }</td>
                           <td>${h.up }</td>
                        </tr>
                  </c:forEach>
               </table>
               
               <table style="border: 1px black solid; width: 800px; height: 200px; margin-left: auto; margin-right: auto;" id="mypageTtable">
                  <tr>
                     <td colspan="6">팁 게시판</td>
                  </tr>
                  <tr align="center">
                     <td>제 목</td>
                     <td>작성일</td>
                     <td>조회수</td>
                     <td>추천수</td>
                  </tr>

                  <c:forEach items="${tboard }" var="t">
                     <tr align="center">
                        <td><a href="Tip_view.do?num=${t.num }">${t.title } </a></td>
                        <td><fmt:formatDate value="${t.writedate }"
                              pattern="yyyy-MM-dd" /></td>
                        <td>${t.readCount }</td>
                        <td>${t.up }</td>
                     </tr>
                  </c:forEach>
               </table>
            </div>

            <div id="btnDiv1">
               <table style="float: right;" id="btdTable1">
                  <tr>
                     <td>
                        <button type="button"
                           onclick="location.href='MypageUpdateForm.do'">수정하기</button>
                     </td>
                     <td>
                        <button id="withbtn" type="button">탈퇴하기</button>
                     </td>
                  </tr>
               </table>
            </div>

         </div>
      </div>
      </main>
      <footer id="footer" role="contentinfo">
         <jsp:include page="footer.jsp" />
      </footer>
   </div>
</body>

</html>