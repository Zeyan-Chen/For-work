<?php
    // 連線 BD
    $con = mysql_connect('localhost', 'root', '123');

    if (!$con)
    {
        die('Could not connect: ' . mysql_error());
    }

    // 確認連到資料表及 utf-8 設定
		mysql_select_db('interview', $con);
		header("Content-Type:text/html; charset=utf-8");

    if($_SERVER["REQUEST_METHOD"]=="POST"){
			mysqli_set_charset($con, "utf8");//設定編碼為utf-8
			mysql_query("SET names ‘utf8'");
			mysql_query("set character set ‘utf8'",$con);
			mysql_query("SET character_set_database='utf8'",$con);
			mysql_query("SET character_set_client='utf8'",$con);
			mysql_query("SET character_set_results='utf8'",$con);
			mysql_query("SET character_set_server='utf8'",$con);
			mysql_query("SET character_set_connection='utf8'",$con);
			insertMember();
		}
		
		// 設定一個 insert
    function insertMember(){
			global $con;
			$pNum = $_POST['pNum'];
			$pName = $_POST['pName'];
			$pPhone = $_POST['pPhone'];
			$pEmail = $_POST['pEmail'];
			$pAddr = $_POST['pAddr'];
			echo $pNum;
			$sql_query=mysql_query("INSERT INTO user (Num, Name, Phone, Email, Addr) VALUES ( '$pNum', '$pName', '$pPhone', '$pEmail', '$pAddr' )");

			mysqli_query($con,$sql_query) or die (mysqli_error($con));
			mysqli_close($con);
    }
?>