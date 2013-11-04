package com.ihl.admin;

import java.text.ParseException;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import com.ihl.model.basetask.BaseTask;
import com.ihl.model.freetime.FreeTime;
import com.ihl.model.user.User;
import com.ihl.service.basetaskservice.BaseTaskService;
import com.ihl.service.freetimeservice.FreeTimeService;
import com.ihl.service.userservice.UserService;
import com.ihl.utility.DateUtil;

public class SendEmail {
	private BaseTaskService baseTaskService;
	private FreeTimeService freeTimeService;
	private UserService userService;
	
	public Map<String, List<BaseTask>> obtainEmailInfo() throws ParseException{
		
		Map<String, List<BaseTask>> emailInfos = new HashMap<String, List<BaseTask>>();
		
		List<User> users = userService.getAll();
		for(User user : users){
			List<BaseTask> baseTasks = scheduleWeekTasks(user);
			if(baseTasks.size() > 0){
				emailInfos.put(user.getEmail(), baseTasks);
			}
		}
		
		return emailInfos;
	}
	
	//安排一周的任务
	public List<BaseTask> scheduleWeekTasks(User user) throws ParseException{
		
		List<BaseTask> cannotBeCompleted = new ArrayList<BaseTask>();
		
		List<BaseTask> baseTasks = baseTaskService.getNeedToBeScheduledTaskByUser(user);
		baseTaskService.clear();
		//如果任务列表不为空，则安排任务
		if(baseTasks.size() > 0){
			Date date = new Date();
			int today = DateUtil.getWeekOfDate(date);
			// 一共安排7天的任务
			for (int i = 0; i < 7; i++) {
				int week = (today + i) % 7;
				if (week == 0) {
					week = 7;
				}
				// 获得要安排的这天的空闲时间
				List<FreeTime> freeTimes = freeTimeService.getFreeTimesForDayByUser(week, user);
				freeTimeService.clear();
				Map<String, Object> res= new HashMap<String, Object>();
				res = scheduleDayTasks(baseTasks, freeTimes, i);
				
				if(((List<BaseTask>)res.get("cannotBeCompleted")).size() > 0){
					cannotBeCompleted.addAll((List<BaseTask>)res.get("cannotBeCompleted"));
				}
				
				baseTasks = (List<BaseTask>) res.get("baseTasks");
				
				
				//若返回的任务列表为空，即任务安排完毕，则跳出循环
				if(baseTasks.size() == 0){
					break;
				}
			}
		}
		return cannotBeCompleted;
	}
	
	// 安排一天的任务
	public Map<String, Object> scheduleDayTasks(List<BaseTask> baseTasks,
			List<FreeTime> freeTimes, int i) throws ParseException {

		JSONArray dayScheduleArray = new JSONArray();
		List<BaseTask> cannotBeCompleted = new ArrayList<BaseTask>();
		
		List<BaseTask> baseTasksNew = new ArrayList<BaseTask>();

		// 对baseTasks中的每个任务进行安排
		for (BaseTask baseTask : baseTasks) {
			//如果任务没有完成，并且已分配天数=总天数，则此任务不再安排，需提醒用户
			if((!baseTask.getIsCompleted()) && (baseTask.getTotalDay() == baseTask.getUsedDay())){
				cannotBeCompleted.add(baseTask);
				continue;
			}
			//如果任务的结束时间在当前时间之前，则不安排任务，并通知用户
			if(DateUtil.daysBetween(baseTask.getEndTime(), DateUtil.addDay(new Date(), i)) > 0){
				cannotBeCompleted.add(baseTask);
				continue;
			}
			//如果任务的开始时间在当前时间或者之前，则安排任务
			if(DateUtil.daysBetween(baseTask.getStartTime(), DateUtil.addDay(new Date(), i)) >= 0){
				int needDay = baseTask.getTotalDay() - baseTask.getUsedDay();// 还需要的天数
				// 还有空闲时间
				if (freeTimes.size() != 0) {
					Map<String, Object> resultMap = new HashMap<String, Object>();
					resultMap = schedulePerTask(baseTask, freeTimes);
					BaseTask baseTaskNew = (BaseTask) resultMap.get("baseTask");
					List<FreeTime> freeTimesNew = (List<FreeTime>) resultMap.get("freeTimes");
					JSONObject taskScheduleObject = (JSONObject) resultMap.get("taskScheduleObject");
					if(!baseTaskNew.getIsCompleted()){
						baseTasksNew.add(baseTaskNew);
					}
					freeTimes = freeTimesNew;
					dayScheduleArray.add(taskScheduleObject);
				}else {
					baseTasksNew.add(baseTask);
				}
			}else {
				baseTasksNew.add(baseTask);
			}
		}
		
		Map<String, Object> resultMap = new HashMap<String, Object>();
		
		resultMap.put("baseTasks", baseTasksNew);
		resultMap.put("dayScheduleArray", dayScheduleArray);
		resultMap.put("cannotBeCompleted", cannotBeCompleted);
		
		return resultMap;
	}

