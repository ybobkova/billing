<?php

namespace Clieman\Controllers;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Clieman\Entities\User;
use Clieman\Entities\Client as Client;


class ClientsController extends Controller {
    protected $fqn = 'Clieman\Entities\Client';
  

/*  public function findClients($item) {
    $em = $this->get('doctrine.orm.entity_manager');

    $pscheit = $em->getRepository('Clieman\Entities\Client')->findBy(array('email'=>'p.scheit@ps-webforge.com'));
  }*/

  public function reloadWithErrorAction() {
    $content = $this->renderView(
      ':Clieman:clients.html.mustache',
      array('error label' => "Es gibt einen Kunden mit diesem Namen")
    );

    $response = new Response(
        $content,
        Response::HTTP_OK,
        array('content-type' => 'text/html')
    );

    return $response;
  }

  public function indexAction() {
    $content = $this->renderView(
      ':Clieman:clients.html.mustache');

    $response = new Response(
        $content,
        Response::HTTP_OK,
        array('content-type' => 'text/html')
    );

    return $response;
  }

  public function addClientAction(Request $request) {
    $body = json_decode($request->getContent());
    $name = $body->name;

    $client = new Client;
    $client->setName($name);
    $response = new Response();
    try {
      $em = $this->get('doctrine.orm.entity_manager');
      $em->persist($client);
      $em->flush($client);
      $response->setStatusCode(204);
      return $response;
    } catch (\Doctrine\DBAL\DBALException $e) {
      $this->get('session')->getFlashBag()->add(
        'notice',
        'Your changes were saved!'
      );
      $url = $this->generateUrl('home');
      $this->redirect($url);
      return $response;
    }
  }

  public function removeClientAction($id) {
    $em = $this->get('doctrine.orm.entity_manager');
    $client = $em->getReference('Clieman\Entities\Client', $id);
    $em->remove($client);
    $em->flush();

    $response = new Response();
    $response->setStatusCode(204);
    return $response;
  }

  public function editClientAction($id, Request $request) {
    $em = $this->get('doctrine.orm.entity_manager');
    $client = $em->getReference('Clieman\Entities\Client', $id);

    $body = json_decode($request->getContent());
    $name = $body->name;
    
    $client->setName($name);
    $em->flush($client);
    
    $response = new Response();
    $response->setStatusCode(204);
    return $response;
  }

  public function getClientsAction() {
    $em = $this->get('doctrine.orm.entity_manager');
    $qb = $em->createQueryBuilder();
    
    $entities = $qb
      ->select('cl')
      ->from('Clieman\Entities\Client', 'cl')
      ->getQuery()
      ->getResult();
    $named = array('clients'=>$entities);
    $serializer2 = $this->get('jms_serializer');
    return new Response($serializer2->serialize($named, 'json'));
  }
}