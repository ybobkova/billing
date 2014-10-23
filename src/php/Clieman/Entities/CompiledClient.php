<?php

namespace Clieman\Entities;

use Webforge\Collections\ArrayCollection;
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
   * projects
   * @ORM\ManyToMany(targetEntity="Clieman\Entities\Project")
   * @ORM\JoinTable(name="clients2projects", joinColumns={@ORM\JoinColumn(name="clients_id", onDelete="cascade")}, inverseJoinColumns={@ORM\JoinColumn(name="projects_id", onDelete="cascade")})
   * @Serializer\Type("ArrayCollection")
   * @Serializer\Expose
   * @Serializer\Type("ArrayCollection")
   */
  protected $projects;
  
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
   * @param Doctrine\Common\Collections\Collection<Clieman\Entities\Project> $projects
   */
  public function setProjects(ArrayCollection $projects) {
    $this->projects = $projects;
    return $this;
  }
  
  /**
   * @return Doctrine\Common\Collections\Collection<Clieman\Entities\Project>
   */
  public function getProjects() {
    return $this->projects;
  }
  
  public function addProject(Project $project) {
    if (!$this->projects->contains($project)) {
        $this->projects->add($project);
    }
    return $this;
  }
  
  public function removeProject(Project $project) {
    if ($this->projects->contains($project)) {
        $this->projects->removeElement($project);
    }
    return $this;
  }
  
  public function hasProject(Project $project) {
    return $this->projects->contains($project);
  }
  
  public function __construct() {
    $this->projects = new ArrayCollection();
  }
}
