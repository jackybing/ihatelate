package com.ihl.controller.taskaction;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
import net.sf.json.JsonConfig;

import com.ihl.model.basetask.BaseTask;
import com.ihl.model.stage.Stage;
import com.ihl.model.user.User;
import com.ihl.service.basetaskservice.BaseTaskService;
import com.ihl.service.userservice.UserService;
import com.ihl.utility.JsonDateValueProcessor;
import com.opensymphony.xwork2.ActionSupport;

public class TaskAction extends ActionSupport{
	private String id;//前台传递的单个任务ID
	private String ids;//前台传递的任务多个ID
	private BaseTaskService baseTaskService;
	private UserService userService;
	private String result;
	
	//根据任务ID获得任务信息
	public String obtainTaskByTaskID(){
		Map<String, Object> resultMap = new HashMap<String, Object>();
		BaseTask task = baseTaskService.get(Integer.parseInt(id));
		task.setUser(null);
//		task.setStages(null);
		
		Set<Stage> stages = task.getStages();
		for(Stage stage : stages){
			stage.setTask(null);
		}
		
		task.setStages(stages);
		
		JsonConfig jsonConfig = new JsonConfig();
		jsonConfig.registerJsonValueProcessor(java.util.Date.class, new JsonDateValueProcessor("yyyy-MM-dd HH:mm:ss"));
		
		resultMap.put("statusCode", "200");
		resultMap.put("taskInfo",task);
		
		setResult(JSONObject.fromObject(resultMap,jsonConfig).toString());
		// Start: 201401232351 Pandaroid 恢复对PO的改变 消除对数据库的影响
		task.setUser(userService.getLoginUser());
		stages = task.getStages();
		for(Stage stage : stages){
			stage.setTask(task);
		}
		task.setStages(stages);
		// End  : 201401232351 Pandaroid 恢复对PO的改变 消除对数据库的影响
		return SUCCESS;
	}
	//获得登录用户的所有任务信息
	public String obtainAllTask(){
		Map<String, Object> resultMap = new HashMap<String, Object>();
		
		User user = userService.getLoginUser();
		List<BaseTask> baseTasks = null;
		if(user != null){
			baseTasks = baseTaskService.get(user);
			baseTaskService.clear();
			for(BaseTask baseTask : baseTasks){
				baseTask.setUser(null);
				baseTask.setStages(null);
			}
		}
		
		JsonConfig jsonConfig = new JsonConfig();
		jsonConfig.registerJsonValueProcessor(java.util.Date.class, new JsonDateValueProcessor("yyyy-MM-dd HH:mm:ss"));
		
		JSONArray jsonArray = JSONArray.fromObject(baseTasks,jsonConfig);
		
		resultMap.put("statusCode", "200");
		resultMap.put("task",jsonArray);
		
		setResult(JSONObject.fromObject(resultMap).toString());
		
		return SUCCESS;
	}
	//根据任务ID删除任务，id:["1","2","3"]
	public String deleteTaskByID(){
		Map<String, Object> resultMap = new HashMap<String, Object>();
		
		JSONArray jsonArray = JSONArray.fromObject(ids);
		List<Integer> ids = new ArrayList<Integer>();
		for(int i = 0;i < jsonArray.size();i++){
			ids.add(Integer.parseInt(jsonArray.get(i).toString()));
		}
		
		baseTaskService.delete(ids);
		
		resultMap.put("statusCode", "200");
		resultMap.put("info","delete successfully");
		
		setResult(JSONObject.fromObject(resultMap).toString());
		return SUCCESS;
	}
	
	public String getIds() {
		return ids;
	}
	public void setIds(String ids) {
		this.ids = ids;
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

	public UserService getUserService() {
		return userService;
	}

	public void setUserService(UserService userService) {
		this.userService = userService;
	}
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
}