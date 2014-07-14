<?php

$autoLoader = require 'vendor/autoload.php';

$container = new \Webforge\ProjectStack\BootContainer(__DIR__);
$container->registerGlobal();
$container->setAutoLoader($autoLoader);
$container->init();

return $container;