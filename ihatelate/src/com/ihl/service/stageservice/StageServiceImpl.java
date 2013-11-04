package com.ihl.service.stageservice;

import java.util.List;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import com.ihl.dao.basetaskdao.BaseTaskDao;
import com.ihl.dao.stagedao.StageDao;
import com.ihl.model.basetask.BaseTask;
import com.ihl.model.stage.Stage;

public class StageServiceImpl implements StageService{
	private StageDao stageDao;
	private BaseTaskDao baseTaskDao;
	public JSONObject getDefault(int type) {
		BaseTask baseTask = baseTaskDao.getBest(type);
		List<Stage> stages;
		int taskID;
		if(baseTask != null){
			stages = stageDao.getByFirstStage(baseTask);
			taskID = stages.get(0).getTask().getId();
		}else{
			stages = stageDao.getDefault(type);
			taskID = -1;
		}
		
		if(stages.size() != 0){
			JSONArray jsonArray = new JSONArray();
			for(Stage stage : stages){
				JSONObject jsonObject = new JSONObject();
				jsonObject.put(stage.getStep(),stage.getName());
				jsonArray.add(jsonObject);
			}
			JSONObject jsonObject = new JSONObject();
			jsonObject.put("taskID", taskID);
			jsonObject.put("stages", jsonArray);
			return jsonObject;
		}else {
			return null;
		}
	}
	public StageDao getStageDao() {
		return stageDao;
	}
	public void setStageDao(StageDao stageDao) {
		this.stageDao = stageDao;
	}
	public BaseTaskDao getBaseTaskDao() {
		return baseTaskDao;
	}
	public void setBaseTaskDao(BaseTaskDao baseTaskDao) {
		this.baseTaskDao = baseTaskDao;
	}
}
