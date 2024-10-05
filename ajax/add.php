<?
require $_SERVER['DOCUMENT_ROOT'].'/database/database.php';

if ($_POST) {
    echo json_encode((new Database())->Create($_POST));
}
