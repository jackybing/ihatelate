package com.ihl.model.user;

import java.util.Date;
import java.util.HashSet;
import java.util.Set;

import com.ihl.model.basetask.BaseTask;
import com.ihl.model.freetime.FreeTime;

public class User {
	private int id;
	private String password;
	private String email;
	private String userName;
	private Date createDate;
	private int sex;//1:man,0:woman
	private int type;//0:学生，1：办公室职员，2：户外工作者
	
	private Set<FreeTime> freeTimes=new HashSet<FreeTime>(); 
	private Set<BaseTask> baseTasks = new HashSet<BaseTask>();
	
	public Set<FreeTime> getFreeTimes() {
		return freeTimes;
	}
	public void setFreeTimes(Set<FreeTime> freeTimes) {
		this.freeTimes = freeTimes;
	}
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getUserName() {
		return userName;
	}
	public void setUserName(String userName) {
		this.userName = userName;
	}
	public Date getCreateDate() {
		return createDate;
	}
	public void setCreateDate(Date createDate) {
		this.createDate = createDate;
	}
	public int getSex() {
		return sex;
	}
	public void setSex(int sex) {
		this.sex = sex;
	}
	public Set<BaseTask> getBaseTasks() {
		return baseTasks;
	}
	public void setBaseTasks(Set<BaseTask> baseTasks) {
		this.baseTasks = baseTasks;
	}
	public int getType() {
		return type;
	}
	public void setType(int type) {
		this.type = type;
	}
}
