package com.ihl.model.writepapertask;

import java.text.ParseException;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Set;

import net.sf.json.JSONObject;

import com.ihl.model.basetask.BaseTask;
import com.ihl.model.stage.Stage;

public class WritePaperTask extends BaseTask{
	private String paperName;

	@Override
	public void set_Time() throws ParseException {
		int reminder = getTotal() % getTotalDay();
		int time = getTotal()/getTotalDay();
		if(reminder != 0){
			time++;
		}
		setTime(time);
	}

	@Override
	public void set_Total() {
		int total = 0;
		for(Stage stage : this.getStages()){
			total = total + stage.getTime();
		}
		setTotal(total);
	}

	@Override
	public JSONObject obtainScheduleInfo(int allocatedTime) {
		JSONObject jsonObject = new JSONObject();
		
		String startStage = null;//从哪个stage开始
		String endStage = null;//到哪个stage结束
		int startStep = 0;//startStage是第几步
		int endStep = 0;//endStage是第几步
		int startTime = 0;//从第几分钟开始
		int endTime = 0;//到第几分钟结束
		
		int stageTime = 0;
		ArrayList<Stage> stages = new ArrayList<Stage>(getStages());
		Collections.sort(stages);
		
		for(Stage stage : stages){
			stageTime += stage.getTime();
			if(getCompleted() < stageTime){
				startStage = stage.getName();
				startStep = stage.getStep();
				startTime = getCompleted() - (stageTime - stage.getTime());
				break;
			}
		}
		stageTime = 0;
		for(Stage stage : stages){
			stageTime += stage.getTime();
			if((getCompleted() + allocatedTime) <= stageTime){
				endStage = stage.getName();
				endStep = stage.getStep();
				endTime = getCompleted()+ allocatedTime - (stageTime - stage.getTime());
				break;
			}
		}
		
		jsonObject.put("paperName", paperName);
		jsonObject.put("startStage", startStage);
		jsonObject.put("endStage", endStage);
		jsonObject.put("startStep", startStep);
		jsonObject.put("endStep", endStep);
		jsonObject.put("startTime", startTime);
		jsonObject.put("endTime", endTime);
		
		return jsonObject;
	}
	

	@Override
	public int getFeedbackTime(String... strs) {
		int startStage = Integer.parseInt(strs[0]);
		int endStage = Integer.parseInt(strs[1]);
		int startStageTime = Integer.parseInt(strs[2]);
		int endStageTime = Integer.parseInt(strs[3]);
		
		if(startStage == endStage){
			return endStageTime - startStageTime + 1;
		}else {
			Set<Stage> stages = getStages();
			int time = 0;
			for(Stage stage : stages){
				if(stage.getStep() == startStage){
					time = time + stage.getTime() - startStageTime;
				}else if (stage.getStep() == endStage) {
					time = time + endStageTime;
				}else if (stage.getStep() > startStage && stage.getStep() < endStage) {
					time = time + stage.getTime();
				}
			}
			return time;
		}
	}
	
	public String getPaperName() {
		return paperName;
	}

	public void setPaperName(String paperName) {
		this.paperName = paperName;
	}
}
