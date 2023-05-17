<?php
$round_id = $_GET["id"];
$dir = substr($round_id, 0, 2);
$path = substr($round_id, 2);

$full_path = "/tmp/ikariam/rounds/".$dir."/".$path;
$content = file_get_contents($full_path, "r");
echo $content;
?>
