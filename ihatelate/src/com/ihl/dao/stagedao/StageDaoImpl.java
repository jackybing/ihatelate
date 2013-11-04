package com.ihl.dao.stagedao;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;

import org.springframework.orm.hibernate3.support.HibernateDaoSupport;

import com.ihl.model.basetask.BaseTask;
import com.ihl.model.stage.Stage;

public class StageDaoImpl extends HibernateDaoSupport implements StageDao{

	public List<Stage> getDefault(int type) {
		String query = "from Stage s where s.type = ? and s.isDefault = true order by step";
		List<Stage> stages = getHibernateTemplate().find(query, type);
		return stages;
	}

	public List<Stage> getByFirstStage(BaseTask baseTask) {
		String query = "from Stage s where s.task = ?";
		List<Stage> stages = getHibernateTemplate().find(query, baseTask);
		if(stages.size() > 0){
			Set<Stage> stages2 = stages.get(0).getTask().getStages();
			List<Stage> stages3 = new ArrayList<Stage>();
			stages3.addAll(stages2);
			return stages3;
		}
		return null;
	}

}
