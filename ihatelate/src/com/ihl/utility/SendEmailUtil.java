package com.ihl.utility;


import java.util.Date;
import java.util.Properties;
import java.util.Timer;

import javax.activation.DataHandler;
import javax.activation.FileDataSource;
import javax.mail.Authenticator;
import javax.mail.Message;
import javax.mail.MessagingException;
import javax.mail.Multipart;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeBodyPart;
import javax.mail.internet.MimeMessage;
import javax.mail.internet.MimeMultipart;

import org.apache.log4j.Logger;

public class SendEmailUtil {
    private static final Logger log = Logger.getLogger(SendEmailUtil.class);
    static final String from = AppContextUtil.getBean("ihl.from.email");
    static final String passwd = AppContextUtil.getBean("ihl.from.password");
    static final String TIFY_HTTP_URL =AppContextUtil.getBean("ihl.http.url");
    static final String path =System.getProperty("user.dir");
    
    public static boolean sendMail(String emailAddr,String title,String message){
        Properties props = new Properties();
        props.put( "mail.smtp.auth",   "true");
        props.put("mail.smtp.host", "smtp.yeah.net");
        try {
            Session session = Session.getDefaultInstance(props,
                    new Authenticator() {
                        protected javax.mail.PasswordAuthentication getPasswordAuthentication() {
                            return new javax.mail.PasswordAuthentication(from,
                                    passwd);
                        }
                    });
            session.setDebug(true);
            InternetAddress fromAddr = new InternetAddress(from);
            InternetAddress toAddr = new InternetAddress(emailAddr);

            
            MimeMessage msg = new MimeMessage(session);
            msg.setFrom(fromAddr);
            msg.addRecipient(Message.RecipientType.TO, toAddr);
            msg.setSubject(title);
            msg.setSentDate(new Date());
            
            Multipart mp = new MimeMultipart();  
            MimeBodyPart mbp = new MimeBodyPart();
            mbp.setContent(message.toString(), "text/html;charset=gb2312");
            mp.addBodyPart(mbp);
                      
            msg.setContent(mp);
            Transport.send(msg);
            return true;
        } catch (MessagingException mex) {
            if(log.isDebugEnabled()) {
                log.error("send failed, exception: " + mex);
            }
            return false;
        }
    }
}
