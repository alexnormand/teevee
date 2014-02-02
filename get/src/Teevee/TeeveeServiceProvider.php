<?php
namespace Teevee;

require_once __DIR__.'/parser.php';

use Silex\Application;
use Silex\ServiceProviderInterface;

class TeeveeServiceProvider implements ServiceProviderInterface {
  public function register(Application $app) {
    $app['getJSON'] =  $app->protect(function ($query) use ($app) {

        $parser   = new Parser($query);
        $response = $app->json($parser->getResult());
        $response->setMaxAge(7*60);
        return $response;
    });
  }

  public function boot(Application $app) {}
}


