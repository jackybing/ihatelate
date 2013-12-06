package com.ihl.service.applyuniversitytaskservice;

import com.ihl.dao.applyuniversitytaskdao.ApplyUniversityTaskDao;
import com.ihl.model.applyuniversitytask.ApplyUniversityTask;

public class ApplyUniversityTaskServiceImpl implements ApplyUniversityTaskService{
	private ApplyUniversityTaskDao applyUniversityTaskDao;
	
	public ApplyUniversityTask saveOrUpdate(ApplyUniversityTask applyUniversityTask) {
		return applyUniversityTaskDao.saveOrUpdate(applyUniversityTask);
	}

	public ApplyUniversityTaskDao getApplyUniversityTaskDao() {
		return applyUniversityTaskDao;
	}

	public void setApplyUniversityTaskDao(
			ApplyUniversityTaskDao applyUniversityTaskDao) {
		this.applyUniversityTaskDao = applyUniversityTaskDao;
	}

	public ApplyUniversityTask get(int ID) {
		return applyUniversityTaskDao.get(ID);
	}
}
