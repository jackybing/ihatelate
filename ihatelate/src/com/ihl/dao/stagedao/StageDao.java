package com.ihl.dao.stagedao;

import java.util.List;

import com.ihl.model.basetask.BaseTask;
import com.ihl.model.stage.Stage;

public interface StageDao {
	public List<Stage> getDefault(int type);
	public List<Stage> getByFirstStage(BaseTask baseTask);
}
