<?
class Database
{
    private static $schema_name = 'notifier';
    private static $table_name = 'primary';
    private $connection;

    function __construct() {
        $this->connection = new SQLite3(__DIR__.'/'.Database::$schema_name.'.sqlite3');
        $this->connection->exec('CREATE TABLE IF NOT EXISTS "'.Database::$table_name.'" (id INTEGER PRIMARY KEY AUTOINCREMENT, description TEXT, datetime TEXT NOT NULL)');
    }

    function Create($data) {
        $columns = implode(', ', array_keys($data));
        $values = implode(', ', array_map(fn($v) => "\"$v\"", $data));
        return $this->connection->exec('INSERT INTO "'.Database::$table_name.'" ('.$columns.') VALUES ('.$values.')');
    }

    function Read($query) {
        if ($query['all'] === 'Y') {
            $result = $this->connection->query('SELECT * FROM "'.Database::$table_name.'"');
            if ($result) {
                $response = '<ol>';
                while ($row = $result->fetchArray(SQLITE3_ASSOC)) {
                    // TODO: привести дату к красивому виду
                    $list_items[] = '<li><p class="description text pacifico-regular">'.$row['description'].'</p><p class="text pacifico-regular">'.implode('<br>', explode('T', $row['datetime'])).'</p></li>';
                }
                $response .= implode('<hr>', $list_items).'</ol>';
                return $response;
            }
        }
    }
}
