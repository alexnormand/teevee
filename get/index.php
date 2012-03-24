<?php
require_once __DIR__ . '/silex.phar';
require_once __DIR__ . '/parser.php';
use Symfony\Component\HttpFoundation\Response;

$app = new Silex\Application();

$app['getJSON'] =  $app->protect(function ($query) {
  $response =  new Response(
		    new Parser($query),			
		    200,
		    array('Content-Type' => 'application/json')
		   );
    
  $response->setMaxAge(7*60);
  return $response;
});

$app->get('/search/{query}', function ($query) use($app) {
    return $app['getJSON'](urlencode($app->escape($query)));
});

$app->get('/seasons/{showid}', function($showid) use($app) {
    return $app['getJSON']((int) $showid);
})
->assert('showid', '\d+');
  
$app->get('/show/{showid}/season/{season}', function($showid, $season) use($app) {
    return $app['getJSON'](array('showid' => (int) $showid, 'season' => (int) $season));
})
->assert('showid', '\d+')
->assert('season', '\d+');

$app->run();
