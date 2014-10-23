<?php

namespace Clieman\Controllers;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Clieman\Entities\User;
use Clieman\Entities\Client as Client;


class ProjectsController extends Controller {

  public function indexAction($id) {
    $em = $this->get('doctrine.orm.entity_manager');
    $client = $em->getReference('Clieman\Entities\Client', $id);
    $name = $client -> getName();

    $content = $this->renderView(
      ':Clieman:projects.html.mustache',
      array('name' => $name)
    );

    $response = new Response(
      $content,
      Response::HTTP_OK,
      array('content-type' => 'text/html')
    );

    return $response;
  }
}