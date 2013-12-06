package com.ihl.controller.writepapertaskaction;

import java.text.ParseException;
import java.util.HashMap;
import java.util.Map;

import net.sf.json.JSONObject;

import com.ihl.controller.basetaskaction.BaseTaskAction;
import com.ihl.model.basetask.BaseTask;
import com.ihl.model.writepapertask.WritePaperTask;
import com.ihl.service.writepapertaskservice.WritePaperTaskService;

public class WritePaperTaskAction extends BaseTaskAction{
	private String paperName;
	private WritePaperTaskService writePaperTaskService;
	
	public String create() throws ParseException{
		Map<String, String> resultMap = new HashMap<String, String>();
		
		WritePaperTask writePaperTask = new WritePaperTask();
		
		createBaseTask(writePaperTask);
		
		writePaperTask.setPaperName(paperName);
		
		writePaperTask.set_Total();
		writePaperTask.set_Time();
		
		if(getTaskID() != null){
			int taskID = Integer.parseInt(getTaskID());
			if(taskID >= 0){
				BaseTask baseTask = getBaseTaskService().get(taskID);
				if(baseTask != null){
					baseTask.setCount(baseTask.getCount() + 1);
					getBaseTaskService().update(baseTask);
				}
			}else{
				writePaperTask.setCount(1);
			}
		}
		
		writePaperTaskService.saveOrUpdate(writePaperTask);
		
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
		
		WritePaperTask writePaperTask = writePaperTaskService.get(Integer.parseInt(getId()));
		updateBaseTask(writePaperTask);
		
		writePaperTask.setPaperName(paperName);
		
		writePaperTask.set_Total();
		writePaperTask.updateTime();
		
		getBaseTaskService().update(writePaperTask);
		
		resultMap.put("statusCode", "200");
		resultMap.put("info", "update successfully");
		
		setResult(JSONObject.fromObject(resultMap).toString());
		
		return SUCCESS;
	}
	
	public String getPaperName() {
		return paperName;
	}

	public void setPaperName(String paperName) {
		this.paperName = paperName;
	}

	public WritePaperTaskService getWritePaperTaskService() {
		return writePaperTaskService;
	}

	public void setWritePaperTaskService(WritePaperTaskService writePaperTaskService) {
		this.writePaperTaskService = writePaperTaskService;
	}
}
