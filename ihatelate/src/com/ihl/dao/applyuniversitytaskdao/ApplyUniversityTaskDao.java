package com.ihl.dao.applyuniversitytaskdao;

import com.ihl.model.applyuniversitytask.ApplyUniversityTask;

public interface ApplyUniversityTaskDao {
	public ApplyUniversityTask saveOrUpdate(ApplyUniversityTask applyUniversityTask);

	public ApplyUniversityTask get(int ID);
}
