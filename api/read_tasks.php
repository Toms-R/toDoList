<?php
    header('Acces-Control-Allow-Origin: *');
    header('Content-Type: application/json');

    include_once 'config.php';
    include_once 'PostTask.php';

    $database = new Database();
    $db = $database->connect();
    $task = new Post($db);
    $result = $task->read();
    $num = $result->rowCount();

    //all users
    if($num > 0){
        $task_arr = array();
        $task_arr['data'] = array();

        while($row = $result->fetch(PDO::FETCH_ASSOC)){
            extract($row);

            $task_item = array(
                'id' => $id,
                'uzdevums' => $uzdevums,
                'timestamp' => $timestamp
            );

            array_push($task_arr['data'], $task_item);
        }

        echo (json_encode($task_arr));
    }
    else {
        echo json_encode(array('message' => 'No Tasks found'));
    }


