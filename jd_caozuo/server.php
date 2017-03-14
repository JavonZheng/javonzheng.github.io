<?php
	// 查询所有的订单数据
	// 1. 与数据库建立连接
	$conn = mysqli_connect('127.0.0.1','root','','jd','3306');
	// 2. 定义SQL语句
	$sql = 'SELECT * FROM jd_order';
	// 3. 向数据库发送SQL语句
	mysqli_query($conn,"SET NAMES UTF8");
	$result = mysqli_query($conn,$sql);
	// 4. 将结果集对象(mysqli_result)解析为数组类型
	$arr = array();//定义一个数组,用于存储所有数据
	while($row = mysqli_fetch_array($result,MYSQLI_ASSOC)){
		array_push($arr,$row);
	}
	// 5. 将构建的数组转换为JSON格式
	$json = json_encode($arr);
	// 6. 将JSON格式的数据响应给客户端
	echo $json;
?>