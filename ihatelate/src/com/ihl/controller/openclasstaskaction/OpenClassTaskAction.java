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
	private String classTime;//完成时间

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
	
	public String update() throws ParseException{
		Map<String, String> resultMap = new HashMap<String, String>();
		
		if("".equals(getId())){
			resultMap.put("statusCode", "500");
			resultMap.put("info", "task ID is null");
			return SUCCESS;
		}
		
		OpenClassTask openClassTask = openClassTaskService.get(Integer.parseInt(getId()));
		updateBaseTask(openClassTask);
		
		openClassTask.setClassName(className);
		openClassTask.setAmount(Integer.parseInt(amount));
		openClassTask.setTimeForPerClass(Integer.parseInt(timeForPerClass));
		openClassTask.setRemark(remark);
		
		openClassTask.set_Total();
		openClassTask.updateTime();
		
		getBaseTaskService().update(openClassTask);
		
		resultMap.put("statusCode", "200");
		resultMap.put("info", "update successfully");
		
		setResult(JSONObject.fromObject(resultMap).toString());
		return SUCCESS;
	}
	
	public String feedback(){
		Map<String, String> resultMap = new HashMap<String, String>();
		
		BaseTask baseTask = getBaseTaskService().get(Integer.parseInt(id));
		int completedTime = baseTask.getFeedbackTime(classTime);
		baseTask.feedback(completedTime);
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

	public String getClassTime() {
		return classTime;
	}

	public void setClassTime(String classTime) {
		this.classTime = classTime;
	}
}
