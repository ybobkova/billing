<?php

namespace Clieman\Entities;

use Doctrine\ORM\Mapping AS ORM;
use JMS\Serializer\Annotation AS Serializer;

/**
 * Compiled Entity for Clieman\Entities\Client
 * 
 * To change table name or entity repository edit the Clieman\Entities\Client class.
 * @ORM\MappedSuperclass
 */
abstract class CompiledClient {
  
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
   * name
   * @ORM\Column
   * @Serializer\Expose
   * @Serializer\Type("string")
   */
  protected $name;
  
  /**
   * userId
   * @ORM\Column(type="integer")
   * @Serializer\Expose
   * @Serializer\Type("integer")
   */
  protected $userId;
  
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
  
  /**
   * @param string $name
   */
  public function setName($name) {
    $this->name = $name;
    return $this;
  }
  
  /**
   * @return string
   */
  public function getName() {
    return $this->name;
  }
  
  /**
   * @param integer $userId
   */
  public function setUserId($userId) {
    $this->userId = $userId;
    return $this;
  }
  
  /**
   * @return integer
   */
  public function getUserId() {
    return $this->userId;
  }
  
  public function __construct() {

  }
}
