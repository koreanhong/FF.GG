package controller;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.stereotype.Component;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;

@Component //xml로 가능
public class LoginCheckInterceptor extends HandlerInterceptorAdapter{

//	@Override	//요청처리 컨트롤러로 넘어와서 실행 완료후에 수행할 작업
//	public void postHandle(HttpServletRequest request, HttpServletResponse response, Object handler,
//			ModelAndView modelAndView) throws Exception {
//		// TODO Auto-generated method stub
//		super.postHandle(request, response, handler, modelAndView);
//	}
	
	@Override	//요청처리 컨트롤러에 전달되기 전에 수행될 작업
	public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler)
			throws Exception {
		
		HttpSession session = request.getSession();
		String userid = (String)session.getAttribute("userid");
		
		if(userid==null) {
			response.sendRedirect("LoginForm.do");
			return false;
		}
		else
			return true;
	}
}
