package com.ihl.service.openclasstaskservice;

import com.ihl.dao.openclasstaskdao.OpenClassTaskDao;
import com.ihl.model.openclasstask.OpenClassTask;

public class OpenClassTaskServiceImpl implements OpenClassTaskService{
	private OpenClassTaskDao openClassTaskDao;
	public OpenClassTask saveOrUpdate(OpenClassTask openClassTask) {
		return openClassTaskDao.saveOrUpdate(openClassTask);
	}
	public OpenClassTaskDao getOpenClassTaskDao() {
		return openClassTaskDao;
	}
	public void setOpenClassTaskDao(OpenClassTaskDao openClassTaskDao) {
		this.openClassTaskDao = openClassTaskDao;
	}
	public OpenClassTask get(int ID) {
		return openClassTaskDao.get(ID);
	}
}
