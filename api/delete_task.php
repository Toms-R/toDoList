<?php
    ob_start();
    ini_set('display_errors', 0);
    header('Acces-Control-Allow-Origin: *');
    header('Content-Type: application/json');
    header('Access-Control-Allow-Methods: DELETE');
    header('Access-Control-Allow-Headers: Access-Control-Allow-Headers, Content-Type, Access-Control-Allow-Methods, Authorization, X-Requested-With');

    if ($_SERVER['REQUEST_METHOD'] !== 'DELETE') {
        http_response_code(405);
        die('error');
   }

    include_once 'config.php';
    include_once 'PostTask.php';

    $database = new Database();
    $db = $database->connect();
    $task = new Post($db);
    $data = $_POST;
    $task->id = $_GET['id'];

    if (!empty($task->id) && $id = $task->delete()){
        echo json_encode(
            array('message' => 'Task Deleted', 'id' => $id)
        );

    } else {
        http_response_code(500);
        echo json_encode(
            array('message' => 'Task Not Deleted')
        );
    }
    ob_flush();
