package com.ihl.filter;

import java.io.IOException;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;


/**
 * Title:登录验证过滤器
 * 
 * 在web.xml中配置不需过滤的页面，格式为"/index.html,index2.html"(多个页面之间用逗号分隔)
 *
 */
public class AccessFilter implements Filter{
	private String excludedPage;
	private String loginPage;

	public void init(FilterConfig config) throws ServletException {
		excludedPage = config.getInitParameter("excludedPage");
		loginPage = config.getInitParameter("loginPage");
	}
	
	public void doFilter(ServletRequest request, ServletResponse response,
			FilterChain chain) throws IOException, ServletException {
		HttpServletRequest req = (HttpServletRequest) request;
		HttpServletResponse res = (HttpServletResponse) response;
		HttpSession session = req.getSession();
		Integer userID = (Integer) session.getAttribute("userID");
		
		String contextPath = req.getContextPath();
		
		//获得请求页面（如“/index.html”）
		String servletPath = req.getServletPath();
		//请求页面是否需要过滤、是否为图片css和js文件、session是否为空
		if(isExcludedPage(servletPath)
				|| isPictureOrCSSOrJS(servletPath)
				|| userID != null){
			chain.doFilter(req, res);
			
		}else {
			if(req.getHeader("x-requested-with")!=null   
                    && req.getHeader("x-requested-with").equalsIgnoreCase("XMLHttpRequest")){   
				res.getWriter().write("{timeout:true}");   
            }else{  
            	res.sendRedirect(contextPath + loginPage); 
            }  
		}
	}
	
	public boolean isExcludedPage(String servletPath){
		return excludedPage.contains(servletPath);
	}
	
	private static boolean isPictureOrCSSOrJS(String servletPath) {
		String pic_css_js_Suffix = servletPath.substring(servletPath
				.lastIndexOf(".") + 1);
		return pic_css_js_Suffix.equals("png")
				|| pic_css_js_Suffix.equals("gif")
				|| pic_css_js_Suffix.equals("css")
				|| pic_css_js_Suffix.equals("js")
				|| pic_css_js_Suffix.equals("jpg")
				|| pic_css_js_Suffix.equals("jpeg");
	}
	
	
	public void destroy() {
		// TODO Auto-generated method stub
		
	}

}