	// 安排每一个任务
	public Map<String, Object> schedulePerTask(BaseTask baseTask,
			List<FreeTime> freeTimes) throws ParseException {

		JSONObject taskScheduleObject = new JSONObject();
		JSONArray taskScheduleTimeArray = new JSONArray();

		List<FreeTime> freeTimesNew = new ArrayList<FreeTime>();
		freeTimesNew.addAll(freeTimes);

		int taskTime = baseTask.getTime();

		int completed = 0;
		
		JSONObject taskScheduleTaskInfoObject = new JSONObject();
		
		if (taskTime > 0) {//考虑去掉
			for (int i = 0; i < freeTimes.size(); i++) {
				JSONObject taskScheduleTimeObject = new JSONObject();
				FreeTime freeTime = freeTimes.get(i);
				Date startTime = freeTime.getStartTime();
				Date endTime = freeTime.getEndTime();
				int freeTimeSlice = DateUtil.minutesBetween(startTime, endTime);
				if (taskTime == freeTimeSlice) {
					completed = freeTimeSlice;
					freeTimesNew.remove(0);
					
					taskScheduleTimeObject.put("startTime", startTime
							.toString());
					taskScheduleTimeObject.put("endTime", endTime.toString());
					taskScheduleTimeArray.add(taskScheduleTimeObject);
					break;
				} else if (taskTime < freeTimeSlice) {
					completed = taskTime;
					
					Date newStartTime = DateUtil.addMinute(startTime, taskTime);

					freeTime.setStartTime(newStartTime);
					freeTimesNew.remove(0);
					freeTimesNew.add(0, freeTime);

					taskScheduleTimeObject.put("startTime", startTime
							.toString());
					taskScheduleTimeObject.put("endTime", newStartTime
							.toString());
					taskScheduleTimeArray.add(taskScheduleTimeObject);
					break;
				} else {
					completed = freeTimeSlice;
					freeTimesNew.remove(0);
					
					taskScheduleTimeObject.put("startTime", startTime
							.toString());
					taskScheduleTimeObject.put("endTime", endTime
							.toString());
					taskScheduleTimeArray.add(taskScheduleTimeObject);
				}
			}
		}
		taskScheduleTaskInfoObject = baseTask.obtainScheduleInfo(completed);
		baseTask.setUsedDay(baseTask.getUsedDay() + 1);
		baseTask.setCompleted(baseTask.getCompleted() + completed);
		baseTask.updateTime();
		taskScheduleObject.put("taskID", baseTask.getId());
		taskScheduleObject.put("time", taskScheduleTimeArray);
		taskScheduleObject.put("scheduleInfo", taskScheduleTaskInfoObject);
		
		
		Map<String, Object> resultMap = new HashMap<String, Object>();
		resultMap.put("baseTask", baseTask);
		resultMap.put("freeTimes", freeTimesNew);
		resultMap.put("taskScheduleObject", taskScheduleObject);
		
		return resultMap;
	}

	public BaseTaskService getBaseTaskService() {
		return baseTaskService;
	}

	public void setBaseTaskService(BaseTaskService baseTaskService) {
		this.baseTaskService = baseTaskService;
	}

	public FreeTimeService getFreeTimeService() {
		return freeTimeService;
	}

	public void setFreeTimeService(FreeTimeService freeTimeService) {
		this.freeTimeService = freeTimeService;
	}

	public UserService getUserService() {
		return userService;
	}

	public void setUserService(UserService userService) {
		this.userService = userService;
	}
}
