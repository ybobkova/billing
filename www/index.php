<?php
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Debug\Debug;

$container = require __DIR__.DIRECTORY_SEPARATOR.'..'.DIRECTORY_SEPARATOR.'bootstrap.php';

Debug::enable(); // this has problems with autoloading from different locations

$request = Request::createFromGlobals();

$kernel = $container->getKernel();
$response = $kernel->handle($request);

// send the headers and echo the content
$response->send();

// triggers the kernel.terminate event
$kernel->terminate($request, $response);