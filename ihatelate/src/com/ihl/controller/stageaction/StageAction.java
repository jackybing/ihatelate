package com.ihl.controller.stageaction;

import java.util.HashMap;
import java.util.Map;

import net.sf.json.JSONObject;

import com.ihl.service.stageservice.StageService;
import com.opensymphony.xwork2.ActionSupport;

public class StageAction extends ActionSupport{
	private int type;//任务类型
	private StageService stageService;
	private String result;
	
	public String obtainDefaultStage(){
		Map<String, String> resultMap = new HashMap<String, String>();
		
		JSONObject jsonObject  = (JSONObject) stageService.getDefault(type);
		
		resultMap.put("statusCode", "200");
		if(jsonObject != null){
			resultMap.put("stages", jsonObject.getString("stages").toString());
			resultMap.put("taskID", jsonObject.getString("taskID").toString());
		}
		
		setResult(JSONObject.fromObject(resultMap).toString());
		
		return SUCCESS;
	}

	public int getType() {
		return type;
	}

	public void setType(int type) {
		this.type = type;
	}

	public String getResult() {
		return result;
	}

	public void setResult(String result) {
		this.result = result;
	}

	public StageService getStageService() {
		return stageService;
	}

	public void setStageService(StageService stageService) {
		this.stageService = stageService;
	}
}
