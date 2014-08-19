<?php

namespace Clieman\Controllers;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Clieman\Entities\User;
use Clieman\Entities\Client as Client;


class ClientsController extends Controller {
    protected $fqn = 'Clieman\Entities\Client';
  
/*
  public function findClient() {
    $em = $this->get('doctrine.orm.entity_manager');

    $pscheit = $em->getRepository('Clieman\Entities\Client')->findBy(array('email'=>'p.scheit@ps-webforge.com'));
  }
*/

  public function indexAction() {
    $content = $this->renderView(
        ':Clieman:clients.html.mustache'
        );

    $response = new Response(
        $content,
        Response::HTTP_OK,
        array('content-type' => 'text/html')
    );

    return $response;
  }

  public function addClientAction(Request $request) {
    $userId = $this->get('security.context')->getToken()->getUser()->getId();

    $body = json_decode($request->getContent());
    $name = $body->name;

    $client = new Client;
    $client->setName($name);
    $client->setUserId($userId);

    $em = $this->get('doctrine.orm.entity_manager');
    $em->persist($client);
    $em->flush();

    return new Response();
  }


  public function getClientsAction() {

    $em = $this->get('doctrine.orm.entity_manager');
    $qb = $em->createQueryBuilder();

    $entities = $qb
      ->select('cl')
      ->from('Clieman\Entities\Client', 'cl')
      ->where('cl.userId=1')
      ->getQuery()
      ->getResult();
    $named = array('clients'=>$entities);
    $serializer = $this->get('jms_serializer');
    $entities_json = $serializer->serialize($named, 'json');
    return new Response($entities_json);
  }
}