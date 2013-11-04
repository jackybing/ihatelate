package com.ihl.dao.freetimedao;

import java.util.List;

import com.ihl.model.freetime.FreeTime;

public interface FreeTimeDao {
	public List<FreeTime> getFreeTimes(final int userID);
	public Boolean setFreeTimes(final List<FreeTime> freeTimes,final int userID);
	//返回某个用户某一天的空闲时间列表
	public List<FreeTime> getFreeTimesForDay(final int userId ,final int dayTag);
	public void clear();
}
