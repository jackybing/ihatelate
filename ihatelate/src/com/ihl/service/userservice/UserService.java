package com.ihl.service.userservice;

import java.io.UnsupportedEncodingException;
import java.security.NoSuchAlgorithmException;
import java.util.List;

import com.ihl.model.user.User;

public interface UserService {
	public User checkUserForLogin(String email,String password) throws NoSuchAlgorithmException, UnsupportedEncodingException;
	public Boolean checkEmailForRegist(String email);
	public User getLoginUser();
	public User save(User user);
	public List<User> getAll();
	public Boolean uploadAvatar(Integer userID,String url,String disk);
	public void clear();
	public void update(User user);
}
