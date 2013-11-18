package com.ihl.controller.modifypriorityaction;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
import net.sf.json.JsonConfig;

import com.ihl.model.basetask.BaseTask;
import com.ihl.model.user.User;
import com.ihl.service.basetaskservice.BaseTaskService;
import com.ihl.service.userservice.UserService;
import com.ihl.utility.JsonDateValueProcessor;
import com.opensymphony.xwork2.ActionSupport;

public class ModifyPriorityAction extends ActionSupport{
	private String IDPriorityStr;
	private BaseTaskService baseTaskService;
	private UserService userService;
	private String result;
	
	public String obtainAll(){
		Map<String, Object> resultMap = new HashMap<String, Object>();
		User user = userService.getLoginUser();
		if(user != null){
			List<BaseTask> baseTasks = baseTaskService.getUncompletedByUser(user);
			baseTaskService.clear();
			for(BaseTask baseTask : baseTasks){
				baseTask.setUser(null);
			}
			JsonConfig jsonConfig = new JsonConfig();
			jsonConfig.registerJsonValueProcessor(java.util.Date.class, new JsonDateValueProcessor("yyyy-MM-dd HH:mm:ss"));
			
			JSONArray jsonArray = JSONArray.fromObject(baseTasks,jsonConfig);
			resultMap.put("status", "200");
			resultMap.put("info", "successfully");
			resultMap.put("lists", jsonArray);
		}else {
			resultMap.put("status", "404");
			resultMap.put("info", "user has not login");
		}
		setResult(JSONObject.fromObject(resultMap).toString());
		return SUCCESS;
	}
	
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
	public UserService getUserService() {
		return userService;
	}
	public void setUserService(UserService userService) {
		this.userService = userService;
	}
}
