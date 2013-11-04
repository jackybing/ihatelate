package com.ihl.service.booktaskservice;

import com.ihl.dao.booktaskdao.BookTaskDao;
import com.ihl.model.booktask.BookTask;

public class BookTaskServiceImpl implements BookTaskService{
	private BookTaskDao bookTaskDao;
	
	public BookTask saveOrUpdate(BookTask bookTask) {
		return bookTaskDao.saveOrUpdate(bookTask);
	}
	
	public BookTaskDao getBookTaskDao() {
		return bookTaskDao;
	}
	public void setBookTaskDao(BookTaskDao bookTaskDao) {
		this.bookTaskDao = bookTaskDao;
	}
}
