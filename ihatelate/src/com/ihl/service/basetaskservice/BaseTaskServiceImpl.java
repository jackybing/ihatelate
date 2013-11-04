package com.ihl.service.basetaskservice;

import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.List;

import com.ihl.dao.basetaskdao.BaseTaskDao;
import com.ihl.dao.userdao.UserDao;
import com.ihl.model.basetask.BaseTask;
import com.ihl.model.user.User;
import com.opensymphony.xwork2.ActionContext;

public class BaseTaskServiceImpl implements BaseTaskService {
	private BaseTaskDao baseTaskDao;
	private UserDao userDao;

	public List<BaseTask> getNeedToBeScheduledTask() {
		Date date = new Date();
		Calendar rightNow = Calendar.getInstance();
		rightNow.setTime(date);
		rightNow.add(Calendar.DAY_OF_YEAR, 6);// 日期加6天
		Date date2 = rightNow.getTime();
		int id = (Integer) ActionContext.getContext().getSession().get("userID");
		User user = userDao.getUserById(id);
		return baseTaskDao.getActiveAndUncompletedTask(date2,user);
	}
	
	public List<BaseTask> getNeedToBeScheduledTaskByUser(User user) {
		Date date = new Date();
		Calendar rightNow = Calendar.getInstance();
		rightNow.setTime(date);
		rightNow.add(Calendar.DAY_OF_YEAR, 6);// 日期加6天
		Date date2 = rightNow.getTime();
		return baseTaskDao.getActiveAndUncompletedTask(date2,user);
	}
	
	public void delete(List<Integer> ids) {
		List<BaseTask> baseTasks = new ArrayList<BaseTask>();
		BaseTask baseTask = null;
		for(Integer id : ids){
			baseTask = baseTaskDao.get(id);
			if(baseTask != null){
				baseTask.setIsDeleted(true);
				baseTaskDao.update(baseTask);
			}
		}
	}

	public List<BaseTask> get(User user) {
		return baseTaskDao.get(user);
	}


	public void update(BaseTask baseTask) {
		baseTaskDao.update(baseTask);
	}
	
	public BaseTaskDao getBaseTaskDao() {
		return baseTaskDao;
	}

	public void setBaseTaskDao(BaseTaskDao baseTaskDao) {
		this.baseTaskDao = baseTaskDao;
	}

	public void clear() {
		baseTaskDao.clear();
	}

	public void delete(int id) {
		baseTaskDao.delete(id);
	}

	public BaseTask get(int id) {
		return baseTaskDao.get(id);
	}

	public UserDao getUserDao() {
		return userDao;
	}

	public void setUserDao(UserDao userDao) {
		this.userDao = userDao;
	}
}
