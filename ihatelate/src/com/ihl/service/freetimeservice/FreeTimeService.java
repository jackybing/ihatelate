package com.ihl.service.freetimeservice;

import java.util.List;

import com.ihl.model.freetime.FreeTime;
import com.ihl.model.user.User;

import net.sf.json.JSONArray;

public interface FreeTimeService {
	public JSONArray getFreeTimes(final int userID);
	public Boolean setFreeTimes(final String freeTimesJsonStr,final int userID);
	public List<FreeTime> getFreeTimesForDay(final int dayTag);
	public List<FreeTime> getFreeTimesForDayByUser(final int dayTag,User user);
	public void clear();
}
