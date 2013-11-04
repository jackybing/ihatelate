package com.ihl.utility;

import java.io.FileInputStream;
import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;
import java.util.Properties;


public class ConfigUtil {
	public static int getConfig(){
    	
		String path = null;
		try {
			path = URLDecoder.decode(ConfigUtil.class.getClassLoader().getResource("").getPath(), "UTF-8") + "config.properties";
		} catch (UnsupportedEncodingException e1) {
			e1.printStackTrace();
			return -1;
		}
		
		FileInputStream fileInputStream = null;
		Properties properties = new Properties();
		int number;
		try {
			fileInputStream = new FileInputStream(path);
			properties.load(fileInputStream);
			number = Integer.parseInt(properties.get("number").toString());
		} catch (Exception e) {
			e.printStackTrace();
			return -1;
		}
        return number;
    }
}
