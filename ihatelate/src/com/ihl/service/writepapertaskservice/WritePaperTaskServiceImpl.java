package com.ihl.service.writepapertaskservice;

import com.ihl.dao.writepapertaskdao.WritePaperTaskDao;
import com.ihl.model.writepapertask.WritePaperTask;

public class WritePaperTaskServiceImpl implements WritePaperTaskService{
	private WritePaperTaskDao writePaperTaskDao;

	public WritePaperTask saveOrUpdate(WritePaperTask writePaperTask) {
		return writePaperTaskDao.saveOrUpdate(writePaperTask);
	}

	public WritePaperTaskDao getWritePaperTaskDao() {
		return writePaperTaskDao;
	}

	public void setWritePaperTaskDao(WritePaperTaskDao writePaperTaskDao) {
		this.writePaperTaskDao = writePaperTaskDao;
	}

	public WritePaperTask get(int ID) {
		return writePaperTaskDao.get(ID);
	}
}
