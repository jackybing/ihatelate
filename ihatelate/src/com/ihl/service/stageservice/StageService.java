package com.ihl.service.stageservice;

import com.ihl.model.stage.Stage;

import net.sf.json.JSONObject;

public interface StageService {
	public JSONObject getDefault(int type);

	public void delete(Stage stage);

	public void deleteByID(int ID);
}
