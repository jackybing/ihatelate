package com.ihl.dao.applyuniversitytaskdao;

import org.springframework.orm.hibernate3.support.HibernateDaoSupport;

import com.ihl.model.applyuniversitytask.ApplyUniversityTask;

public class ApplyUniversityTaskDaoImpl extends HibernateDaoSupport implements ApplyUniversityTaskDao{

	public ApplyUniversityTask saveOrUpdate(ApplyUniversityTask applyUniversityTask) {
		getHibernateTemplate().saveOrUpdate(applyUniversityTask);
		return applyUniversityTask;
	}

	public ApplyUniversityTask get(int ID) {
		return getHibernateTemplate().get(ApplyUniversityTask.class, ID);
	}
}
