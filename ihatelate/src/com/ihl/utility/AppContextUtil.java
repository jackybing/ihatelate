package com.ihl.utility;

import org.springframework.beans.BeansException;
import org.springframework.context.ApplicationContext;
import org.springframework.context.ApplicationContextAware;

public class AppContextUtil implements ApplicationContextAware {

	private static ApplicationContext context;

	public void setApplicationContext(ApplicationContext arg0)
			throws BeansException {
		AppContextUtil.setAppContextUtil(arg0);
	}

	public static void setAppContextUtil(ApplicationContext context) {
		AppContextUtil.context = context;
	}

	@SuppressWarnings("unchecked")
	public static <T> T getBean(String name) {
		return (T) context.getBean(name);
	}

	@SuppressWarnings("unchecked")
	public static <T> T getBean(String name, Object... objects) {
		return (T) context.getBean(name, objects);
	}

}
