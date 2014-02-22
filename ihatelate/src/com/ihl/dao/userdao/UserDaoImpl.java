package com.ihl.dao.userdao;


import java.util.List;

import org.apache.log4j.Logger;
import org.springframework.orm.hibernate3.support.HibernateDaoSupport;

import com.ihl.model.user.User;


public class UserDaoImpl extends HibernateDaoSupport implements UserDao {
	private static final Logger log = Logger.getLogger(UserDaoImpl.class);
	
	@SuppressWarnings("unchecked")
	public User getUserByEmail(String email) {
		List<User> users =  getHibernateTemplate().find("from User u where u.email= ?",email);
		if(users.size() > 0){
			return users.get(0);
		}else {
			return null;
		}
	}
	
	@SuppressWarnings("unchecked")
	public List<User> findAllUsers(){
		return (List<User>) getHibernateTemplate().find("from User");
	}
	
	public User getUserById(int id) {
		return getHibernateTemplate().get(User.class, id);
	}

	public User save(User user) {
		getHibernateTemplate().save(user);
		return user;
	}

	@SuppressWarnings("unchecked")
	public List<User> getAll() {
		return getHibernateTemplate().find("from User");
	}
	
	public Boolean uploadAvatar(Integer userID,String url,String disk){
		User user=getUserById(userID);
		user.setAvatar(url);
		user.setDisk(disk);
		boolean tag=true;
		try {
			getHibernateTemplate().saveOrUpdate(user);
		} catch (Exception e) {
			// TODO: handle exception
			log.error("upload avatar failed!"+"  "+e.toString());
			tag=false;
		}		
		return tag;
	}

	public void clear() {
		getHibernateTemplate().clear();
	}

	public void update(User user) {
		getHibernateTemplate().update(user);
	}
}
