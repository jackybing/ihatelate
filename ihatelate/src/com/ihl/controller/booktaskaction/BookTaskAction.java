package com.ihl.controller.booktaskaction;

import java.text.ParseException;
import java.util.HashMap;
import java.util.Map;

import net.sf.json.JSONObject;

import com.ihl.controller.basetaskaction.BaseTaskAction;
import com.ihl.model.basetask.BaseTask;
import com.ihl.model.booktask.BookTask;
import com.ihl.service.booktaskservice.BookTaskService;

public class BookTaskAction extends BaseTaskAction{
	private String title;//书名
	private String ISBN;
	private String pageNum;//书页数
	private String efficiency;//效率，看一页用多少分钟
	
	private BookTaskService bookTaskService;
	
	private String completedPageNum;//已完成页数，前台传递的任务反馈的信息
	
	public String create() throws ParseException{
		Map<String, String> resultMap = new HashMap<String, String>();
		
		BookTask bookTask = new BookTask();
		
		createBaseTask(bookTask);
		
		bookTask.setTitle(title);
		bookTask.setISBN(ISBN);
		bookTask.setPageNum(Integer.parseInt(pageNum));
		bookTask.setEfficiency(Integer.parseInt(efficiency));
		
		bookTask.set_Total();
		bookTask.set_Time();
		
		bookTaskService.saveOrUpdate(bookTask);
		
		resultMap.put("statusCode", "200");
		resultMap.put("info", "task saveOrUpdate successfully !");
		
		setResult(JSONObject.fromObject(resultMap).toString());
		
		return SUCCESS;
	}
	
	public String update() throws ParseException{
		
		Map<String, String> resultMap = new HashMap<String, String>();
		
		if("".equals(getId())){
			resultMap.put("statusCode", "500");
			resultMap.put("info", "task ID is null");
			return SUCCESS;
		}
		
		BookTask bookTask = bookTaskService.get(Integer.parseInt(getId()));
		updateBaseTask(bookTask);
		
		bookTask.setEfficiency(Integer.parseInt(efficiency));
		
		bookTask.set_Total();
		bookTask.updateTime();
		
		getBaseTaskService().update(bookTask);
		
		resultMap.put("statusCode", "200");
		resultMap.put("info", "update successfully");
		
		setResult(JSONObject.fromObject(resultMap).toString());
		
		return SUCCESS;
	}
	
	public String feedback(){
		Map<String, String> resultMap = new HashMap<String, String>();
		
		BaseTask baseTask = getBaseTaskService().get(Integer.parseInt(id));
		int completedTime = baseTask.getFeedbackTime(completedPageNum);
		baseTask.feedback(completedTime);
		getBaseTaskService().update(baseTask);
		
		resultMap.put("statusCode", "200");
		resultMap.put("info", "feedback successfully !");
		
		setResult(JSONObject.fromObject(resultMap).toString());
		return SUCCESS;
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
	public String getPageNum() {
		return pageNum;
	}
	public void setPageNum(String pageNum) {
		this.pageNum = pageNum;
	}
	public String getEfficiency() {
		return efficiency;
	}
	public void setEfficiency(String efficiency) {
		this.efficiency = efficiency;
	}
	public BookTaskService getBookTaskService() {
		return bookTaskService;
	}
	public void setBookTaskService(BookTaskService bookTaskService) {
		this.bookTaskService = bookTaskService;
	}

	public String getCompletedPageNum() {
		return completedPageNum;
	}

	public void setCompletedPageNum(String completedPageNum) {
		this.completedPageNum = completedPageNum;
	}
}
