package com.ihl.dao.exercisetaskdao;

import com.ihl.model.exercisetask.ExerciseTask;

public interface ExerciseTaskDao {
	public ExerciseTask saveOrUpdate(ExerciseTask exerciseTask);

	public ExerciseTask get(int ID);
}
