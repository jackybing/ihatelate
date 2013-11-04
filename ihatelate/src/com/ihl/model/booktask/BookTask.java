package com.ihl.model.booktask;

import java.text.ParseException;

import net.sf.json.JSONObject;

import com.ihl.model.basetask.BaseTask;

public class BookTask extends BaseTask{
	private String title;//书名
	private String ISBN;
	private int pageNum;//书页数
	private int efficiency;//效率，每页看几分钟

	@Override
	public void set_Total() {
		int total = pageNum * efficiency;
//		int remainder = pageNum % efficiency;
//		if(remainder != 0){
//			total++;
//		}
		setTotal(total);
	}
	
	@Override
	public void set_Time() throws ParseException {
		int time = getTotal() / getTotalDay();
		int remainder = getTotal() % getTotalDay();
		if(remainder != 0){
			time++;
		}
		setTime(time);
	}
	
	@Override
	public JSONObject obtainScheduleInfo(int allocatedTime) {
		JSONObject jsonObject = new JSONObject();
		
		int startPage = 0;//从第几页开始看
		int endPage = 0;//看到第几页结束
		
		startPage = getCompleted() / efficiency + 1;
		endPage = (getCompleted() + allocatedTime) / efficiency;
		
		jsonObject.put("title", title);
		jsonObject.put("startPage", startPage);
		jsonObject.put("endPage", endPage);
		
		return jsonObject;
	}
	

	@Override
	public int getFeedbackTime(String... strs) {
		return Integer.parseInt(strs[0]) * efficiency;
	}
	
	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getISBN() {
		return ISBN;
	}

	public void setISBN(String iSBN) {
		ISBN = iSBN;
	}

	public int getPageNum() {
		return pageNum;
	}

	public void setPageNum(int pageNum) {
		this.pageNum = pageNum;
	}

	public int getEfficiency() {
		return efficiency;
	}

	public void setEfficiency(int efficiency) {
		this.efficiency = efficiency;
	}
}
