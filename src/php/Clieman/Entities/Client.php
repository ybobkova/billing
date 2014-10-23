<?php

namespace Clieman\Entities;

use Doctrine\ORM\Mapping AS ORM;
use JMS\Serializer\Annotation AS Serializer;

/**
 * 
 * 
 * this entity was compiled from Webforge\Doctrine\Compiler
 * @ORM\Entity
 * @ORM\Table(name="clients", uniqueConstraints={@ORM\UniqueConstraint(name="name_uniqueness", columns={"name"})})
 * @Serializer\ExclusionPolicy("all")
 */
class Client extends CompiledClient {
}
