<?php 

	// password : pi(H}Q~=9#U6{]3l
	// password projet : RP9HCiILYQTvdR*#
	
	/* http://localhost/projet_cordova/handler.php */
	$db = new PDO('mysql:host=localhost;dbname=id18720551_messagerie;charset=utf8', 'id18720551_boussodev', 'RP9HCiILYQTvdR*#', [
			PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
			PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC
	]);

	$task = "list";

	if(array_key_exists("task", $_GET)){
		$task = $_GET['task'];
	}

	//echo $task;

	if($task == "addUser"){
	    addUser();
	}else if($task == "logIn"){
		authentification();
	}else if($task == "getUsers"){
		getUsers();
	}else{
		echo "test";
	}

	function getMessages(){
		global $db;

		$resultats = $db->query("select * from messages order by created_at desc");
		$messages = $resultats->fetchAll();

		echo json_encode($messages);
	}

	function postMessage(){
		global $db;

		if(!array_key_exists('author', $_POST) || !array_key_exists('content', $_POST)){
			echo json_encode(["status" => "error", "message" => "error"]);
			return;
		}

		$author = $_POST['author'];
		$content = $_POST['content'];

		$query = $db->prepare('insert into messages set author = :author, content = :content, created_at = now()');

		$query->execute([
			"author" => $author,
			"content" => $content
		]); 

		echo json_encode(["status" => "success"]);
	}

	function addUser(){
		global $db;

		$nom = $_POST['nom'];
		$prenom = $_POST['prenom'];
		$login = $_POST['login'];
		$password = $_POST['password'];
		$tel = $_POST['telephone'];
		//$photo = $_POST['photo'];

		$resultats = $db->prepare("insert into users(nom, prenom, login, password, telephone) values(?, ?, ?, ?, ?)");

		$resultats->execute(array(
			$nom,
			$prenom,
			$login,
			md5($password),
			$tel
		));

		echo json_encode(["status" => "success"]);
	}

	function authentification(){
		global $db;
		$login = $_POST['login'];
		$password = $_POST['password'];

		$resultats = $db->prepare("select * from users where login = ? and password= ?");
		$resultats->execute(array(
			$login,
			md5($password)
		));

		echo json_encode($resultats->fetchAll());
	}

	function getUsers(){
		global $db;
		$tel = $_POST['telephone'];
		$resultats = $db->prepare("select * from users where telephone != ?");
		$resultats->execute(array(
			$tel
		));

		echo json_encode($resultats->fetchAll());

	}

?>