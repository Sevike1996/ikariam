<?php
$mysqli = mysqli_connect("localhost", "root", "", "ik_game", 33060, "/tmp/mysqld/mysqld.sock");

$mission_id = $_GET["mission_id"];

$query = "select alpha_towns.name from alpha_missions inner join alpha_towns on alpha_missions.to = alpha_towns.id where alpha_missions.id = " . $mission_id;
$result = mysqli_query($mysqli, $query);
$row = mysqli_fetch_assoc($result);
mysqli_free_result($result);

$query = "select battlefield_size from alpha_battles where mission_id = ". $mission_id;
$result = mysqli_query($mysqli, $query);
$row = mysqli_fetch_assoc($result);
mysqli_free_result($result);

$fight_data = array(
    "town" => $row["name"],
    "upgrades" => (object)[],
    "size" => $row["battlefield_size"],
    "rounds" => array()
);

$result = mysqli_query($mysqli, "select * from alpha_rounds_ui where mission_id = " . $mission_id);
while($row = mysqli_fetch_assoc($result)){
    array_push($fight_data["rounds"], $row["round_path"]);
}
echo json_encode($fight_data);

header("Content-Type: application/json");
header("Cache-Control: no-store, no-cache, must-revalidate, max-age=0");
header("Cache-Control: post-check=0, pre-check=0", false);
header("Pragma: no-cache")
?>
