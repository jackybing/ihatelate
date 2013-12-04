package com.ihl.model.openclasstask;

import java.text.ParseException;

import net.sf.json.JSONObject;

import com.ihl.model.basetask.BaseTask;

public class OpenClassTask extends BaseTask{
	private String className;//课程名字
	private int amount;//课程节数
	private int timeForPerClass;//每节课时间，单位为分钟
	private String remark;//备注
	
	@Override
	public void set_Time() throws ParseException {
		int time = getTotal() / getTotalDay();
		int reminder = getTotal() % getTotalDay();
		if(reminder != 0){
			time++;
		}
		setTime(time);
	}

	@Override
	public void set_Total() {
		setTotal(timeForPerClass * amount);
	}

	@Override
	public JSONObject obtainScheduleInfo(int allocatedTime) {
		JSONObject jsonObject = new JSONObject();
		
		int startClass = 0;//从第几节课开始
		int startTime = 0;//从第几分钟开始
		int endClass = 0;//到第几节课结束
		int endTime = 0;//到第几分钟结束
		
		startClass = (getCompleted() + 1) / timeForPerClass + 1;
		startTime = getCompleted() % timeForPerClass;
		endTime = (getCompleted() + allocatedTime) % timeForPerClass;
		endClass = (getCompleted() + allocatedTime) / timeForPerClass;
		if(endTime != 0){
			endClass++;
		}else {
			endTime = timeForPerClass;
		}
		
		jsonObject.put("className", className);
		jsonObject.put("startClass", startClass);
		jsonObject.put("endClass", endClass);
		jsonObject.put("startTime", startTime);
		jsonObject.put("endTime", endTime);
		
		return jsonObject;
	}
	
	@Override
	public int getFeedbackTime(String... strs) {
		return Integer.parseInt(strs[0]);
	}
	
	public String getClassName() {
		return className;
	}

	public void setClassName(String className) {
		this.className = className;
	}

	public int getAmount() {
		return amount;
	}

	public void setAmount(int amount) {
		this.amount = amount;
	}

	public int getTimeForPerClass() {
		return timeForPerClass;
	}

	public void setTimeForPerClass(int timeForPerClass) {
		this.timeForPerClass = timeForPerClass;
	}

	public String getRemark() {
		return remark;
	}

	public void setRemark(String remark) {
		this.remark = remark;
	}
}
