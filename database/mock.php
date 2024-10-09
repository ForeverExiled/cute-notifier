<?
require $_SERVER['DOCUMENT_ROOT'].'/database/database.php';
$db = new Database();

$db->Create(['description' => 'test1', 'datetime' => '2027-12-31T01:00']);
$db->Create(['description' => 'test2', 'datetime' => '2022-11-31T01:00']);
$db->Create(['description' => 'test3', 'datetime' => '2024-12-10T05:00']);
$db->Create(['description' => 'test4', 'datetime' => '2024-06-17T11:25']);
$db->Create(['description' => 'test5', 'datetime' => '2024-02-12T01:00']);
$db->Create(['description' => 'test6', 'datetime' => '2025-11-31T01:00']);
$db->Create(['description' => 'test7', 'datetime' => '2025-12-31T12:00']);
$db->Create(['description' => 'test8', 'datetime' => '2024-12-31T03:00']);
$db->Create(['description' => 'test9', 'datetime' => '2011-12-31T04:00']);
$db->Create(['description' => 'test10', 'datetime' => '2024-12-31T01:00']);
