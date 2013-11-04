package com.ihl.dao.booktaskdao;

import org.springframework.orm.hibernate3.support.HibernateDaoSupport;

import com.ihl.model.booktask.BookTask;

public class BookTaskDaoImpl extends HibernateDaoSupport implements BookTaskDao{

	public BookTask saveOrUpdate(BookTask bookTask) {
		getHibernateTemplate().saveOrUpdate(bookTask);
		return bookTask;
	}

}
