package com.ihl.controller.modifypriorityaction;

import java.util.HashMap;
import java.util.Map;

import net.sf.json.JSONObject;

import com.ihl.model.basetask.BaseTask;
import com.ihl.service.basetaskservice.BaseTaskService;
import com.opensymphony.xwork2.ActionSupport;

public class ModifyPriorityAction extends ActionSupport{
	private String upperID;//上面的任务的ID，没有则为-1
	private String beMovedID;//被移动的任务的ID
	private String underID;//下面的任务ID，没有则为-1
	private BaseTaskService baseTaskService;
	private String result;
	
	public String modifyPriority(){
		Map<String, String> resultMap = new HashMap<String, String>();
		if(upperID != "" && beMovedID != "" && underID != ""){
			//上下面都有任务
			if(Integer.parseInt(upperID) != -1 && Integer.parseInt(underID) != -1){
				BaseTask upper = baseTaskService.get(Integer.parseInt(upperID));
				BaseTask beMoved = baseTaskService.get(Integer.parseInt(beMovedID));
				BaseTask under = baseTaskService.get(Integer.parseInt(underID));
				if(upper != null && beMoved != null && under != null){
					//上下面的一级优先级不同，设置任务优先级为下面的任务的优先级，并设置二级优先级比下面的少1
					if(upper.getPriority() != under.getPriority()){
						beMoved.setPriority(under.getPriority());
						beMoved.setSecondaryPriority(under.getSecondaryPriority() - 1);
					}else if(upper.getSecondaryPriority() != under.getSecondaryPriority()){
						//一级优先级相同，二级优先级不同，设置任务优先级为下面的任务的优先级，并设置二级优先级为
						//当前二级优先级-上下任务二级优先级的差值
						beMoved.setPriority(under.getPriority());
						beMoved.setSecondaryPriority(under.getSecondaryPriority()
								-(under.getSecondaryPriority() - upper.getSecondaryPriority())/2);
					}else {
						//一级优先级相同，二级优先级相同，设置任务二级优先级为下面的任务的二级优先级，并且设置三级优先级为
						//当前三级优先级-上下任务三级优先级的差值
						beMoved.setPriority(under.getPriority());
						beMoved.setThreeStagePriority(under.getThreeStagePriority()
								-(under.getThreeStagePriority() - upper.getThreeStagePriority())/2);
					}
				}else {
					resultMap.put("status", "404");
					resultMap.put("info", "task is not exist");
				}
				baseTaskService.update(beMoved);
				resultMap.put("status", "200");
				resultMap.put("info", "successfully");
			}else if(Integer.parseInt(upperID) == -1){
				//上边没有任务
				BaseTask beMoved = baseTaskService.get(Integer.parseInt(beMovedID));
				BaseTask under = baseTaskService.get(Integer.parseInt(underID));
				beMoved.setPriority(under.getPriority());
				beMoved.setSecondaryPriority(under.getSecondaryPriority() - 1);
				baseTaskService.update(beMoved);
				resultMap.put("status", "200");
				resultMap.put("info", "successfully");
			}else {
				//下边没有任务
				BaseTask beMoved = baseTaskService.get(Integer.parseInt(beMovedID));
				BaseTask upper = baseTaskService.get(Integer.parseInt(upperID));
				beMoved.setPriority(upper.getPriority());
				beMoved.setSecondaryPriority(upper.getSecondaryPriority() + 1);
				baseTaskService.update(beMoved);
				resultMap.put("status", "200");
				resultMap.put("info", "successfully");
			}
		}else {
			resultMap.put("status", "404");
			resultMap.put("info", "invalid param");
		}
		setResult(JSONObject.fromObject(resultMap).toString());
		return SUCCESS;
	}
	public String getUpperID() {
		return upperID;
	}
	public void setUpperID(String upperID) {
		this.upperID = upperID;
	}
	public String getBeMovedID() {
		return beMovedID;
	}
	public void setBeMovedID(String beMovedID) {
		this.beMovedID = beMovedID;
	}
	public String getUnderID() {
		return underID;
	}
	public void setUnderID(String underID) {
		this.underID = underID;
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
}
