package com.ihl.service.openclasstaskservice;

import com.ihl.model.openclasstask.OpenClassTask;

public interface OpenClassTaskService {
	public OpenClassTask saveOrUpdate(OpenClassTask openClassTask);
	public OpenClassTask get(int ID);
}
