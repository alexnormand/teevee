<?php

require_once 'parser.php';

use Epguides\Parser;


header("Content-type: text/plain");
header("Cache-Control: no-cache, must-revalidate"); 
header("Expires: Sat, 26 Jul 1997 05:00:00 GMT"); 

if(isset($_GET['q'])) {
   $query = urlencode(htmlspecialchars($_GET['q']));  
   echo new Parser($query);
}
else if (isset($_GET['show'])) {
  $query = urlencode(htmlspecialchars($_GET['show']));  
  echo new Parser($query, true);
}
 		    

