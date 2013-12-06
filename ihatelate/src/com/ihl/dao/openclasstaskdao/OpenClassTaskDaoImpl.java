package com.ihl.dao.openclasstaskdao;

import org.springframework.orm.hibernate3.support.HibernateDaoSupport;

import com.ihl.model.openclasstask.OpenClassTask;

public class OpenClassTaskDaoImpl extends HibernateDaoSupport implements OpenClassTaskDao{

	public OpenClassTask saveOrUpdate(OpenClassTask openClassTask) {
		getHibernateTemplate().saveOrUpdate(openClassTask);
		return openClassTask;
	}

	public OpenClassTask get(int ID) {
		return getHibernateTemplate().get(OpenClassTask.class, ID);
	}

}
