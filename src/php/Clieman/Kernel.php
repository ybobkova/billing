<?php

namespace Clieman;

class Kernel extends \Webforge\ProjectStack\Symfony\Kernel {

  public function registerBundles() {
    $bundles = parent::registerBundles();

    $bundles[] = new \FOS\UserBundle\FOSUserBundle();
    //$bundles[] = new \FOS\RestBundle\FOSRestBundle();

    return $bundles;
  }
}
