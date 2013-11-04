package com.ihl.service.userservice;

import java.io.UnsupportedEncodingException;
import java.security.NoSuchAlgorithmException;
import java.util.List;


import com.ihl.dao.userdao.UserDao;
import com.ihl.model.user.User;
import com.ihl.utility.EncoderUtil;
import com.opensymphony.xwork2.ActionContext;

public class UserServiceImpl implements UserService {
	private UserDao userDao;

	public UserDao getUserDao() {
		return userDao;
	}

	public void setUserDao(UserDao userDao) {
		this.userDao = userDao;
	}
	
	public User checkUserForLogin(String email,String password) throws NoSuchAlgorithmException, UnsupportedEncodingException{
		User user=userDao.getUserByEmail(email);
		if(user!=null&&user.getPassword().equals(EncoderUtil.getEncodedPasswordByMd5(password))){
			return user;
		}else{
			return null;
		}
	}
	public Boolean checkEmailForRegist(String email){
		return userDao.getUserByEmail(email)==null?true:false;//email exists?false:true;
	}
	
	public User getLoginUser() {
		int id = (Integer) ActionContext.getContext().getSession().get("userID");
		User user = userDao.getUserById(id);
		return user;
	}

	public User save(User user) {
		return userDao.save(user);
	}

	public List<User> getAll() {
		return userDao.getAll();
	}
}
