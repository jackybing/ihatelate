package com.ihl.model.basetask;

import java.text.ParseException;
import java.util.Date;
import java.util.Set;

import net.sf.json.JSONObject;

import com.ihl.model.stage.Stage;
import com.ihl.model.user.User;
import com.ihl.utility.ConfigUtil;

/**
 * 任务基类
 * 
 * @author lenovo
 * 
 */
public abstract class BaseTask {
	private int id;
	private String name;// 任务名称
	private Date startTime;// 开始时间
	private Date endTime;// 结束时间
	private int totalDay;// 计划花费的天数
	private int usedDay = 0;// 已花费天数
	private int total;// 任务总量，单位为分钟,根据具体参数算出
	private int completed = 0;// 已完成任务量，单位为分钟
	private int time;// 每天需花费的时间，单位为分钟，根据具体参数算出

	private int type;// 任务类型：
					//10：读书         11：上公开课     13：健身
					//20：写论文     21：申大学
	private int priority;// 优先级：0：高1：中2：低
	private Date createTime;// 任务创建时间

	private boolean isActive = true;// 任务是否激活
	private boolean isCompleted = false;//任务是否已完成
	
	private User user;
	private Set<Stage> stages;//非量化任务对应的阶段
	private int count = 0;//模版使用次数
	private boolean isDeleted = false;//标志位，是否删除

	public abstract void set_Total();// 根据参数算出任务总量，子类需实现

	public abstract void set_Time() throws ParseException;// 根据参数算出每天需花费时间，子类需实现
	
	public abstract JSONObject obtainScheduleInfo(int allocatedTime);//获得任务安排之后前台显示的具体信息，比如读哪本书、从第几页到第几页
	
	public abstract int getFeedbackTime(String...strs);//用户提交任务反馈时调用，根据用户提交的参数计算此次完成的时间，子类需实现
	
	//每安排一次任务之后调用此方法更新之后的每天需要的时间
	public void updateTime(){
		if(completed >= total){
			setIsCompleted(true);
			setTime(0);
		}else{
			if(totalDay == usedDay){
				setTime(0);
			}else {
				int time = (total - completed)/(totalDay - usedDay);
				int reminder = (total - completed)%(totalDay - usedDay);
				if(reminder != 0){
					time ++;
				}
				setTime(time);
			}
		}
	}
	//time为反馈的任务完成时间
	public void feedback(int time,int usedDay){
		setCompleted(getCompleted() + time);
		setUsedDay(getUsedDay() + usedDay);
		updateTime();
		if(getCompleted() == getTotal()){
			setIsCompleted(true);
		}
	}
	
	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public Date getStartTime() {
		return startTime;
	}

	public void setStartTime(Date startTime) {
		this.startTime = startTime;
	}

	public Date getEndTime() {
		return endTime;
	}

	public void setEndTime(Date endTime) {
		this.endTime = endTime;
	}

	public int getTotalDay() {
		return totalDay;
	}

	public void setTotalDay(int totalDay) {
		this.totalDay = totalDay;
	}

	public int getTotal() {
		return total;
	}

	public void setTotal(int total) {
		this.total = total;
	}

	public int getCompleted() {
		return completed;
	}

	public void setCompleted(int completed) {
		this.completed = completed;
	}

	public int getType() {
		return type;
	}

	public void setType(int type) {
		this.type = type;
	}

	public boolean getIsActive() {
		return isActive;
	}

	public void setIsActive(boolean isActive) {
		this.isActive = isActive;
	}

	public int getUsedDay() {
		return usedDay;
	}

	public void setUsedDay(int usedDay) {
		this.usedDay = usedDay;
	}

	public int getTime() {
		return time;
	}

	public void setTime(int time) {
		this.time = time;
	}

	public int getPriority() {
		return priority;
	}

	public void setPriority(int priority) {
		this.priority = priority;
	}

	public Date getCreateTime() {
		return createTime;
	}

	public void setCreateTime(Date createTime) {
		this.createTime = createTime;
	}
	public boolean getIsCompleted() {
		return isCompleted;
	}
	public void setIsCompleted(boolean isCompleted) {
		this.isCompleted = isCompleted;
	}
	public User getUser() {
		return user;
	}
	public void setUser(User user) {
		this.user = user;
	}
	public Set<Stage> getStages() {
		return stages;
	}

	public void setStages(Set<Stage> stages) {
		this.stages = stages;
	}

	public boolean getIsDeleted() {
		return isDeleted;
	}

	public void setIsDeleted(boolean isDeleted) {
		this.isDeleted = isDeleted;
	}
	public int getCount() {
		return count;
	}
	public void setCount(int count) {
		this.count = count;
	}
}
