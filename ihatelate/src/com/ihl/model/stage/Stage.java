package com.ihl.model.stage;

import com.ihl.model.basetask.BaseTask;

public class Stage implements Comparable<Stage>{
	private int id;
	private int step;//标志此stage是整个模版的第几步
	private String name;//名称
	private int time;//所以时间，单位为分钟
	private BaseTask task;//所关联的任务
	private boolean isDefault = false;//标志是否是缺省模版
	private int type;//任务类型
	
	public int compareTo(Stage o) {
		return this.step - o.getStep();
	}
	
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public int getStep() {
		return step;
	}
	public void setStep(int step) {
		this.step = step;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public int getTime() {
		return time;
	}
	public void setTime(int time) {
		this.time = time;
	}
	public BaseTask getTask() {
		return task;
	}
	public void setTask(BaseTask task) {
		this.task = task;
	}

	public boolean getIsDefault() {
		return isDefault;
	}

	public void setIsDefault(boolean isDefault) {
		this.isDefault = isDefault;
	}

	public int getType() {
		return type;
	}

	public void setType(int type) {
		this.type = type;
	}
}
