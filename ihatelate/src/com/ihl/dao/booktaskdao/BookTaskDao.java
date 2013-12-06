package com.ihl.dao.booktaskdao;

import com.ihl.model.booktask.BookTask;

public interface BookTaskDao {
	public BookTask saveOrUpdate(BookTask bookTask);

	public BookTask get(int ID);
}
