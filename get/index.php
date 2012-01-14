<?php

require_once __DIR__ . '/silex.phar';
require_once __DIR__ . '/parser.php';
use Symfony\Component\HttpFoundation\Response;

$getJSON =  function ($query) {
  return new Response
  (
   new Parser($query),			
   200,
   array('Content-Type' => 'application/json')
   );    
};


$app = new Silex\Application();

$app->get('/search/{query}', function ($query) use ($getJSON) {
    return $getJSON(urlencode(htmlspecialchars($query)));
  });
$app->get('/show/{showid}', function($showid) use ($getJSON) {
    return $getJSON((int) $showid);
  })
->assert('showid', '\d+');

$app->run();
