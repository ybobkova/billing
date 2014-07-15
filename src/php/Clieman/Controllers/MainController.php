<?php

namespace Clieman\Controllers;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Clieman\Entities\User;

class MainController extends Controller {
	
	/*
	public function createNewUserAction() {
		$user = new User($email);

		$em = $this->get('doctrine.orm.entity_manager');
		$em->persist($user);
		$em->flush();
	}
	
	public function findUser() {
		$em = $this->get('doctrine.orm.entity_manager');

		$pscheit = $em->getRepository('Clieman\Entities\User')->findBy(array('email'=>'p.scheit@ps-webforge.com'));
	}
	*/

	public function homeAction() {

		$content = $this->renderView(
	      ':Clieman:index.html.mustache',
           array('title' => 'Blubb')
        );

		$response = new Response(
	    	$content,
	    	Response::HTTP_OK,
	    	array('content-type' => 'text/html')
		);

		return $response;
	}

	public function clientsAction($clientId) {

		$content = $this->renderView(
	      ':Clieman:clients.html.mustache',
           array(
           	'title' => 'Startseite',
           	'clientId'=>$clientId
           )
        );

		$response = new Response(
	    	$content,
	    	Response::HTTP_OK,
	    	array('content-type' => 'text/html')
		);

		return $response;
	}
}
