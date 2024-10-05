<?
class Database
{
    private static $month_names = [
        '01' => 'января',
        '02' => 'февраля',
        '03' => 'марта',
        '04' => 'апреля',
        '05' => 'мая',
        '06' => 'июня',
        '07' => 'июля',
        '08' => 'августа',
        '09' => 'сентября',
        '10' => 'октября',
        '11' => 'ноября',
        '12' => 'декабря',
    ];
    private static $schema_name = 'notifier';
    private static $table_name = 'primary';
    private $connection;

    function __construct() {
        $this->connection = new SQLite3(__DIR__.'/'.Database::$schema_name.'.sqlite3');
        $this->connection->exec('CREATE TABLE IF NOT EXISTS "'.Database::$table_name.'" (id INTEGER PRIMARY KEY AUTOINCREMENT, description TEXT, datetime TEXT NOT NULL)');
    }

    function Create($data) {
        $columns = implode(', ', array_keys($data));
        $values = implode(', ', array_map(fn($v) => $v ? "\"$v\"" : null, $data));
        return $this->connection->exec('INSERT INTO "'.Database::$table_name.'" ('.$columns.') VALUES ('.$values.')');
    }

    function Read($query) {
        if ($query['all'] === 'Y') {
            $result = $this->connection->query('SELECT * FROM "'.Database::$table_name.'"');
            if ($result) {
                $response = '<ol>';
                while ($row = $result->fetchArray(SQLITE3_ASSOC)) {
                    $row['datetime'] = explode('T', $row['datetime']);
                    $date = explode('-', $row['datetime'][0]);
                    $date[1] = Database::$month_names[$date[1]];
                    $date = implode(' ', array_reverse($date));
                    $row['datetime'] = implode('<br>', [$date, $row['datetime'][1]]);
                    $list_items[] = '<li><p class="description text pacifico-regular">'.$row['description'].'</p><p class="text pacifico-regular">'.$row['datetime'].'</p></li>';
                }
                $response .= implode('<hr>', $list_items).'</ol>';
                return $response;
            }
        }
    }
}
