<?php

require_once 'parser.php';

use FilesTube\Parser;

$query = urlencode(htmlspecialchars($_GET['q']));


header("Content-type: text/plain");
echo new Parser($query);



