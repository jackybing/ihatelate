package com.ihl.utility;

import java.io.BufferedInputStream;
import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.InputStream;
import java.io.OutputStream;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

import org.apache.log4j.Logger;

/**
 * 文件（包括图片、压缩文件等）上传处理工具类
 * 
 * @author zjb
 */
public class FileUploadUtil {
	private static final Logger log = Logger.getLogger(FileUploadUtil.class);
	
	//private final String serverPath = "D:\\Workspaces\\TIFY-FULL\\.metadata\\.me_tcat\\webapps\\";
	
	/*private final String serverPath = System.getProperty("user.dir")
	.substring(0, System.getProperty("user.dir").lastIndexOf("bin"))
	+ "webapps" + File.separator;*/
	
	private final String serverPath = System.getProperty("user.dir")
	+File.separator
	+ "webapps" + File.separator;

	private String fileDisk;
	private String domain;
	private HashMap<String, String> acceptExtensions;// 允许的文件后缀
	private long imageMaxSize;// 文件最大尺寸

	public String getFileDisk() {
		return fileDisk;
	}

	public void setFileDisk(String fileDisk) {
		this.fileDisk = fileDisk;
	}

	public String getDomain() {
		return domain;
	}

	public void setDomain(String domain) {
		this.domain = domain;
	}

	public HashMap<String, String> getAcceptExtensions() {
		return acceptExtensions;
	}

	public void setAcceptExtensions(HashMap<String, String> acceptExtensions) {
		this.acceptExtensions = acceptExtensions;
	}

	public long getImageMaxSize() {
		return imageMaxSize;
	}

	public void setImageMaxSize(long imageMaxSize) {
		this.imageMaxSize = imageMaxSize;
	}

	/**
	 * 判断图片大小是否有效
	 * 
	 * @param image
	 * @return
	 */
	public boolean isImageSizeValid(File image) {
		long size = image.length();// 文件占的实际磁盘空间
		if (log.isDebugEnabled())
			log.debug("本次上传图片大小为：" + size);
		return size <= this.imageMaxSize;
	}

	/**
	 * 图片后缀是否有效
	 * 
	 * @param ext
	 * @return
	 */
	public boolean isImageExtensionValid(String ext) {
		// 后缀判断
		if (log.isDebugEnabled())
			log.debug("本次上传图片后缀为：" + ext);
		return this.acceptExtensions.containsKey(ext);
	}

	/**
	 * 文件拷贝 读写方式拷贝
	 */
	private final int BUFFER_SIZE = 1024;// 拷贝文件时的buf大小

	public Map<String, String> copyImageToServer(File src) {
		Map<String, String> addressMap = new HashMap<String, String>();
		String filename = UUID.randomUUID().toString() + ".jpg";
		String webUrl = domain + "/" + fileDisk + "/" + filename;
		/*String serverUrl = this.serverPath + fileDisk + File.separator + filename;*/
		String serverUrl = "E:\\Workspaces\\Github_Project_test\\.metadata\\.me_tcat\\webapps" + File.separator + fileDisk + File.separator + filename;
		File dst = new File(serverUrl), dstParentFile = dst.getParentFile();
		if(!dstParentFile.exists()) {
			dstParentFile.mkdirs();
		}
		try {
			InputStream in = null;
			OutputStream out = null;
			try {
				in = new BufferedInputStream(new FileInputStream(src),
						BUFFER_SIZE);
				out = new BufferedOutputStream(new FileOutputStream(dst),
						BUFFER_SIZE);
				byte[] buffer = new byte[BUFFER_SIZE];
				while (in.read(buffer) > 0) {
					out.write(buffer);
				}
			} finally {
				if (null != in) {
					in.close();
				}
				if (null != out) {
					out.close();
				}
			}
			addressMap.put("url", webUrl);
			addressMap.put("disk", serverUrl);
		} catch (Exception e) {
			if (log.isDebugEnabled()) {
				log.debug("文件拷贝出错：" + e.getMessage() + "。具体原因：" + e.getCause());
			}
			throw new RuntimeException(e);
		}
		return addressMap;
	}

	public Map<String, String> copyAttachmentToServer(File src,
			String oldFilename, String ext) {
		Map<String, String> addressMap = new HashMap<String, String>();
		String newFilename = oldFilename + "_" + (new Date().getTime()) + ext;// 新名称为原名称_时间截.xxx
		String webUrl = domain + "/" + fileDisk + "/" + newFilename;
		String serverUrl = this.serverPath + fileDisk + File.separator
				+ newFilename;
		File dst = new File(serverUrl);
		try {
			InputStream in = null;
			OutputStream out = null;
			try {
				in = new BufferedInputStream(new FileInputStream(src),
						BUFFER_SIZE);
				out = new BufferedOutputStream(new FileOutputStream(dst),
						BUFFER_SIZE);
				byte[] buffer = new byte[BUFFER_SIZE];
				while (in.read(buffer) > 0) {
					out.write(buffer);
				}
			} finally {
				if (null != in) {
					in.close();
				}
				if (null != out) {
					out.close();
				}
			}
			addressMap.put("url", webUrl);
			addressMap.put("disk", serverUrl);
		} catch (Exception e) {
			if (log.isDebugEnabled()) {
				log.debug("文件拷贝出错：" + e.getMessage() + "。具体原因：" + e.getCause());
			}
			throw new RuntimeException(e);
		}

		return addressMap;
	}

	public boolean deleteFileOnUpload(String disk) {
		boolean flag = false;
		File file = new File(disk);
		// 判断目录或文件是否存在
		if (!file.exists()) { // 不存在返回 false
			flag = true;
		} else {
			flag = file.delete();
		}
		return flag;
	}
}
