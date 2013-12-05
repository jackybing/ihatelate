package com.ihl.controller.basetaskaction;


import java.text.ParseException;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Date;
import java.util.HashMap;
import java.util.HashSet;
import java.util.Map;
import java.util.Set;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import com.ihl.model.basetask.BaseTask;
import com.ihl.model.stage.Stage;
import com.ihl.model.user.User;
import com.ihl.service.basetaskservice.BaseTaskService;
import com.ihl.service.stageservice.StageService;
import com.ihl.service.userservice.UserService;
import com.ihl.utility.DateUtil;
import com.opensymphony.xwork2.ActionSupport;
/**
 * 创建任务基类
 * @author lenovo
 *
 */
public class BaseTaskAction extends ActionSupport{
	protected String id;//任务id
	protected String name;// 任务名称
	protected String startTime;// 开始时间
	protected String endTime;// 结束时间
	protected String totalDay;// 计划花费的天数

	protected String type;//

	protected String isActive;// 任务是否激活
	
	private String username;
	private String result;
	
	private String stages;//非量化任务对应的阶段
	
	private String taskID;//所用模版对应的任务ID
	
	//非量化任务反馈参数（还有任务id）
	private String stageTime;//某一阶段的完成时间
	
	private UserService userService;
	private BaseTaskService baseTaskService;
	private StageService stageService;

	public BaseTask createBaseTask(BaseTask baseTask) throws ParseException{
		baseTask.setName(name);
		baseTask.setStartTime(DateUtil.stringToDate(startTime));
		baseTask.setEndTime(DateUtil.stringToDate(endTime));
		baseTask.setTotalDay(Integer.parseInt(totalDay));
		baseTask.setType(Integer.parseInt(type));
		baseTask.setIsActive(isActive.equals("1")?true:false);
		baseTask.setCreateTime(new Date());
		
		if(stages != null){
			JSONArray jsonArray = JSONArray.fromObject(stages);
			Set<Stage> stageSet = (Set<Stage>) new HashSet();
			for(int i = 0;i < jsonArray.size();i++){
				Stage stage = (Stage) JSONObject.toBean(jsonArray.getJSONObject(i),Stage.class);
				stage.setTask(baseTask);
				stage.setType(baseTask.getType());
				stageSet.add(stage);
			}
			baseTask.setStages(stageSet);
		}
		
		User user = userService.getLoginUser();
		baseTask.setUser(user);
		
		return baseTask;
	}
	
	public BaseTask updateBaseTask(BaseTask baseTask) throws ParseException{
		if(baseTask == null){
			return null;
		}
		baseTask.setName(name);
		baseTask.setStartTime(DateUtil.stringToDate(startTime));
		baseTask.setEndTime(DateUtil.stringToDate(endTime));
		baseTask.setTotalDay(Integer.parseInt(totalDay));
		baseTask.setIsActive(isActive.equals("1")?true:false);
		
		if(stages != null){
			stageService.deleteByID(Integer.parseInt(id));
			JSONArray jsonArray = JSONArray.fromObject(stages);
			Set<Stage> stageSet = (Set<Stage>) new HashSet();
			for(int i = 0;i < jsonArray.size();i++){
				Stage stage = (Stage) JSONObject.toBean(jsonArray.getJSONObject(i),Stage.class);
				stage.setTask(baseTask);
				stage.setType(baseTask.getType());
				stageSet.add(stage);
			}
			baseTask.setStages(stageSet);
		}
		return baseTask;
	}
	
