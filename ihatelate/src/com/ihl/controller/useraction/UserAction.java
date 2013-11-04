package com.ihl.controller.useraction;

import java.io.UnsupportedEncodingException;
import java.security.NoSuchAlgorithmException;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import net.sf.json.JSONObject;

import com.ihl.model.user.User;
import com.ihl.service.userservice.UserService;
import com.ihl.utility.EncoderUtil;
import com.opensymphony.xwork2.ActionContext;
import com.opensymphony.xwork2.ActionSupport;

public class UserAction extends ActionSupport {

	private static final long serialVersionUID = -3132022577419081706L;
	private UserService userService;
	
	private String email;
	private String password;
	private String username;
	private String sex;
	private String result;
	
	//注册
	public String register() throws NoSuchAlgorithmException, UnsupportedEncodingException{
		Map<String, String> resultMap = new HashMap<String, String>();
		
		if(userService.checkEmailForRegist(email)){
			User user = new User();
			user.setEmail(email);
			user.setPassword(EncoderUtil.getEncodedPasswordByMd5(password));
			user.setSex(Integer.parseInt(sex));
			user.setUserName(username);
			user.setCreateDate(new Date());
			
			userService.save(user);
			
			resultMap.put("statusCode", "200");
			resultMap.put("info", "register successfully !");
		}else {
			resultMap.put("statusCode", "404");
			resultMap.put("info", "the emial has been registered!");
		}
		
		setResult(JSONObject.fromObject(resultMap).toString());
		
		return SUCCESS;
	}
	//登录
	public String login() throws Exception{
		Map<String, String> resultMap = new HashMap<String, String>();
		User user = userService.checkUserForLogin(email, password);
		if(user!=null){
			resultMap.put("statusCode", "200");
			resultMap.put("username", user.getUserName());
			resultMap.put("info", "login successfully !");
			ActionContext.getContext().getSession().put("userID",
					user.getId());
		}else {
			resultMap.put("statusCode", "404");
			resultMap.put("info", "email or password error!");
		}
		setResult(JSONObject.fromObject(resultMap).toString());
		return SUCCESS;
	}
	//检查email是否重复
	public String checkEmail() throws Exception{
		Map<String, String> resultMap = new HashMap<String, String>();
		if(userService.checkEmailForRegist(email)){
			resultMap.put("statusCode", "200");//current email is available
		}else {
			resultMap.put("statusCode", "404");//current email has existed,change!
		}
		setResult(JSONObject.fromObject(resultMap).toString());
		return SUCCESS;
	}
	//注销
	public String logout(){
		Map<String, String> resultMap = new HashMap<String, String>();
		ActionContext.getContext().getSession().remove("userID");
		resultMap.put("statusCode", "200");
		resultMap.put("info", "logout successfully !");
		setResult(JSONObject.fromObject(resultMap).toString());
		return SUCCESS;
	}
	public String getUsername() {
		return username;
	}
	public void setUsername(String username) {
		this.username = username;
	}
	public String getSex() {
		return sex;
	}
	public void setSex(String sex) {
		this.sex = sex;
	}
	public UserService getUserService() {
		return userService;
	}
	public void setUserService(UserService userService) {
		this.userService = userService;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	public String getResult() {
		return result;
	}
	public void setResult(String result) {
		this.result = result;
	}
}
