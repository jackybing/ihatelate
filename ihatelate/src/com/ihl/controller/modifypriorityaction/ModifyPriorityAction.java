package com.ihl.controller.modifypriorityaction;

import java.util.HashMap;
import java.util.Map;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import com.ihl.model.basetask.BaseTask;
import com.ihl.service.basetaskservice.BaseTaskService;
import com.opensymphony.xwork2.ActionSupport;

public class ModifyPriorityAction extends ActionSupport{
	private String IDPriorityStr;
	private BaseTaskService baseTaskService;
	private String result;
	
	public String modifyPriority(){
		Map<String, String> resultMap = new HashMap<String, String>();
		if(IDPriorityStr != ""){
			JSONArray jsonArray = JSONArray.fromObject(IDPriorityStr);
			for(int i = 0;i < jsonArray.size();i++){
				IDPriority idPriority = (IDPriority) JSONObject.toBean(jsonArray.getJSONObject(i), IDPriority.class);
				BaseTask baseTask = baseTaskService.get(idPriority.ID);
				if(baseTask != null){
					baseTask.setPriority(idPriority.priority);
				}
			}
			resultMap.put("status", "200");
			resultMap.put("info", "successfully");
		}else {
			resultMap.put("status", "404");
			resultMap.put("info", "invalid param");
		}
		setResult(JSONObject.fromObject(resultMap).toString());
		return SUCCESS;
	}
	public BaseTaskService getBaseTaskService() {
		return baseTaskService;
	}
	public void setBaseTaskService(BaseTaskService baseTaskService) {
		this.baseTaskService = baseTaskService;
	}
	public String getResult() {
		return result;
	}
	public void setResult(String result) {
		this.result = result;
	}
	public String getIDPriorityStr() {
		return IDPriorityStr;
	}
	public void setIDPriorityStr(String iDPriorityStr) {
		IDPriorityStr = iDPriorityStr;
	}
}
