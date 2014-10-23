<?php

namespace Clieman\Entities;

use Doctrine\ORM\Mapping AS ORM;
use JMS\Serializer\Annotation AS Serializer;

/**
 * 
 * 
 * this entity was compiled from Webforge\Doctrine\Compiler
 * @ORM\Entity
 * @ORM\Table(name="projects")
 * @Serializer\ExclusionPolicy("all")
 */
class Project extends CompiledProject {
}
