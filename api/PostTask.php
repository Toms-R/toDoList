<?php
class Post{
    private $conn;
    private $table = 'todolist';

    public $id;
    public $uzdevums;
    public $timestamp;

    public function __construct($db)
    {
        $this->conn = $db;
    }

    public function read() {
        $query = 'SELECT * FROM '  . $this->table . ' ' ;

        $stmt = $this->conn->prepare($query);

        $stmt->execute();

        return $stmt;
    }

    // GET single user.
    public function  read_single() {
        $query = "SELECT * FROM "  . $this->table . " WHERE id = ? " ;

        $stmt = $this->conn->prepare($query);

        $stmt->bindParam(1,$this->id);

        $stmt->execute();

        $row = $stmt->fetch(PDO::FETCH_ASSOC);

        //$this->id = $row['id'];
        $this->name = $row['name'];
        $this->lastname = $row['lastname'];
        //$this->timestamp = $row['timestamp'];
    }


     // Create user.

    public function create() {

        $querry = ' INSERT INTO ' . $this->table . ' SET uzdevums = :uzdevums';

        $stmt = $this->conn->prepare($querry);

        $this->uzdevums = htmlspecialchars(strip_tags($this->uzdevums));

        $stmt->bindParam(':uzdevums', $this->uzdevums);

        if($stmt->execute()){
            $id = $this->conn->lastInsertId();
            return $id;
        }
        printf("Error: %s. \n", $stmt->error);

        return false;
    }

    // Update user.
    public function update() {

        $querry = ' UPDATE ' . $this->table . ' SET uzdevums = :uzdevums WHERE id = :id';

        $stmt = $this->conn->prepare($querry);

        $this->id = intval($this->id);
        $this->uzdevums = htmlspecialchars(strip_tags($this->uzdevums));

        $stmt->bindParam(':id', $this->id);
        $stmt->bindParam(':uzdevums', $this->uzdevums);

        if ($stmt->execute()){

            return true;
        }
        printf("Error: %s. \n", $stmt->error);

        return false;
    }

    // Delete user.
    public function delete() {

        $querry = ' DELETE FROM ' . $this->table . ' WHERE id = :id';
        $stmt = $this->conn->prepare($querry);
        $this->id = intval($this->id);
        $stmt->bindParam(':id', $this->id);

        if ($stmt->execute()) {

            return true;
        }
        printf("Error: %s. \n", $stmt->error);

        return false;
    }
}
