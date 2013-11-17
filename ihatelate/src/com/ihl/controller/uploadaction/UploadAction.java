package com.ihl.controller.uploadaction;

import java.io.File;
import java.util.HashMap;
import java.util.Map;

import org.apache.log4j.Logger;

import net.sf.json.JSONObject;

import com.opensymphony.xwork2.ActionSupport;
import com.ihl.utility.FileUploadUtil;

public class UploadAction extends ActionSupport {
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private static final Logger log = Logger.getLogger(UploadAction.class);
	private FileUploadUtil fileUploadUtil;
	private File uploadFile;
	private String contentType;
	private String fileName;
	
	private String disk;
	private String url;

	private JSONObject response;
	private String result;

	public String getResult() {
		return result;
	}

	public void setResult(String result) {
		this.result = result;
	}

	public String getDisk() {
		return disk;
	}

	public void setDisk(String disk) {
		this.disk = disk;
	}

	public String getUrl() {
		return url;
	}

	public void setUrl(String url) {
		this.url = url;
	}

	public FileUploadUtil getFileUploadUtil() {
		return fileUploadUtil;
	}

	public void setFileUploadUtil(FileUploadUtil fileUploadUtil) {
		this.fileUploadUtil = fileUploadUtil;
	}

	public File getUploadFile() {
		return uploadFile;
	}

	public void setUploadFile(File uploadFile) {
		this.uploadFile = uploadFile;
	}

	public String getContentType() {
		return contentType;
	}

	/**
	 * struts文件上传要求
	 * 
	 * @param contentType
	 */
	public void setUploadFileContentType(String contentType) {
		this.contentType = contentType;
	}

	public String getFileName() {
		return fileName;
	}

	public void setUploadFileFileName(String fileName) {
		this.fileName = fileName;
	}

	public JSONObject getResponse() {
		return response;
	}

	public void setResponse(JSONObject response) {
		this.response = response;
	}

	public String imageUpload() throws Exception {
		response = new JSONObject();
		boolean status = true;
		StringBuffer buf = new StringBuffer();
		Map<String, String> addressMap = null;
		if (log.isDebugEnabled())
			log.debug("开始上传图片：" + fileName);
		// 判断上传图片的后缀和大小
		if (!fileUploadUtil.isImageSizeValid(uploadFile)) {
			status = false;
			buf.append("对不起，您本次上传的图片太大了");
		}

		String ext = fileName.substring(fileName.lastIndexOf("."));//.xxx
		String fname=fileName.substring(0,fileName.lastIndexOf("."));//不包含.xxx
		System.out.println("ext:"+ext);
		// 后缀判断
		if (!fileUploadUtil.isImageExtensionValid(ext)) {
			status = false;
			buf.append("对不起，您本次上传的图片后缀为'").append(ext).append("'，本系统只支持后缀为")
					.append(fileUploadUtil.getAcceptExtensions().keySet())
					.append("的图片");

		}

		if (status) {// 通过了校验
			/* 将图片上传到服务器指定目录中 */
			addressMap = fileUploadUtil.copyImageToServer(uploadFile);
		}
		if (status) {
			response.put("statusCode", "200");
			response.put("url", addressMap.get("url"));
			response.put("disk", addressMap.get("disk"));
		} else {
			response.put("statusCode", "404");
		}

		response.put("messages", buf.toString());
		if (log.isDebugEnabled())
			log.debug("上传图片响应：" + response);
		return SUCCESS;
	}
	
	public String deleteFileOnUpload() throws Exception{
		Map<String, String> resultMap = new HashMap<String, String>();
		if(fileUploadUtil.deleteFileOnUpload(disk)){
			resultMap.put("statusCode", "200");
		}else {
			resultMap.put("statusCode", "404");
		}	
		setResult(JSONObject.fromObject(resultMap).toString());
		return SUCCESS;
	}
	
}
