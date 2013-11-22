package com.ihl.controller.basetaskaction;


import java.text.ParseException;
import java.util.Date;
import java.util.HashSet;
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

	protected String type;// 任务类型：0：读书1：写论文2：健身3：申大学

	protected String isActive;// 任务是否激活
	
	private String username;
	private String result;
	
	private String stages;//非量化任务对应的阶段
	
	private String usedDay;//任务反馈，所用的天数
	
	private String taskID;//所用模版对应的任务ID
	
	private UserService userService;
	private BaseTaskService baseTaskService;
	private StageService stageService;

	public BaseTask createBaseTask(BaseTask baseTask) throws ParseException{
		if(id != null && !id.equals("")){
			baseTask.setId(Integer.parseInt(id));
		}
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
	
//	public void updateDefaultStage(int type,BaseTask baseTask){
//		List<Stage> stages = stageService.getDefault(type);
//		int max = 0;
//		int success = 0;
//		for(Stage stage : stages){
//			if(stage.getStep() == 1){
//				max = stage.getSuccessCount();
//			}
//		}
//		for(Stage stage : baseTask.getStages()){
//			if(stage.getStep() == 1){
//				success = stage.getSuccessCount();
//			}
//		}
//		if(success > max){
//			for(Stage stage : stages){
//				stage.setIsDefault(false);
//			}
//			for(Stage stage : baseTask.getStages()){
//				stage.setIsDefault(true);
//			}
//		}
//	}
	
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

	public String getUsedDay() {
		return usedDay;
	}

	public void setUsedDay(String usedDay) {
		this.usedDay = usedDay;
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
}
