package com.ihl.controller.applyuniversitytaskaction;

import java.text.ParseException;
import java.util.HashMap;
import java.util.Map;

import net.sf.json.JSONObject;

import com.ihl.controller.basetaskaction.BaseTaskAction;
import com.ihl.model.applyuniversitytask.ApplyUniversityTask;
import com.ihl.model.basetask.BaseTask;
import com.ihl.service.applyuniversitytaskservice.ApplyUniversityTaskService;

public class ApplyUniversityTaskAction extends BaseTaskAction{
	private String universityName;
	private String deadline;
	private String material;
	private ApplyUniversityTaskService applyUniversityTaskService;
	
	public String create() throws ParseException{
		Map<String, String> resultMap = new HashMap<String, String>();
		ApplyUniversityTask applyUniversityTask = new ApplyUniversityTask();
		
		createBaseTask(applyUniversityTask);
		
		applyUniversityTask.setUniversityName(universityName);
		applyUniversityTask.setDeadline(deadline);
		applyUniversityTask.setMaterial(material);
		
		applyUniversityTask.set_Total();
		applyUniversityTask.set_Time();
		
		if(getTaskID() != null){
			int taskID = Integer.parseInt(getTaskID());
			if(taskID >= 0){
				BaseTask baseTask = getBaseTaskService().get(taskID);
				if(baseTask != null){
					baseTask.setCount(baseTask.getCount() + 1);
					getBaseTaskService().update(baseTask);
				}
			}else{
				applyUniversityTask.setCount(1);
			}
		}
		
		applyUniversityTaskService.saveOrUpdate(applyUniversityTask);
		
		resultMap.put("statusCode", "200");
		resultMap.put("info", "task saveOrUpdate successfully !");
		
		setResult(JSONObject.fromObject(resultMap).toString());
		
		
		return SUCCESS;
	}
	
	public String update() throws ParseException{
		Map<String, String> resultMap = new HashMap<String, String>();
		if(getId().equals("")){
			resultMap.put("statusCode", "500");
			resultMap.put("info", "task ID is null");
			return SUCCESS;
		}
		
		return SUCCESS;
	}
	
	public String getUniversityName() {
		return universityName;
	}
	public void setUniversityName(String universityName) {
		this.universityName = universityName;
	}
	public String getDeadline() {
		return deadline;
	}

	public void setDeadline(String deadline) {
		this.deadline = deadline;
	}

	public String getMaterial() {
		return material;
	}
	public void setMaterial(String material) {
		this.material = material;
	}
	public ApplyUniversityTaskService getApplyUniversityTaskService() {
		return applyUniversityTaskService;
	}
	public void setApplyUniversityTaskService(
			ApplyUniversityTaskService applyUniversityTaskService) {
		this.applyUniversityTaskService = applyUniversityTaskService;
	}
}
