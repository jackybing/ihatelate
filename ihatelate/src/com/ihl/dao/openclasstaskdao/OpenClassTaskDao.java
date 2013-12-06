package com.ihl.dao.openclasstaskdao;

import com.ihl.model.openclasstask.OpenClassTask;

public interface OpenClassTaskDao {
	public OpenClassTask saveOrUpdate(OpenClassTask openClassTask);

	public OpenClassTask get(int ID);
}
