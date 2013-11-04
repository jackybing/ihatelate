package com.ihl.controller.freetimeaction;

import java.util.HashMap;
import java.util.Map;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import com.ihl.service.freetimeservice.FreeTimeService;
import com.opensymphony.xwork2.ActionContext;
import com.opensymphony.xwork2.ActionSupport;

public class FreeTimeAction extends ActionSupport{
	private String freeTime;
	private FreeTimeService freeTimeService;
	private String result;
	
	public String setFreeTime(){
		Map<String, String> resultMap = new HashMap<String, String>();
		
		int userID = (Integer) ActionContext.getContext().getSession().get("userID");
		
		freeTimeService.setFreeTimes(freeTime, userID);
		
		resultMap.put("status", "200");
		resultMap.put("info", "freetime set successfully");
		
		setResult(JSONObject.fromObject(resultMap).toString());
		
		return SUCCESS;
	}
	
	public String obtainFreeTime(){
		Map<String, String> resultMap = new HashMap<String, String>();
		
		int userID = (Integer) ActionContext.getContext().getSession().get("userID");
		
		JSONArray jsonArray = freeTimeService.getFreeTimes(userID);
		
		resultMap.put("status", "200");
		resultMap.put("info", "obtain freetime successfully");
		resultMap.put("freeTime", jsonArray.toString());
		
		setResult(JSONObject.fromObject(resultMap).toString());
		return SUCCESS;
	}
	
	public String getFreeTime() {
		return freeTime;
	}

	public void setFreeTime(String freeTime) {
		this.freeTime = freeTime;
	}

	public FreeTimeService getFreeTimeService() {
		return freeTimeService;
	}
	public void setFreeTimeService(FreeTimeService freeTimeService) {
		this.freeTimeService = freeTimeService;
	}

	public String getResult() {
		return result;
	}

	public void setResult(String result) {
		this.result = result;
	}
}
