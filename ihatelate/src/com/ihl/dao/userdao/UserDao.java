package com.ihl.dao.userdao;

import java.util.List;

import com.ihl.model.user.User;

public interface UserDao {
	public User getUserByEmail(final String email);
	public User getUserById(final int id);
	public User save(User user);
	public List<User> getAll();
	public Boolean uploadAvatar(Integer userID,String url,String disk);
	public void clear();
	public void update(User user);
	public List<User> findAllUsers();
	
}
