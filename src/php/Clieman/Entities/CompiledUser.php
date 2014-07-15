<?php

namespace Clieman\Entities;

use Doctrine\ORM\Mapping AS ORM;
use JMS\Serializer\Annotation AS Serializer;

/**
 * Compiled Entity for Clieman\Entities\User
 * 
 * To change table name or entity repository edit the Clieman\Entities\User class.
 * @ORM\MappedSuperclass
 */
abstract class CompiledUser extends \FOS\UserBundle\Model\User {
  
  /**
   * id
   * @ORM\Id
   * @ORM\Column(type="integer")
   * @ORM\GeneratedValue
   * @Serializer\Expose
   * @Serializer\Type("integer")
   */
  protected $id;
  
  /**
   * @param integer $id
   */
  public function setId($id) {
    $this->id = $id;
    return $this;
  }
  
  /**
   * @return integer
   */
  public function getId() {
    return $this->id;
  }
  
  public function __construct() {
    parent::__construct();
  }
}
