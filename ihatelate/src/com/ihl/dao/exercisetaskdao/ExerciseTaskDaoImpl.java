package com.ihl.dao.exercisetaskdao;

import org.springframework.orm.hibernate3.support.HibernateDaoSupport;

import com.ihl.model.exercisetask.ExerciseTask;

public class ExerciseTaskDaoImpl extends HibernateDaoSupport implements ExerciseTaskDao{

	public ExerciseTask saveOrUpdate(ExerciseTask exerciseTask) {
		getHibernateTemplate().saveOrUpdate(exerciseTask);
		return exerciseTask;
	}

	public ExerciseTask get(int ID) {
		return getHibernateTemplate().get(ExerciseTask.class, ID);
	}

}
