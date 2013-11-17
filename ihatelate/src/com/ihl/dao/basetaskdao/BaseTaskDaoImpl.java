package com.ihl.dao.basetaskdao;

import java.sql.SQLException;
import java.util.Date;
import java.util.List;
import java.util.Random;

import org.hibernate.HibernateException;
import org.hibernate.Session;
import org.springframework.orm.hibernate3.HibernateCallback;
import org.springframework.orm.hibernate3.support.HibernateDaoSupport;

import com.ihl.model.basetask.BaseTask;
import com.ihl.model.user.User;
import com.ihl.utility.ConfigUtil;

public class BaseTaskDaoImpl extends HibernateDaoSupport implements BaseTaskDao{

	@SuppressWarnings("unchecked")
	public List<BaseTask> getActiveAndUncompletedTask(final Date date,final User user) {
		
		List<BaseTask> baseTasks = this.getHibernateTemplate().executeFind(
				new HibernateCallback() {
					public Object doInHibernate(Session session)
							throws HibernateException, SQLException {
						List<BaseTask> baseTasks = session
						.createQuery("from BaseTask b where b.isActive = true and b.isCompleted = false and b.isDeleted = false and b.startTime <= ? and b.user = ? order by priority,secondaryPriority,threeStagePriority")
						.setDate(0, date).setEntity(1, user).list();
						return baseTasks;
					}
				});
//		for (BaseTask baseTask : baseTasks) {
//			System.out.println(baseTask.getName()+":"+baseTask.getPriority()+":"+baseTask.getCreateTime());
//		}
		return baseTasks;
	}

	public void clear() {
		getHibernateTemplate().clear();
	}

	public void delete(int id) {
		BaseTask baseTask = get(id);
		if(baseTask != null){
			getHibernateTemplate().delete(baseTask);
		}
	}

	public BaseTask get(int id) {
		return getHibernateTemplate().get(BaseTask.class, id);
	}

	public List<BaseTask> get(User user) {
		String query = "from BaseTask b where b.user = ? and isDeleted = false";
		return getHibernateTemplate().find(query,user);
	}

	public void delete(List<BaseTask> baseTasks) {
		getHibernateTemplate().deleteAll(baseTasks);
	}

	public void update(BaseTask baseTask) {
		getHibernateTemplate().update(baseTask);
	}

	public void flush() {
		getHibernateTemplate().flush();
	}

	public BaseTask getBest(int type) {
		String query = "select max(b.count) from BaseTask as b where b.type = ?";
		List<Integer> ids = getHibernateTemplate().find(query,type);
		if(ids.get(0) != null && ids.size() > 0){
			int max = ids.get(0);
			int number = ConfigUtil.getConfig();
			String query2 = "from BaseTask b where b.type = ? and b.count > ?";
			int condition = max - number;
			if(condition < 0){
				condition = 0;
			}
			List<BaseTask> baseTasks = getHibernateTemplate().find(query2,type,condition);
			Random random = new Random();
			int i = random.nextInt(baseTasks.size());
			return baseTasks.get(i);
		}
		return null;
	}
}