	/*
	 * 非量化阶段的反馈
	 */
	public String feedback(){
		Map<String, String> resultMap = new HashMap<String, String>();
		
		BaseTask baseTask = baseTaskService.get(Integer.parseInt(id));
		int completed = baseTask.getCompleted();
		Set<Stage> stages = baseTask.getStages();
		ArrayList<Stage> stagesList = new ArrayList<Stage>(stages);
		Collections.sort(stagesList);
		int time = 0;
		Stage nowStage = null;
		for(Stage stage : stagesList){
			time += stage.getTime();
			if(time > completed){
				nowStage = stage;
				break;
			}
		}
		int nowStageUncompleteTime = time - completed;
		if(Integer.parseInt(stageTime) <= nowStageUncompleteTime){
			baseTask.setCompleted(completed + Integer.parseInt(stageTime));
		}else {
			stages.remove(nowStage);
			nowStage.setTime(nowStage.getTime() - nowStageUncompleteTime +Integer.parseInt(stageTime));
			stages.add(nowStage);
			baseTask.setStages(stages);
			baseTask.setCompleted(completed + Integer.parseInt(stageTime));
			baseTask.setTotal(baseTask.getTotal() + Integer.parseInt(stageTime) - nowStageUncompleteTime);
		}
		int usedDay = Integer.parseInt(stageTime) / baseTask.getTime();
		baseTask.setUsedDay(baseTask.getUsedDay() + usedDay);
		if(baseTask.getCompleted() >= baseTask.getTotal()){
			baseTask.setIsCompleted(true);
		}
		baseTask.updateTime();
		baseTaskService.update(baseTask);
		
		resultMap.put("statusCode", "200");
		resultMap.put("info", "feedback successfully !");
		
		setResult(JSONObject.fromObject(resultMap).toString());
		
		return SUCCESS;
	}
	/*
	 * 任务反馈时根据任务id获得此任务各阶段的完成情况
	 */
	public String obtainStagesInfo(){
		Map<String, Object> resultMap = new HashMap<String, Object>();
		
		BaseTask baseTask = baseTaskService.get(Integer.parseInt(id));
		if(baseTask == null){
			resultMap.put("statusCode", "500");
			resultMap.put("info", "task not exists!");
			setResult(JSONObject.fromObject(resultMap).toString());
			return SUCCESS;
		}
		
		Set<Stage> stages = baseTask.getStages();
		ArrayList<Stage> stagesList = new ArrayList<Stage>(stages);
		Collections.sort(stagesList);
		
		int completed = baseTask.getCompleted();
		int time = 0;
		JSONObject jsonObject = new JSONObject();
		for(Stage stage : stagesList){
			time += stage.getTime();
			if(time <= completed){
				jsonObject.put(stage.getStep(), stage.getTime() + ":" + stage.getTime());
			}else if(time - stage.getTime() > completed){
				jsonObject.put(stage.getStep(), stage.getTime() + ":0");
			}else {
				jsonObject.put(stage.getStep(), stage.getTime() + ":" + (completed - time + stage.getTime()));
			}
		}
		resultMap.put("statusCode", "200");
		resultMap.put("stages", jsonObject);
		setResult(JSONObject.fromObject(resultMap).toString());
		return SUCCESS;
	}
	
	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getStartTime() {
		return startTime;
	}

	public void setStartTime(String startTime) {
		this.startTime = startTime;
	}

	public String getEndTime() {
		return endTime;
	}

	public void setEndTime(String endTime) {
		this.endTime = endTime;
	}

	public String getTotalDay() {
		return totalDay;
	}

	public void setTotalDay(String totalDay) {
		this.totalDay = totalDay;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}
	public String getIsActive() {
		return isActive;
	}

	public void setIsActive(String isActive) {
		this.isActive = isActive;
	}
	public String getResult() {
		return result;
	}
	public void setResult(String result) {
		this.result = result;
	}
	public String getUsername() {
		return username;
	}
	public void setUsername(String username) {
		this.username = username;
	}
	public UserService getUserService() {
		return userService;
	}
	public void setUserService(UserService userService) {
		this.userService = userService;
	}
	public String getStages() {
		return stages;
	}
	public void setStages(String stages) {
		this.stages = stages;
	}
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public BaseTaskService getBaseTaskService() {
		return baseTaskService;
	}
	public void setBaseTaskService(BaseTaskService baseTaskService) {
		this.baseTaskService = baseTaskService;
	}

	public StageService getStageService() {
		return stageService;
	}

	public void setStageService(StageService stageService) {
		this.stageService = stageService;
	}

	public String getTaskID() {
		return taskID;
	}
	public void setTaskID(String taskID) {
		this.taskID = taskID;
	}

	public String getStageTime() {
		return stageTime;
	}

	public void setStageTime(String stageTime) {
		this.stageTime = stageTime;
	}
}
