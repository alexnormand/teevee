<?php
require_once __DIR__ . '/vendor/autoload.php';

$app = new Silex\Application();

$app->register(new Teevee\TeeveeServiceProvider());

$app->get('/search/{query}', function ($query) use($app) {
    return $app['getJSON'](urlencode($app->escape($query)));
});

$app->get('/shows/{showid}/seasons/', function($showid) use($app) {
    return $app['getJSON']((int) $showid);
})
->assert('showid', '\d+');

$app->get('/shows/{showid}/seasons/{season}', function($showid, $season) use($app) {
    return $app['getJSON'](array('showid' => (int) $showid, 'season' => (int) $season));
})
->assert('showid', '\d+')
->assert('season', '\d+');

$app->run();
