package com.ihl.dao.basetaskdao;

import java.util.Date;
import java.util.List;

import com.ihl.model.basetask.BaseTask;
import com.ihl.model.user.User;

public interface BaseTaskDao {
	public List<BaseTask> getActiveAndUncompletedTask(Date date,User user);//获得开始时间<=date的激活并且未完成的任务列表，并按优先级进行排序
	public void clear();
	public void delete(int id);
	public void delete(List<BaseTask> baseTasks);
	public BaseTask get(int id);
	public List<BaseTask> get(User user);
	public void update(BaseTask baseTask);
	public void flush();
	public BaseTask getBest(int type);
}
