package com.ihl.dao.freetimedao;

import java.sql.SQLException;
import java.util.List;

import org.apache.log4j.Logger;
import org.hibernate.HibernateException;
import org.hibernate.Session;
import org.springframework.orm.hibernate3.HibernateCallback;
import org.springframework.orm.hibernate3.support.HibernateDaoSupport;

import com.ihl.model.freetime.FreeTime;
import com.ihl.model.user.User;

public class FreeTimeDaoImpl extends HibernateDaoSupport implements FreeTimeDao{

	private static final Logger log = Logger.getLogger(FreeTimeDaoImpl.class);
	
	@SuppressWarnings("unchecked")
	public List<FreeTime> getFreeTimes(final int userID){
		
		List<FreeTime> freeTimes = this.getHibernateTemplate().executeFind(
				new HibernateCallback() {
					public Object doInHibernate(Session session)
							throws HibernateException, SQLException {
						/*User user=(User)session.createQuery("from User u where u.id= ?").setInteger(0, userID).list().get(0);
						List<FreeTime> freeTimes=new ArrayList<FreeTime>();
						for (FreeTime freeTime : user.getFreeTimes()) {
							freeTimes.add(freeTime);
						}
						return freeTimes;*/
						
						List<FreeTime> freeTimes = session
						.createQuery("from FreeTime ft where ft.user.id= ? order by tag,startTime")
						.setInteger(0, userID).list();
						return freeTimes;
					}
				});
//		for (FreeTime freeTime : freeTimes) {
//			System.out.println(freeTime.getDay()+":"+freeTime.getStartTime());
//		}
		return freeTimes;
	}
	
	@SuppressWarnings("unchecked")
	public Boolean setFreeTimes(final List<FreeTime> freeTimes,final int userID){
		boolean tag = getHibernateTemplate().execute(new HibernateCallback() {
			public Object doInHibernate(Session session)
					throws HibernateException, SQLException {
				boolean tag = false;
				org.hibernate.Transaction tx = null;
				try {
					tx = session.beginTransaction();
					tx.begin();
					
					User user=(User)session.createQuery("from User u where u.id= ?").setInteger(0, userID).list().get(0);
					
					for (FreeTime freeTime : user.getFreeTimes()) {
						session.delete(freeTime);
					}
					
					for (FreeTime freeTime : freeTimes) {
						user.getFreeTimes().add(freeTime);
						session.saveOrUpdate(freeTime);
					}
					session.saveOrUpdate(user);
					tx.commit();
					tag = true;
				} catch (Exception e) {
					log.error("save freetimes fail:"
							+ e.toString());
					tx.rollback();
					tag = false;
				}
				return tag;
			}
		});
		return tag;
	}
	
	@SuppressWarnings("unchecked")
	public List<FreeTime> getFreeTimesForDay(final int userId ,final int dayTag) {
		List<FreeTime> freeTimes = this.getHibernateTemplate().executeFind(
				new HibernateCallback() {
					public Object doInHibernate(Session session)
							throws HibernateException, SQLException {
						
						List<FreeTime> freeTimes = session
						.createQuery("from FreeTime ft where ft.user.id= ? and ft.tag = ? order by startTime")
						.setInteger(0, userId).setInteger(1, dayTag).list();
						return freeTimes;
					}
				});
//		for (FreeTime freeTime : freeTimes) {
//			System.out.println(freeTime.getDay()+":"+freeTime.getStartTime());
//		}
		return freeTimes;
	}
	
	public void clear() {
		getHibernateTemplate().clear();
	}

}
