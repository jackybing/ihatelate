<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://"
			+ request.getServerName() + ":" + request.getServerPort()
			+ path + "/";
%>
<%@ taglib prefix="decorator"
	uri="http://www.opensymphony.com/sitemesh/decorator"%>
<%@ taglib prefix="page" uri="http://www.opensymphony.com/sitemesh/page"%>
<%@ page language="java" contentType="text/html; charset=utf-8"
	pageEncoding="utf-8"%>
	<%@ taglib prefix="s" uri="/struts-tags"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">

</head>
<body>
 <script type="text/javascript" src="../plugins/datepicker/datepicker.min.js"></script>
	<script type="text/javascript">
	        function cancelcheck(){
	        	$.getJSON("https://api.douban.com/v2/book/search?count=10&q="
								+ document.getElementById("task_title").value
								+ "&alt=\"xd\"&callback=?",
						function(book) {
									$("#button").html("");
								 });
	        	document.getElementById("task_title").value="";
	        }
		function mycheck() {

			$
					.getJSON(
							"https://api.douban.com/v2/book/search?count=10&q="
									+ document.getElementById("task_title").value
									+ "&alt=\"xd\"&callback=?",
							function(book) {
										$("#button").html("");
								$("#title").append(book.count + "<hr/>");
							var num=0;
								//    $("#content").append(book+"<hr/>");
								//jquery解析map数据
								//  $.each(book.books,function(key,value){
								//    $("#title").append(key+"----"+value+"<br/><hr/>");
								//    });
								//解析数组
								//alert(document.getElementById("task_title").value);
								  $.each(book.books, function(i, item){
									    num++;
				                        $("#button").append(						
				                        "<div class=\"shadow back\" style='width:450px;float:left;font-weight:600;line-height:20px;height:400px;'> " 
				                        +"<div class='whatsnext'><div class='addbook'>"+ item.title  + 
				                        "</div><a class=\"nbtn toaddbook\" style=\"float:right\" >add</a></div><div style='height:300px;overflow:hidden'><img class='book_image' src=" +
				                        item.images.medium +
				                        ">"  +"<div class='book_content' >"+
				                        "<span class='blue'>Page:</span><span class='sum_page'>" +
				                        item.pages +"</span><br><span class='blue'>Average:</span>"+item.rating.average+
				                        "<br><span class='blue'>ISBN:</span><span class='ISBN'>"+item.isbn10+"</span><br>"+
				                        "<span class='blue'>Summary:</span><br>"+item.summary+
				                        "</div></div><hr/>");
				                    });
									  });
		}
	</script>	
	<!-- UI -->
	<div class="back shadow" id="task_box">
	<div class="whatsnext"><span class="english">Add project</span><span class="chinese">新增项目</span></div>
      <form  id="task_form" class="form-horizontal">
      <div class="control-group">
			<span class="english">Name：</span>
			<span class="chinese">任务标题：</span>
				<input type="text" name="title" id="task_title">
				<a class="nbtn  atheme2 " id="button2" type="button" onclick="mycheck()"
				style="display: none"	><span class="english">search</span><span class="chinese">查找</span></a>
				<a class="nbtn1 atheme2 " id="button2" type="button" onclick="cancelcheck()"
				style="display: none"	><span class="english">reset</span><span class="chinese">清除</span></a>
		  </div>
		  <span class="blue">Estimate Time:</span>
		  <br>
		   <a class='nbtn' id="theme2">Add a book</a> <a class='nbtn' id="theme3">Add a Video Course</a> <a class='nbtn' id="theme1">Add Free WorkTime</a>
			
		<div id= "all">	
		 <div class="control-group">
			<span class="english">Content:</span>
			<span class="chinese">内容:</span>
			<div class="controls">
			<input type="text" name="content" id="task_content" height="100px">
			</div>
			</div>
			 <div class="control-group">
		   <span class="english">StartTime:</span>
			<span class="chinese">开始时间:</span>
			<div class="controls">
			<input type="text"  name="StartTime1" readonly="readonly" id="StartTime1" class="datepicker">
			</div>
			</div>
			 <div class="control-group">
			<span class="english">EndTime:</span>
			<span class="chinese">结束时间:</span>
			<div class="controls">
			<input type="text"   name="EndTime1" readonly="readonly"   id="EndTime1" class="datepicker" >
			</div>
		</div>
		</div>
		<!-- right  -->
			<div  class="atheme2">
			 <div class="control-group">
			 <span class="english">Sum</span>
			 <span class="chinese">总页数</span>
			 <div class="controls">
		    <input name="Sum"   id="page_sum" type="text" >
		    </div>
		    </div>
		     <div class="control-group">
			<span class="english">TimeToSpend：</span>
			<span class="chinese">我预计花的时间</span>
			<div class="controls">
			<input type="text"   name="time1" readonly="readonly" id="StartTime2"
				onclick="floattime(this)">
				</div>
			</div>
				<span class="english">IHaveTimeInTheseDay：</span>
			<span class="chinese">这些天我有空做这些：</span>
			<div>
			<table class="table weektable" >
			<tr>	
			<td><input type="checkbox" name="Mon" value="true" class="styled">Mon</td>
			<td><input type="checkbox" name="Tue" value="true" class="styled">Tue</td>
			<td><input type="checkbox" name="Wed"  value="true" class="styled">Wed</td>
			<td><input type="checkbox" name="Thu"  value="true" class="styled">Thu</td>
			<td><input type="checkbox" name="Fri"  value="true" class="styled">Fri</td>	
			<td><input type="checkbox" name="Sat"  value="true" class="styled">Sat</td>
			<td><input type="checkbox" name="Sun"  value="true" class="styled">Sun</td>
			</tr>
			</table>
			<input name="ISBN"  id="ISBN"  style="display:none">
		    <input name="Image" id="image_url"   style="display:none">
			<a class="nbtn" onclick="submit_task_form(0)" ><span class="chinese">生成</span><span class="english">go</span></a>
		   </div>	
		   	
		</div>
		</form>
		
		</div>
		
	<div id="button"></div>
		<div id="small_task_list" class="back shadow">
			<ul id="small_task_ul">
				<li ><span class="english">Task1</span><span class="chinese">任务1</span>
					<input type="text" class="small_task_title" name="title"> <span
					class="english">Time</span><span class="chinese">时间</span> <input
					type="text" class="small_task_time" name="time" readonly="readonly" id="time1"> <span class="english">Process</span><span
					class="chinese">进度</span>
					<div class="btn-group">
						<a class="btn dec">-</a> <input type="text"
							class="small_task_weight" id="time1" name="rate" readonly="readonly"
							value="0"> <a class="btn add"
							style="margin-right: 150px">+</a>
					</div> 
				 <i class="icon-trash small_task_del" style="width: 20px;"></i> <i
					class="icon-ok small_task_ok" style="width: 20px"></i></li>
			</ul>
			<div class="progress progress-striped active"
				style="margin-bottom: -5px;">
				<div class="bar" style="width: 0%;"></div>
			</div>
			<div id="processps">
				<span>0%</span>
			</div>
			<a class="nbtn"  onclick="submit()"  >Finish</a>
		</div>
		
		<div style="clear: both; height: 100px"></div>	
<script type="text/javascript">
$(document).ready(function(){
var today = new Date();
var y = today.getFullYear();
var m = today.getMonth()+1;
var d = today.getDate();
var x = y+"-"+m+"-"+d;
$(".datepicker").datepicker({
    changeMonth: true,
    changeYear: true,
    yearRange: '2013:2022',
    defaultDate: x
});
    $("#time1").datepicker({
        changeMonth: true,
        changeYear: true,
        yearRange: '2013:2022',
        defaultDate: x
        
    }); 
});
</script>		
</body>
</html>