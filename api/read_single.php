<?php
    header('Acces-Control-Allow-Origin: *');
    header('Content-Type: application/json');

    include_once 'config.php';
    include_once 'Post.php';

    $database = new Database();
    $db = $database->connect();
    $users = new Post($db);
    $users->id = isset($_GET['id']) ? $_GET['id'] : die();
    $users->read_single();

    $users_arr = array(
        'id' => $users->id,
        'name' => $users->name,
        'lastname' => $users->lastname
    );

    print_r(json_encode($users_arr));
