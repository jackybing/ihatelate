package com.ihl.controller.exercisetaskaction;

import java.text.ParseException;
import java.util.HashMap;
import java.util.Map;

import net.sf.json.JSONObject;

import com.ihl.controller.basetaskaction.BaseTaskAction;
import com.ihl.model.basetask.BaseTask;
import com.ihl.model.exercisetask.ExerciseTask;
import com.ihl.service.exercisetaskservice.ExerciseTaskService;

public class ExerciseTaskAction extends BaseTaskAction{
	private String exerciseName;
	private String groupCount;
	private String timePerGroup;
	private ExerciseTaskService exerciseTaskService;
	private String completedGroupCount;//已完成组数，前台传递的任务反馈的信息
	
	public String create() throws ParseException{
		Map<String, String> resultMap = new HashMap<String, String>();
		
		ExerciseTask exerciseTask = new ExerciseTask();
		
		createBaseTask(exerciseTask);
		
		exerciseTask.setExerciseName(exerciseName);
		exerciseTask.setGroupCount(Integer.parseInt(groupCount));
		exerciseTask.setTimePerGroup(Integer.parseInt(timePerGroup));
		exerciseTask.setDayLast(Integer.parseInt(getTotalDay()));
		
		exerciseTask.set_Total();
		exerciseTask.set_Time();
		
		exerciseTaskService.saveOrUpdate(exerciseTask);
		
		resultMap.put("statusCode", "200");
		resultMap.put("info", "task saveOrUpdate successfully !");
		
		setResult(JSONObject.fromObject(resultMap).toString());
		
		return SUCCESS;
	}
	
	public String feedback(){
		Map<String, String> resultMap = new HashMap<String, String>();
		
		BaseTask baseTask = getBaseTaskService().get(Integer.parseInt(id));
		int completedTime = baseTask.getFeedbackTime(completedGroupCount);
		baseTask.feedback(completedTime,Integer.parseInt(getUsedDay()));
		getBaseTaskService().update(baseTask);
		
		resultMap.put("statusCode", "200");
		resultMap.put("info", "feedback successfully !");
		
		setResult(JSONObject.fromObject(resultMap).toString());
		return SUCCESS;
	}
	
	public String getExerciseName() {
		return exerciseName;
	}
	public void setExerciseName(String exerciseName) {
		this.exerciseName = exerciseName;
	}
	public String getGroupCount() {
		return groupCount;
	}
	public void setGroupCount(String groupCount) {
		this.groupCount = groupCount;
	}
	public String getTimePerGroup() {
		return timePerGroup;
	}
	public void setTimePerGroup(String timePerGroup) {
		this.timePerGroup = timePerGroup;
	}
	public ExerciseTaskService getExerciseTaskService() {
		return exerciseTaskService;
	}
	public void setExerciseTaskService(ExerciseTaskService exerciseTaskService) {
		this.exerciseTaskService = exerciseTaskService;
	}
	public String getCompletedGroupCount() {
		return completedGroupCount;
	}
	public void setCompletedGroupCount(String completedGroupCount) {
		this.completedGroupCount = completedGroupCount;
	}
}
