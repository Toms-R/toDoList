<?php
    class Database
    {
        private $conn;

        public function connect(){
            $conf = parse_ini_file("config.ini", true);
            $this->conn = null;
            
            try{
                $this->conn = new PDO('mysql:host=' . $conf['DB']['host'] . ';dbname=' . $conf['DB']['name'], $conf['DB']['user'], $conf['DB']['pass']);
                $this->conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

            } catch(PDOException $e){
                echo 'Connection Error: ' . $e->getMessage();
            }
            return $this->conn;
        }
    }
