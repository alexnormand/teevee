<?php
require_once __DIR__ . '/vendors/silex.phar';

$app = new Silex\Application();

$app['autoloader']->registerNamespace('Teevee', __DIR__.'/src/'); 
$app->register(new Teevee\TeeveeServiceProvider());


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
