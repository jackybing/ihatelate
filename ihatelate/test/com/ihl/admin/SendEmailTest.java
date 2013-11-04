package com.ihl.admin;

import java.text.ParseException;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Set;

import org.junit.After;
import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

import com.ihl.model.basetask.BaseTask;

public class SendEmailTest {
	private SendEmail sendEmail;

	@Before
	public void initImageTemplateActionTest() {
		ApplicationContext applicationContext = new ClassPathXmlApplicationContext(
				"applicationContext.xml");
		sendEmail = (SendEmail) applicationContext.getBean("sendEmail");
	}

	@After
	public void detroyImageTemplateActionTest() {
		sendEmail = null;
	}

	@Test
	public void testObtainImageList() throws ParseException {
		Map<String, List<BaseTask>> emailInfos = sendEmail.obtainEmailInfo();
		Set keySet = emailInfos.keySet();
		Iterator iterator = keySet.iterator();
		while (iterator.hasNext()) {
			Object key = iterator.next();
			System.out.println("====================");
			System.out.println(key);
			List<BaseTask> baseTasks = (List<BaseTask>) emailInfos.get(key);
			for(BaseTask baseTask : baseTasks){
				System.out.println(baseTask.getName());
			}
		}
		Assert.assertEquals(35, 35);
	}
}
