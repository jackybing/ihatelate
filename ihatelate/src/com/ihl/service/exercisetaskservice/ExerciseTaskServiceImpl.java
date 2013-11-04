package com.ihl.service.exercisetaskservice;

import com.ihl.dao.exercisetaskdao.ExerciseTaskDao;
import com.ihl.model.exercisetask.ExerciseTask;

public class ExerciseTaskServiceImpl implements ExerciseTaskService{
	private ExerciseTaskDao exerciseTaskDao;

	public ExerciseTask saveOrUpdate(ExerciseTask exerciseTask) {
		return exerciseTaskDao.saveOrUpdate(exerciseTask);
	}

	public ExerciseTaskDao getExerciseTaskDao() {
		return exerciseTaskDao;
	}

	public void setExerciseTaskDao(ExerciseTaskDao exerciseTaskDao) {
		this.exerciseTaskDao = exerciseTaskDao;
	}
}
