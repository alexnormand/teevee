<?php

require_once 'parser.php';

header("Content-type: text/plain");
header("Cache-Control: no-cache, must-revalidate"); 
header("Expires: Sat, 26 Jul 1997 05:00:00 GMT"); 

if(isset($_GET['q'])) {
   $query = urlencode(htmlspecialchars($_GET['q']));  
   echo new Parser($query);
}
else if (isset($_GET['showid'])) {
  $query = urlencode(htmlspecialchars($_GET['showid']));  
  echo new Parser($query, true);
}
 		    

