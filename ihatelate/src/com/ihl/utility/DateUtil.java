package com.ihl.utility;

import java.sql.Time;
import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;

public class DateUtil {
	// 计算两个日期之间的天数
	public static int daysBetween(Date start, Date end) throws ParseException {
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
		start = sdf.parse(sdf.format(start));
		end = sdf.parse(sdf.format(end));
		Calendar cal = Calendar.getInstance();
		cal.setTime(start);
		long time1 = cal.getTimeInMillis();
		cal.setTime(end);
		long time2 = cal.getTimeInMillis();
		long between_days = (time2 - time1) / (1000 * 3600 * 24);

		return Integer.parseInt(String.valueOf(between_days));
	}

	// 计算两个时间之间的分钟数
	public static int minutesBetween(Date start, Date end)
			throws ParseException {
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		start = sdf.parse(sdf.format(start));
		end = sdf.parse(sdf.format(end));
		Calendar cal = Calendar.getInstance();
		cal.setTime(start);
		long time1 = cal.getTimeInMillis();
		cal.setTime(end);
		long time2 = cal.getTimeInMillis();
		long between_days = (time2 - time1) / (1000 * 60);

		return Integer.parseInt(String.valueOf(between_days));
	}

	// 把字符串形式的日期yyyy-MM-dd转换为Date类型
	public static Date stringToDate(String date) throws ParseException {
		SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy-MM-dd");
		Date date2 = simpleDateFormat.parse(date);
		return date2;
	}

	// 把字符串形式的日期yyyy-MM-dd转换为Date类型
	public static Date stringToTime(String date) throws ParseException {
		SimpleDateFormat simpleDateFormat = new SimpleDateFormat(
				"yyyy-MM-dd HH:mm:ss");
		Date date2 = simpleDateFormat.parse(date);
		return date2;
	}
	//获得date是星期几
	public static int getWeekOfDate(Date date) {
		Calendar cal = Calendar.getInstance();
		cal.setTime(date);
		int week = cal.get(Calendar.DAY_OF_WEEK) - 1;
		if(week == 0){
			week = 7;
		}
		return week;
	}
	
	//startTime增加minutes分钟
	public static Date addMinute(Date startTime,int mimutes) throws ParseException{
		Calendar rightNow = Calendar.getInstance();
		rightNow.setTime(startTime);
		rightNow.add(Calendar.MINUTE, mimutes);
		Date date2 = rightNow.getTime();
		Time  time = new Time(rightNow.getTimeInMillis());
		return time;
	}
	
	//startDate增加n天
	public static Date addDay(Date startDate,int n){
		Calendar rightNow = Calendar.getInstance();
		rightNow.setTime(startDate);
		rightNow.add(Calendar.DAY_OF_MONTH, n);
		Date date = rightNow.getTime();
		return date;
	}
}
