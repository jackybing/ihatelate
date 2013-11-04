package com.ihl.service.freetimeservice;

import java.util.List;

import net.sf.ezmorph.object.DateMorpher;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
import net.sf.json.util.JSONUtils;

import com.ihl.dao.freetimedao.FreeTimeDao;
import com.ihl.model.freetime.FreeTime;
import com.ihl.model.user.User;
import com.opensymphony.xwork2.ActionContext;

public class FreeTimeServiceImpl implements FreeTimeService{
	private FreeTimeDao freeTimeDao;
	
	public JSONArray getFreeTimes(final int userID){
		List<FreeTime> freeTimes=freeTimeDao.getFreeTimes(userID);

		JSONArray freeTimeArray = new JSONArray();
		JSONObject jsonObject=null;
		
		JSONObject mon=new JSONObject();
		JSONArray  monFreeTime=new JSONArray();
		
		JSONObject tue=new JSONObject();
		JSONArray  tueFreeTime=new JSONArray();
		
		JSONObject wed=new JSONObject();
		JSONArray  wedFreeTime=new JSONArray();
		
		JSONObject thu=new JSONObject();
		JSONArray  thuFreeTime=new JSONArray();
		
		JSONObject fri=new JSONObject();
		JSONArray  friFreeTime=new JSONArray();
		
		JSONObject sat=new JSONObject();
		JSONArray  satFreeTime=new JSONArray();
		
		JSONObject sun=new JSONObject();
		JSONArray  sunFreeTime=new JSONArray();
		
		for (FreeTime freeTime : freeTimes) {
			jsonObject = new JSONObject();
			jsonObject.put("startTime", freeTime.getStartTime().toString());
			jsonObject.put("endTime", freeTime.getEndTime().toString());
			
			if(freeTime.getDay().equals("mon")){
				monFreeTime.add(jsonObject);
			}else if(freeTime.getDay().equals("tue")){
				tueFreeTime.add(jsonObject);
			}else if(freeTime.getDay().equals("wed")){
				wedFreeTime.add(jsonObject);
			}else if(freeTime.getDay().equals("thu")){
				thuFreeTime.add(jsonObject);
			}else if(freeTime.getDay().equals("fri")){
				friFreeTime.add(jsonObject);
			}else if(freeTime.getDay().equals("sat")){
				satFreeTime.add(jsonObject);
			}else if(freeTime.getDay().equals("sun")){
				sunFreeTime.add(jsonObject);
			}
		}

		mon.put("mon", monFreeTime);
		tue.put("tue", tueFreeTime);
		wed.put("wed", wedFreeTime);
		thu.put("thu", thuFreeTime);
		fri.put("fri", friFreeTime);
		sat.put("sat", satFreeTime);
		sun.put("sun", sunFreeTime);
		
		freeTimeArray.add(mon);
		freeTimeArray.add(tue);
		freeTimeArray.add(wed);
		freeTimeArray.add(thu);
		freeTimeArray.add(fri);
		freeTimeArray.add(sat);
		freeTimeArray.add(sun);
		
		return freeTimeArray;
	}
	
	@SuppressWarnings("unchecked")
	public Boolean setFreeTimes(final String freeTimesJsonStr,final int userID){
		JSONArray json = JSONArray.fromObject(freeTimesJsonStr);		
		JSONUtils.getMorpherRegistry().registerMorpher(new DateMorpher(new String[] {"yyyy-MM-dd", "HH:mm:ss","yyyy-MM-dd HH:mm:ss"}));				
		List<FreeTime> freeTimes = (List<FreeTime>)JSONArray.toCollection(json, FreeTime.class);
		return freeTimeDao.setFreeTimes(freeTimes,userID);
	}
	
	public List<FreeTime> getFreeTimesForDay(int dayTag) {
		int id = (Integer) ActionContext.getContext().getSession().get("userID");
		return freeTimeDao.getFreeTimesForDay(id, dayTag);
	}
	
	public List<FreeTime> getFreeTimesForDayByUser(int dayTag, User user) {
		return freeTimeDao.getFreeTimesForDay(user.getId(), dayTag);
	}

	public void clear() {
		freeTimeDao.clear();
	}

	public FreeTimeDao getFreeTimeDao() {
		return freeTimeDao;
	}

	public void setFreeTimeDao(FreeTimeDao freeTimeDao) {
		this.freeTimeDao = freeTimeDao;
	}
}
