package com.ihl.dao.userdao;


import java.util.List;

import org.apache.log4j.Logger;
import org.springframework.orm.hibernate3.support.HibernateDaoSupport;

import com.ihl.model.user.User;


public class UserDaoImpl extends HibernateDaoSupport implements UserDao {
	private static final Logger log = Logger.getLogger(UserDaoImpl.class);
	
	public User getUserByEmail(String email) {
		List<User> users =  getHibernateTemplate().find("from User u where u.email= ?",email);
		if(users.size() > 0){
			return users.get(0);
		}else {
			return null;
		}
	}
	
	public User getUserById(int id) {
		return getHibernateTemplate().get(User.class, id);
	}

	public User save(User user) {
		getHibernateTemplate().save(user);
		return user;
	}

	public List<User> getAll() {
		return getHibernateTemplate().find("from User");
	}
}
