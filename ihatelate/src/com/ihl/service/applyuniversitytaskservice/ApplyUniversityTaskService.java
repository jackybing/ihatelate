package com.ihl.service.applyuniversitytaskservice;

import com.ihl.model.applyuniversitytask.ApplyUniversityTask;

public interface ApplyUniversityTaskService {
	public ApplyUniversityTask saveOrUpdate(ApplyUniversityTask applyUniversityTask);
	public ApplyUniversityTask get(int ID);
}
