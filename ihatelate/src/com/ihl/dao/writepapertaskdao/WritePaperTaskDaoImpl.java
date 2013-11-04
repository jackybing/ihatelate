package com.ihl.dao.writepapertaskdao;

import org.springframework.orm.hibernate3.support.HibernateDaoSupport;

import com.ihl.model.writepapertask.WritePaperTask;

public class WritePaperTaskDaoImpl extends HibernateDaoSupport implements WritePaperTaskDao{

	public WritePaperTask saveOrUpdate(WritePaperTask writePaperTask) {
		getHibernateTemplate().saveOrUpdate(writePaperTask);
		return writePaperTask;
	}

}
