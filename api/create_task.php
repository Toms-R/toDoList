<?php
    header('Acces-Control-Allow-Origin: *');
    header('Content-Type: application/json');
    header('Access-Control-Allow-Methods: POST');
    header('Access-Control-Allow-Headers: Access-Control-Allow-Headers, Content-Type, Access-Control-Allow-Methods, Authorization, X-Requested-With');

    require_once 'db.php';
    require_once 'PostTask.php';

    $database = new Database();
    $db = $database->connect();

    $task = new Post($db);
    $data = $_POST;
    $task->uzdevums = $data['uzdevums'];

    if ($id = $task->create()){
        echo json_encode(
            array('message' => 'Task Created', 'id' => $id)
        );

    } else {
        echo json_encode(
            array('message' => 'Task Not Created')
        );
    }
