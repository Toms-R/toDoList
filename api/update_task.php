<?php
header('Acces-Control-Allow-Origin: *');
header('Content-Type: application/json');
header('Access-Control-Allow-Methods: PUT');
header('Access-Control-Allow-Headers: Access-Control-Allow-Headers, Content-Type, Access-Control-Allow-Methods, Authorization, X-Requested-With');

include_once 'config.php';
include_once 'PostTask.php';

$database = new Database();
$db = $database->connect();
$task = new Post($db);
parse_str(file_get_contents("php://input", "r"), $data);
$task->id = $data['id'];
$task->uzdevums = $data['uzdevums'];

if ($task->update()) {
    echo json_encode(
        array('message' => 'User Updated')
    );
} else {
    echo json_encode(
        array('message' => 'User Not Updated')
    );
}
