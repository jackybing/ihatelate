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
	
	private String url;//头像物理地址
	private String disk;//头像服务器磁盘地址
	
	private String avatar;//默认头像地址
	
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
			
			user.setAvatar(avatar);//设置默认头像地址
			user.setDisk("");
			
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
	
	public String uploadAvatar() throws Exception{
		Map<String, String> resultMap = new HashMap<String, String>();
		Integer userID=(Integer) ActionContext.getContext().getSession().get("userID");
		if(userID==null){
			resultMap.put("info", "please login first !");
			resultMap.put("statusCode", "404");
		}else{
			if(userService.uploadAvatar(userID, url, disk)){
				resultMap.put("info", "upload avatar successfully !");
				resultMap.put("statusCode", "200");
			}else {
				resultMap.put("info", "upload avatar fail !");
				resultMap.put("statusCode", "404");
			}
		}
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
	public String getUrl() {
		return url;
	}
	public void setUrl(String url) {
		this.url = url;
	}
	public String getDisk() {
		return disk;
	}
	public void setDisk(String disk) {
		this.disk = disk;
	}
	public String getAvatar() {
		return avatar;
	}
	public void setAvatar(String avatar) {
		this.avatar = avatar;
	}
	
}
