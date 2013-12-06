package com.ihl.service.writepapertaskservice;

import com.ihl.model.writepapertask.WritePaperTask;

public interface WritePaperTaskService {
	public WritePaperTask saveOrUpdate(WritePaperTask writePaperTask);
	public WritePaperTask get(int ID);
}
