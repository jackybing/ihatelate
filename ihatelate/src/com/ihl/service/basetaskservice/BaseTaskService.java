package com.ihl.service.basetaskservice;

import java.util.List;

import com.ihl.model.basetask.BaseTask;
import com.ihl.model.user.User;

public interface BaseTaskService {
	public List<BaseTask> getNeedToBeScheduledTask();//需要安排的任务：开始时间在7天之内的任务
	public List<BaseTask> getNeedToBeScheduledTaskByUser(User user);
	public void clear();
	public BaseTask get(int id);
	public List<BaseTask> get(User user);
	public void delete(int id);
	public void delete(List<Integer> ids);
	public void update(BaseTask baseTask);
}
