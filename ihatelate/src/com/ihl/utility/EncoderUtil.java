package com.ihl.utility;

import java.io.UnsupportedEncodingException;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;

import sun.misc.BASE64Encoder;

public class EncoderUtil {
	public static String getEncodedPasswordByMd5(String orgPassword) throws NoSuchAlgorithmException, UnsupportedEncodingException{
	        MessageDigest md5=MessageDigest.getInstance("MD5");
	        BASE64Encoder base64en = new BASE64Encoder();
	        String newPassword=base64en.encode(md5.digest(orgPassword.getBytes("utf-8")));
	        return newPassword;
	    }
}
