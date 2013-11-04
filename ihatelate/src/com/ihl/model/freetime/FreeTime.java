package com.ihl.model.freetime;

import java.util.Date;

import com.ihl.model.user.User;


public class FreeTime {
	private int id;
	private String day;
	private Date startTime;
	private Date endTime;
	
	private int tag;//mon:1,tue:2,wed:3,thu:4,fri:5,sat:6,sun:7
	
	private User user;
	public User getUser() {
		return user;
	}
	public void setUser(User user) {
		this.user = user;
	}

	public int getTag() {
		return tag;
	}
	public void setTag(int tag) {
		this.tag = tag;
	}
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getDay() {
		return day;
	}
	public void setDay(String day) {
		this.day = day;
	}
	public Date getStartTime() {
		return startTime;
	}
	public void setStartTime(Date startTime) {
		this.startTime = startTime;
	}
	public Date getEndTime() {
		return endTime;
	}
	public void setEndTime(Date endTime) {
		this.endTime = endTime;
	}
}
