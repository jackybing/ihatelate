package com.ihl.controller.openclasstaskaction;

import java.text.ParseException;
import java.util.HashMap;
import java.util.Map;

import net.sf.json.JSONObject;

import com.ihl.controller.basetaskaction.BaseTaskAction;
import com.ihl.model.basetask.BaseTask;
import com.ihl.model.openclasstask.OpenClassTask;
import com.ihl.service.openclasstaskservice.OpenClassTaskService;

public class OpenClassTaskAction extends BaseTaskAction{
	private String className;
	private String amount;
	private String timeForPerClass;
	private String remark;
	private OpenClassTaskService openClassTaskService;
	
	//反馈参数
	private String startClass;//从第几节课开始
	private String endClass;//到第几节课结束
	private String startClassTime;//开始时间
	private String endClassTime;//结束时间

	public String create() throws ParseException{
		Map<String, String> resultMap = new HashMap<String, String>();
		
		OpenClassTask openClassTask = new OpenClassTask();
		
		createBaseTask(openClassTask);
		
		openClassTask.setClassName(className);
		openClassTask.setAmount(Integer.parseInt(amount));
		openClassTask.setTimeForPerClass(Integer.parseInt(timeForPerClass));
		openClassTask.setRemark(remark);
		
		openClassTask.set_Total();
		openClassTask.set_Time();
		
		openClassTaskService.saveOrUpdate(openClassTask);
		
		resultMap.put("statusCode", "200");
		resultMap.put("info", "task saveOrUpdate successfully !");
		
		setResult(JSONObject.fromObject(resultMap).toString());
		
		return SUCCESS;
	}
	
	public String feedback(){
		Map<String, String> resultMap = new HashMap<String, String>();
		
		BaseTask baseTask = getBaseTaskService().get(Integer.parseInt(id));
		int completedTime = baseTask.getFeedbackTime(startClass,endClass,startClassTime,endClassTime);
		baseTask.feedback(completedTime,Integer.parseInt(getUsedDay()));
		getBaseTaskService().update(baseTask);
		
		resultMap.put("statusCode", "200");
		resultMap.put("info", "feedback successfully !");
		
		setResult(JSONObject.fromObject(resultMap).toString());
		return SUCCESS;
	}
	
	public OpenClassTaskService getOpenClassTaskService() {
		return openClassTaskService;
	}

	public void setOpenClassTaskService(OpenClassTaskService openClassTaskService) {
		this.openClassTaskService = openClassTaskService;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}
	public String getAmount() {
		return amount;
	}

	public void setAmount(String amount) {
		this.amount = amount;
	}

	public String getTimeForPerClass() {
		return timeForPerClass;
	}

	public void setTimeForPerClass(String timeForPerClass) {
		this.timeForPerClass = timeForPerClass;
	}

	public String getRemark() {
		return remark;
	}

	public void setRemark(String remark) {
		this.remark = remark;
	}

	public String getClassName() {
		return className;
	}

	public void setClassName(String className) {
		this.className = className;
	}
	public String getStartClass() {
		return startClass;
	}

	public void setStartClass(String startClass) {
		this.startClass = startClass;
	}

	public String getEndClass() {
		return endClass;
	}

	public void setEndClass(String endClass) {
		this.endClass = endClass;
	}

	public String getStartClassTime() {
		return startClassTime;
	}

	public void setStartClassTime(String startClassTime) {
		this.startClassTime = startClassTime;
	}

	public String getEndClassTime() {
		return endClassTime;
	}

	public void setEndClassTime(String endClassTime) {
		this.endClassTime = endClassTime;
	}
}
