<?php

define('__ROOT__', dirname(__FILE__));

$mission_id = $_GET["mission_id"];

$path = strtok($_SERVER['REQUEST_URI'], '?');

require_once(__ROOT__.$path.".php");

header("Cache-Control: no-store, no-cache, must-revalidate, max-age=0");
header("Cache-Control: post-check=0, pre-check=0", false);
header("Pragma: no-cache")
?>
