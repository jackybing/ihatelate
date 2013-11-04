package com.ihl.model.exercisetask;

import java.text.ParseException;

import net.sf.json.JSONObject;

import com.ihl.model.basetask.BaseTask;

public class ExerciseTask extends BaseTask{
	private String exerciseName;//健身项目名称
	private int groupCount;//组数
	private int timePerGroup;//每组持续时间
	private int dayLast;//持续天数
	@Override
	public JSONObject obtainScheduleInfo(int allocatedTime) {
		JSONObject jsonObject = new JSONObject();
		
		int group2 = allocatedTime / timePerGroup;
		int reminder = allocatedTime % timePerGroup;
		if(reminder != 0){
			group2++;
		}
		
		jsonObject.put("exerciseName", exerciseName);
		jsonObject.put("group", group2);
		
		return jsonObject;
	}

	@Override
	public void set_Time() throws ParseException {
		setTime(groupCount * timePerGroup);
	}

	@Override
	public void set_Total() {
		setTotal(groupCount * timePerGroup * dayLast);
	}
	
	//参数为已完成的组数
	@Override
	public int getFeedbackTime(String... strs) {
		return Integer.parseInt(strs[0]) * timePerGroup;
	}
	
	public String getExerciseName() {
		return exerciseName;
	}

	public void setExerciseName(String exerciseName) {
		this.exerciseName = exerciseName;
	}
	public int getGroupCount() {
		return groupCount;
	}

	public void setGroupCount(int groupCount) {
		this.groupCount = groupCount;
	}

	public int getTimePerGroup() {
		return timePerGroup;
	}

	public void setTimePerGroup(int timePerGroup) {
		this.timePerGroup = timePerGroup;
	}

	public int getDayLast() {
		return dayLast;
	}

	public void setDayLast(int dayLast) {
		this.dayLast = dayLast;
	}
}
