<?
require $_SERVER['DOCUMENT_ROOT'].'/database/database.php';

if ($_GET) {
    echo json_encode((new Database())->Read($_GET));
}
